using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using TeacherPortal.Database;
using TeacherPortal.Models;

namespace TeacherPortal.Controllers
{
    public class MetadatasController : ApiController
    {
        private DataModel db = new DataModel();

        // GET: api/Metadatas
        public ICollection<Metadata> GetMetadatas()
        {
            if (Request.Headers.Referrer != null && Request.Headers.Referrer.ToString().Contains(Config.SERVER))
            {
                Metadata pass = null;
                var data = db.Metadatas.ToList();
                foreach (var mdata in data)
                {
                    if (mdata.Key == "pass")
                    {
                        pass = mdata;
                    }
                }
                data.Remove(pass);
                return data;
            }
            return null;
        }


        // GET: api/Metadatas/5
        [ResponseType(typeof(Metadata))]
        public async Task<IHttpActionResult> GetMetadata(string key)
        {
            if (Request.Headers.Referrer != null && Request.Headers.Referrer.ToString().Contains(Config.SERVER))
            {
                Metadata metadata = await db.Metadatas.Where(c => c.Key == key).FirstOrDefaultAsync();
                if (metadata == null)
                {
                    return NotFound();
                }

                return Ok(metadata);
            }
            return BadRequest();
        }

        // PUT: api/Metadatas/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutMetadata(int id, Metadata metadata)
        {
            if (Request.Headers.Referrer != null && Request.Headers.Referrer.ToString().Contains(Config.SERVER))
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (id != metadata.Id)
                {
                    return BadRequest();
                }

                db.Entry(metadata).State = EntityState.Modified;

                try
                {
                    await db.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!MetadataExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                var mtd = await db.Metadatas.Where(c => c.Id == id).FirstOrDefaultAsync();
                return Ok(mtd);
            }
            return BadRequest();
        }

        // POST: api/Metadatas
        [ResponseType(typeof(Metadata))]
        public async Task<IHttpActionResult> PostMetadata(Metadata metadata)
        {
            if (Request.Headers.Referrer != null && Request.Headers.Referrer.ToString().Contains(Config.SERVER))
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                db.Metadatas.Add(metadata);
                await db.SaveChangesAsync();

                return CreatedAtRoute("DefaultApi", new { id = metadata.Id }, metadata);
            }
            return BadRequest();
        }

        // DELETE: api/Metadatas/5
        [ResponseType(typeof(Metadata))]
        public async Task<IHttpActionResult> DeleteMetadata(int id)
        {
            if (Request.Headers.Referrer != null && Request.Headers.Referrer.ToString().Contains(Config.SERVER))
            {

                Metadata metadata = await db.Metadatas.FindAsync(id);
                if (metadata == null)
                {
                    return NotFound();
                }

                db.Metadatas.Remove(metadata);
                await db.SaveChangesAsync();

                return Ok(metadata);
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

        private bool MetadataExists(int id)
        {
            return db.Metadatas.Count(e => e.Id == id) > 0;
        }
    }
}
