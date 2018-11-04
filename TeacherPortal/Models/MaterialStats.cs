using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TeacherPortal.Models
{
	public class MaterialStats
	{
        public MaterialStats()
        {
            this.Materials = new HashSet<Material>();
        }
        public int Id { get; set; }
        public int Downloads { get; set; }
        public DateTime Date { get; set; }
        public ICollection<Material> Materials { get; set; }
    }
}