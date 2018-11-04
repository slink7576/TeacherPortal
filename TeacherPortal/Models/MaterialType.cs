using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TeacherPortal.Models
{
    public class MaterialType
    {
        public MaterialType()
        {
            this.Materials = new HashSet<Material>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Material> Materials { get; set; }
    }
}