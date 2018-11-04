using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TeacherPortal.Models
{
    public class Material
    {
        public Material()
        {
            this.Stats = new HashSet<MaterialStats>();
            this.Articles = new HashSet<Article>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Link { get; set; }
        public MaterialType Type { get; set; }
        public ICollection<Article> Articles { get; set; }
        public ICollection<MaterialStats> Stats { get; set; }
    }
}