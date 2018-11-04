using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using TeacherPortal.Database;
using TeacherPortal.Helpers;
using TeacherPortal.Models;

/// <summary>
/// C:\Projects\TeacherFull\TeacherPortal\TeacherPortal\Controllers\ArticlesController.cs
/// </summary>
/// <author>
/// SLINK-ой
/// </author>
/// <date>
/// 18.10.2018
/// </date>





namespace TeacherPortal.Controllers
{
    /* 
  * Interfaces:
  *  ApiController - basic API for ASP.NET Web Api
  *  
  *  Functions:
  *  Provides basic CRUD operations for Articles entity
  */
    public class ArticlesController : ApiController
    {
        private DataModel db = new DataModel();
        const int pageSize = 4;

        
        public ICollection<Article> GetArticles()
        {
            if (Request.Headers.Referrer != null && Request.Headers.Referrer.ToString().Contains(Config.SERVER))
            {
                var articles = db.Articles.Include(c => c.Stats)
                .Include(c => c.Materials.Select(y => y.Stats))
                .Include(c => c.Materials.Select(y => y.Type))
                .OrderBy(c => c.Date).ToList();
                articles.Reverse();
                return JsonHelper.ConvertArticles(articles);
            }
            return null;
        }




        /* Function: GetArticles
         
           Gets all articles from db.

           Parameters: 
                page - Integer value of page.

           Returns: 

                Json formatted list of articles.

           See Also: 

                <GetStats>
         */
        public ICollection<Article> GetArticles(int page)
        {
            if (Request.Headers.Referrer != null && Request.Headers.Referrer.ToString().Contains(Config.SERVER))
            {
                if (page >= 0)
                {
                    var articles = db.Articles.Include(c => c.Stats)
               .Include(c => c.Materials.Select(y => y.Stats))
               .Include(c => c.Materials.Select(y => y.Type)).ToList();
                    articles.Reverse();
                    return JsonHelper.ConvertArticles(articles.Skip(page * pageSize).Take(pageSize).ToList());
                }
                return null;
            }
            return null;
        }

        // Function: GetStats
        // Fetches from db stats from specific article and then returns it in json format.
        [Route("api/Articles/Stats/{id}")]
        public async Task<IHttpActionResult> GetStats(int id)
        {
            if (Request.Headers.Referrer != null && Request.Headers.Referrer.ToString().Contains(Config.SERVER))
            {
                var article = await db.Articles.Where(c => c.Id == id).Include(c => c.Stats).FirstOrDefaultAsync();
                var stats = article.Stats.ToList();
                stats.Sort((x, y) => DateTime.Compare(x.Date, y.Date));
                return Ok(JsonHelper.ConvertArticleStats(stats));
            }
            return BadRequest();
        }

        [Route("api/Articles/AddMaterial/{articleId}/{materialId}")]
        public async Task<IHttpActionResult> AddMaterialToArticle(int articleId, int materialId)
        {
            if (Request.Headers.Referrer != null && Request.Headers.Referrer.ToString().Contains(Config.SERVER))
            {

                var article = await db.Articles.Where(c => c.Id == articleId).Include(c => c.Materials).FirstOrDefaultAsync();
                var material = await db.Materials.Where(c => c.Id == materialId).FirstOrDefaultAsync();
                if (article != null && material != null)
                {
                    article.Materials.Add(material);
                    await db.SaveChangesAsync();
                    return Ok();
                }


            }
            return BadRequest();

        }

        // GET: api/Articles/5
        [ResponseType(typeof(Article))]
        public async Task<IHttpActionResult> GetArticle(int id)
        {
            if (Request.Headers.Referrer != null && Request.Headers.Referrer.ToString().Contains(Config.SERVER))
            {
                Article article = await db.Articles.Include(c => c.Stats)
            .Include(c => c.Materials.Select(y => y.Stats))
            .Include(c => c.Materials.Select(y => y.Type))
            .Where(c => c.Id == id).FirstOrDefaultAsync();
                if (article == null)
                {
                    return NotFound();
                }
                return Ok(JsonHelper.ConvertArticles(new List<Article>() { article }));
            }
            return BadRequest();
        }

        // PUT: api/Articles/5
        [ResponseType(typeof(void))]
        [HttpPut]
        public async Task<IHttpActionResult> PutArticle(int id, Article article)
        {
            if (Request.Headers.Referrer != null && Request.Headers.Referrer.ToString().Contains(Config.SERVER))
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (id != article.Id)
                {
                    return BadRequest();
                }

                var articleDb = await db.Articles.Where(c => c.Id == id).FirstOrDefaultAsync();
                articleDb.Title = article.Title;
                articleDb.Body = article.Body;
                await db.SaveChangesAsync();

                try
                {
                    await db.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ArticleExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }

                return Ok(JsonHelper.ConvertArticles(new List<Article>() { articleDb }));
            }
            return BadRequest();
        }

        // POST: api/Articles
        [ResponseType(typeof(Article))]
        public async Task<IHttpActionResult> PostArticle([FromBody]Article article)
        {
            if (Request.Headers.Referrer != null && Request.Headers.Referrer.ToString().Contains(Config.SERVER))
            {
                article.Date = DateTime.Now;
                db.Articles.Add(article);
                await db.SaveChangesAsync();
                var art = db.Articles.Include(c => c.Stats)
                    .Include(c => c.Materials.Select(y => y.Stats))
                    .Include(c => c.Materials.Select(y => y.Type)).Where(c => c.Title == article.Title).FirstOrDefault();
                return Ok(JsonHelper.ConvertArticles(new List<Article>() { art }));
            }
            return BadRequest();
        }

        // DELETE: api/Articles/5
        [ResponseType(typeof(Article))]
        public async Task<IHttpActionResult> DeleteArticle(int id)
        {
            if (Request.Headers.Referrer != null && Request.Headers.Referrer.ToString().Contains(Config.SERVER))
            {
                Article article = await db.Articles.FindAsync(id);
                if (article == null)
                {
                    return NotFound();
                }

                db.Articles.Remove(article);
                await db.SaveChangesAsync();
                return Ok();
            }
            return BadRequest();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ArticleExists(int id)
        {
            return db.Articles.Count(e => e.Id == id) > 0;
        }
    }
}
