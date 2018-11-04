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
    public class MaterialsController : ApiController
    {
        private DataModel db = new DataModel();

        [Route("api/Materials")]
        public ICollection<Material> GetMaterials()
        {
            if (Request.Headers.Referrer != null && Request.Headers.Referrer.ToString().Contains(Config.SERVER))
            {
                return JsonHelper.ConvertMaterials(db.Materials.Include(c => c.Type).Include(c => c.Stats).ToList());
            }
            return null;
        }

        // GET: api/Materials/5
        [Route("api/Materials/{id}")]
        public async Task<IHttpActionResult> GetMaterial(int id)
        {
            if (Request.Headers.Referrer != null && Request.Headers.Referrer.ToString().Contains(Config.SERVER))
            {
                Material material = await db.Materials.Include(c => c.Type).Where(c => c.Id == id).FirstOrDefaultAsync();
                if (material == null)
                {
                    return NotFound();
                }

                return Ok(JsonHelper.ConvertMaterials(new List<Material>() { material }));
            }
            return BadRequest();
        }

        // PUT: api/Materials/5
        [ResponseType(typeof(void))]
        [HttpPut, Route("api/Materials/{id}")]
        public async Task<IHttpActionResult> PutMaterial(int id, Material material)
        {
            if (Request.Headers.Referrer != null && Request.Headers.Referrer.ToString().Contains(Config.SERVER))
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (id != material.Id)
                {
                    return BadRequest();
                }
                var getMaterial = await db.Materials.Where(c => c.Id == id).FirstOrDefaultAsync();
                var type = await db.MaterialTypes.Where(c => c.Id == material.Type.Id).FirstOrDefaultAsync();
                getMaterial.Link = material.Link;
                getMaterial.Name = material.Name;
                getMaterial.Type = type;

                try
                {
                    await db.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!MaterialExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                var mat = await db.Materials.Include(c => c.Type).Where(c => c.Id == id).FirstOrDefaultAsync();
                return Ok(JsonHelper.ConvertMaterials(new List<Material>() { mat }));
            }
            return BadRequest();
        }

        // POST: api/Materials
        [ResponseType(typeof(Material))]
        [HttpPost, Route("api/Materials")]
        public async Task<IHttpActionResult> PostMaterial(Material material)
        {
            if (Request.Headers.Referrer != null && Request.Headers.Referrer.ToString().Contains(Config.SERVER))
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                material.Type = db.MaterialTypes.Where(c => c.Name == material.Type.Name).FirstOrDefault();
                db.Materials.Add(material);
                await db.SaveChangesAsync();
                var mat = await db.Materials.Include(c => c.Type).Where(c => c.Name == material.Name).FirstOrDefaultAsync();
                return Ok(JsonHelper.ConvertMaterials(new List<Material>() { mat }));
            }
            return BadRequest();
        }

        [Route("api/Materials/Stats/{id}")]
        public async Task<IHttpActionResult> GetStats(int id)
        {
            if (Request.Headers.Referrer != null && Request.Headers.Referrer.ToString().Contains(Config.SERVER))
            {
                var material = await db.Materials.Where(c => c.Id == id).Include(c => c.Stats).FirstOrDefaultAsync();
                var stats = material.Stats.ToList();
                stats.Sort((x, y) => DateTime.Compare(x.Date, y.Date));
                return Ok(JsonHelper.ConvertMaterialStats(stats));
            }
            return BadRequest();

        }
        [HttpGet]
        [Route("api/Materials/Find")]
        public IHttpActionResult FindMaterial(int? type, string name = "")
        {
            if (Request.Headers.Referrer != null && Request.Headers.Referrer.ToString().Contains(Config.SERVER))
            {
                var materials = db.Materials.AsQueryable();
                if (!string.IsNullOrEmpty(name))
                {
                    materials = db.Materials.Where(c => c.Name.ToLower() == name.ToLower());
                }
                if (type != null)
                {
                    materials = materials.Where(c => c.Type.Id == type);
                }
                return Ok(JsonHelper.ConvertMaterials(materials.Include(c => c.Type).Include(c => c.Stats).ToList()));
            }
            return BadRequest();
        }

        // DELETE: api/Materials/5
        [ResponseType(typeof(Material))]
        [HttpDelete, Route("api/Materials/{id}")]
        public async Task<IHttpActionResult> DeleteMaterial(int id)
        {
            if (Request.Headers.Referrer != null && Request.Headers.Referrer.ToString().Contains(Config.SERVER))
            {
                Material material = await db.Materials.FindAsync(id);
                if (material == null)
                {
                    return NotFound();
                }

                db.Materials.Remove(material);
                await db.SaveChangesAsync();

                return Ok(material);
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

        private bool MaterialExists(int id)
        {
            return db.Materials.Count(e => e.Id == id) > 0;
        }
    }
}
