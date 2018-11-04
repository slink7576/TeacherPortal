import { Article } from '../../core/models/article.model';
import { Material } from '../../core/models/material.model';
import { ArticleStats } from '../../core/models/article-stats.model';
import { MaterialStats } from '../../core/models/material-stats.model';
import { MaterialType } from '../../core/models/material-types';

export class Mapper {
  static MapToArticle(art: Article): Article {
    const tmpArticle = new Article(art.title, art.body, art.date.slice(0, 10));
    tmpArticle.id = art.id;
    tmpArticle.materials = new Array<Material>();
    tmpArticle.stats = new Array<ArticleStats>();
    if (art.materials !== undefined) {
      for (let i = 0; i < art.materials.length; i++) {
        tmpArticle.materials[i] = this.MapMaterial(art.materials[i]);
      }
    }
    if (art.stats !== undefined) {
      for (let i = 0; i < art.stats.length; i++) {
        tmpArticle.stats[i] = this.MapArticleStat(art.stats[i]);
      }
    }
    return tmpArticle;
  }
  static MapArticleStat(stat: ArticleStats): ArticleStats {
    const tmpStat = new ArticleStats();
    tmpStat.date = stat.date.slice(0, 10);
    tmpStat.id = stat.id;
    tmpStat.likes = stat.likes;
    tmpStat.views = stat.views;
    return tmpStat;
  }
  static MapMaterial(mat: Material): Material {
    const tmpMat = new Material();
    tmpMat.id = mat.id;
    tmpMat.link = mat.link;
    tmpMat.name = mat.name;
    tmpMat.type = this.MapMaterialType(mat.type);
    tmpMat.stats = new Array<MaterialStats>();
    for (let i = 0; i < mat.stats.length; i++) {
      tmpMat.stats[i] = this.MapMatStat(mat.stats[i]);
    }
    return tmpMat;
  }
  static MapMatStat(stat: MaterialStats): MaterialStats {
    const tmpMat = new MaterialStats();
    tmpMat.date = stat.date.slice(0, 10);
    tmpMat.id = stat.id;
    tmpMat.downloads = stat.downloads;
    return tmpMat;
  }
  static MapMaterialType(type: MaterialType): MaterialType {
    const tmpType = new MaterialType();
    tmpType.id = type.id;
    tmpType.name = type.name;
    return tmpType;
  }
}
