using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TeacherPortal.Models
{
    public class Article
    {
        public Article()
        {
            this.Materials = new HashSet<Material>();
            this.Stats = new HashSet<ArticleStats>();
        }
        public int Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public DateTime Date { get; set; }
        public ICollection<Material> Materials { get; set; }
        public ICollection<ArticleStats> Stats { get; set; }
    }
}