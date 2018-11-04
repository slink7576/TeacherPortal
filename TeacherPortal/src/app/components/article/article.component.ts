import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../core/models/article.model';
import { ArticleService } from '../../core/services/article.service';
import { Location } from '@angular/common';
import { Material } from '../../core/models/material.model';
import { Mapper } from '../../helpers/data/mapper';
import { MaterialService } from '../../core/services/materials.service';

@Component({
    selector: 'app-article-component',
    templateUrl: './article.component.html'
})
export class ArticleComponent implements OnInit, OnDestroy {
    Article: Article;
    ArticleId: number;
    Materials: Array<Material>;
    private Sub: any;
    constructor(private materialService: MaterialService, private route: ActivatedRoute, private articleService: ArticleService, private location: Location) {
    }
    ngOnInit() {
        this.Sub = this.route.params.subscribe(params => {
            this.ArticleId = + params['id'];
        });
        this.articleService.GetById(this.ArticleId).subscribe(data => {
            this.Article = Mapper.MapToArticle(data[0]);
            this.Materials = this.Article.materials;
            this.articleService.AddView(this.ArticleId);
        });
    }
    ngOnDestroy() {
        this.Sub.unsubscribe();
    }
    OpenUrl(url: string, id: number) {
        this.materialService.AddView(id);
        window.open(url, '_blank');
    }
    Back() {
        console.log(history.length);
        if (history.length == 1) {
            window.location.replace('/');
        } else {
            this.location.back();
        }


    }
}
