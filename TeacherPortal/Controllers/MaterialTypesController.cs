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

namespace TeacherPortal.Controllers
{
    public class MaterialTypesController : ApiController
    {
        private DataModel db = new DataModel();

        // GET: api/MaterialTypes
        public IQueryable<MaterialType> GetMaterialTypes()
        {
            if (Request.Headers.Referrer != null && Request.Headers.Referrer.ToString().Contains(Config.SERVER))
            {
                return db.MaterialTypes;
            }
            return null;
        }

        // GET: api/MaterialTypes/5
        [ResponseType(typeof(MaterialType))]
        public async Task<IHttpActionResult> GetMaterialType(int id)
        {
            if (Request.Headers.Referrer != null && Request.Headers.Referrer.ToString().Contains(Config.SERVER))
            {
                MaterialType materialType = await db.MaterialTypes.FindAsync(id);
                if (materialType == null)
                {
                    return NotFound();
                }

                return Ok(materialType);
            }
            return BadRequest();
        }

        // PUT: api/MaterialTypes/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutMaterialType(int id, MaterialType materialType)
        {
            if (Request.Headers.Referrer != null && Request.Headers.Referrer.ToString().Contains(Config.SERVER))
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (id != materialType.Id)
                {
                    return BadRequest();
                }

                db.Entry(materialType).State = EntityState.Modified;

                try
                {
                    await db.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!MaterialTypeExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                var mat = await db.MaterialTypes.FindAsync(id);
                return Ok(mat);
            }
            return BadRequest();
        }

        // POST: api/MaterialTypes
        [ResponseType(typeof(MaterialType))]
        public async Task<IHttpActionResult> PostMaterialType(MaterialType materialType)
        {
            if (Request.Headers.Referrer != null && Request.Headers.Referrer.ToString().Contains(Config.SERVER))
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                db.MaterialTypes.Add(materialType);
                await db.SaveChangesAsync();
                var mat = await db.MaterialTypes.Where(c => c.Name == materialType.Name).FirstOrDefaultAsync();
                return Ok(mat);
            }
            return BadRequest();
        }

        // DELETE: api/MaterialTypes/5
        [ResponseType(typeof(MaterialType))]
        public async Task<IHttpActionResult> DeleteMaterialType(int id)
        {
            if (Request.Headers.Referrer != null && Request.Headers.Referrer.ToString().Contains(Config.SERVER))
            {
                MaterialType materialType = await db.MaterialTypes.FindAsync(id);
                if (materialType == null)
                {
                    return NotFound();
                }

                db.MaterialTypes.Remove(materialType);
                await db.SaveChangesAsync();

                return Ok(materialType);
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

        private bool MaterialTypeExists(int id)
        {
            return db.MaterialTypes.Count(e => e.Id == id) > 0;
        }
    }
}
