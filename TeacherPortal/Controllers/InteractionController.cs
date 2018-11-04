using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using TeacherPortal.Database;
using TeacherPortal.Models;

namespace TeacherPortal.Controllers
{
    public class InteractionController : ApiController
    {
        private DataModel db = new DataModel();
        [Route("api/Articles/Views/{id}")]
        public async Task AddViewArticle(int id)
        {
            if (Request.Headers.Referrer != null && Request.Headers.Referrer.ToString().Contains(Config.SERVER))
            {
                bool exists = false;
                Article article = await db.Articles.Include(c => c.Stats)
                      .Include(c => c.Materials.Select(y => y.Stats))
                      .Where(c => c.Id == id).FirstAsync();
                foreach (var stat in article.Stats)
                {
                    if (stat.Date.ToShortDateString() == DateTime.Now.ToShortDateString())
                    {
                        stat.Views += 1;
                        exists = true;
                    }
                }
                if (!exists)
                {
                    article.Stats.Add(new ArticleStats() { Date = DateTime.Now, Likes = 0, Views = 1 });
                }
                db.Entry(article).State = EntityState.Modified;
                await db.SaveChangesAsync();
            }

        }
        [Route("api/Materials/Views/{id}")]
        public async Task AddViewMaterial(int id)
        {
            if (Request.Headers.Referrer != null && Request.Headers.Referrer.ToString().Contains(Config.SERVER))
            {
                bool exists = false;
                Material material = await db.Materials.Include(c => c.Stats)
                      .Where(c => c.Id == id).FirstAsync();
                foreach (var stat in material.Stats)
                {
                    if (stat.Date.ToShortDateString() == DateTime.Now.ToShortDateString())
                    {
                        stat.Downloads += 1;
                        exists = true;
                    }
                }
                if (!exists)
                {
                    material.Stats.Add(new MaterialStats() { Date = DateTime.Now, Downloads = 1 });
                }
                db.Entry(material).State = EntityState.Modified;
                await db.SaveChangesAsync();
            }
        }
        [Route("api/Email/{title}/{body}")]
        [HttpGet]
        public async Task SendEmail(string title, string body)
        {
            if (Request.Headers.Referrer != null && Request.Headers.Referrer.ToString().Contains(Config.SERVER))
            {
                var useremail = await db.Metadatas.Where(c => c.Key == "email").FirstOrDefaultAsync();
                var username = await db.Metadatas.Where(c => c.Key == "name").FirstOrDefaultAsync();
                var fromAddress = new MailAddress("teacher.feedback.ws@gmail.com", "Відгук");
                var toAddress = new MailAddress(useremail.Value, username.Value);
                var fromPassword = "website2*";
                var subject = title;
                var smtp = new SmtpClient
                {
                    Host = "smtp.gmail.com",
                    Port = 587,
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
                };
                using (var message = new MailMessage(fromAddress, toAddress)
                {
                    Subject = subject,
                    Body = body
                })
                {
                    smtp.Send(message);
                }
            }
        }
        [Route("api/Admin")]
        [HttpPost]
        public async Task<bool> ApproveAdmin([FromBody]string password)
        {
            if (Request.Headers.Referrer != null && Request.Headers.Referrer.ToString().Contains(Config.SERVER))
            {
                var passData = await db.Metadatas.Where(c => c.Key == "pass").FirstAsync();
                if (password == passData.Value)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            return false;
        }


    }
}
