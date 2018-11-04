using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TeacherPortal.Models
{
    public class ArticleStats
    {
        public ArticleStats()
        {
            this.Articles = new HashSet<Article>();
        }
        public int Id { get; set; }
        public int Views { get; set; }
        public int Likes { get; set; }
        public DateTime Date { get; set; }
        public ICollection<Article> Articles { get; set; }
    }
}