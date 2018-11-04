using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TeacherPortal.Models;

namespace TeacherPortal.Helpers
{
  public static class JsonHelper
  {
    public static List<ArticleStats> ConvertArticleStats(List<ArticleStats> input)
    {
      var tmpStat = new List<ArticleStats>();
      foreach (var stat in input)
      {
        stat.Articles = null;
        tmpStat.Add(stat);
      }
      return tmpStat;
    }
    public static List<MaterialStats> ConvertMaterialStats(List<MaterialStats> input)
    {
      var tmpStat = new List<MaterialStats>();
      foreach (var stat in input)
      {
        stat.Materials = null;
        tmpStat.Add(stat);
      }
      return tmpStat;
    }
    public static List<Article> ConvertArticles(List<Article> input)
    {
      var tmpArt = new List<Article>();
      foreach (var article in input)
      {
        if (article.Stats != null)
        {
          foreach (var artstat in article.Stats)
          {
            artstat.Articles = null;
          }
        }
        if(article.Materials != null)
        {
          foreach (var material in article.Materials)
          {
            material.Articles = null;
            material.Type.Materials = null;
            foreach (var matstat in material.Stats)
            {
              matstat.Materials = null;
            }
          }
        }
        tmpArt.Add(article);
      }
      return tmpArt;
    }
    public static List<Material> ConvertMaterials(List<Material> input)
    {
      var tmpMat = new List<Material>();
      foreach (var material in input)
      {
        foreach (var stat in material.Stats)
        {
          stat.Materials = null;
        }
        if (material.Type != null)
        {
          material.Type.Materials = null;
        }
        tmpMat.Add(material);
      }

      return tmpMat;
    }
  }
}
