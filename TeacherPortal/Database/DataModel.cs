namespace TeacherPortal.Database
{
  using System;
  using System.Data.Entity;
  using System.ComponentModel.DataAnnotations.Schema;
  using System.Linq;
  using TeacherPortal.Models;

  public partial class DataModel : DbContext
  {
    public DbSet<Article> Articles { get; set; }
    public DbSet<ArticleStats> ArticleStats { get; set; }
    public DbSet<Material> Materials { get; set; }
    public DbSet<MaterialStats> MaterialStats { get; set; }
    public DbSet<Metadata> Metadatas { get; set; }
    public DbSet<MaterialType> MaterialTypes { get; set; }
    public DataModel()
            : base("name=DataModel")
    {
    }


    protected override void OnModelCreating(DbModelBuilder modelBuilder)
    {
    }


  }
}
