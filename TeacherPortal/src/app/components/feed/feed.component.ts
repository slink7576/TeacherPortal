import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../core/services/article.service';
import { Article } from '../../core/models/article.model';
import { Mapper } from '../../helpers/data/mapper';
import { LoaderService } from '../../services/loader.service';

@Component({
    selector: 'app-feed-component',
    templateUrl: './feed.component.html'
})

export class FeedComponent implements OnInit {

    private articles: Array<Article>;
    page: number = 0;
    previousPage: number = 0;
    constructor(private articleService: ArticleService, private loaderService: LoaderService) {
    }
    ngOnInit(): void {
        this.RefreshArticles();
    }
    RefreshArticles() {
        this.loaderService.Start();
        this.articleService.GetPage(this.page).subscribe(data => {
            this.loaderService.Middle();
            if (data == null || data.length == 0) {
                this.page = this.previousPage;
                this.RefreshArticles();
            }
            else {
                const tmpArr = new Array<Article>();
                for (let i = 0; i < data.length; i++) {
                    tmpArr.push(Mapper.MapToArticle(data[i]));
                }
                this.articles = tmpArr;
                this.loaderService.FinishGood();
            }
        },
            error => {
                this.loaderService.FinishBad();
            }

        );
    }
    Next() {
        this.previousPage = this.page;
        this.page++;
        this.RefreshArticles();
    }
    Previous() {
        this.previousPage = this.page;
        this.page--;
        this.RefreshArticles();
    }
}
