import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component'; 
import { FeedComponent } from './components/feed/feed.component';
import { AboutComponent } from './components/about/about.component';
import { AdminComponent } from './components/admin/admin.component';
import { ArticleComponent } from './components/article/article.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialsComponent } from './components/materials/materials.component';
import { AdminAboutComponent } from './components/admin/about/admin-about.component';
import { AdminGalleryComponent } from './components/admin/gallery/admin-gallery.component';
import { AdminMaterialsTypeComponent } from './components/admin/materials-type/admin-materials-type.component';
import { AdminArticleComponent } from './components/admin/article/admin-article.component';
import { AdminMaterialsComponent } from './components/admin/materials/admin-materials.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderService } from './services/loader.service';
import { MetadataRepository } from './database/metadata-repository';
import { MaterialService } from './core/services/materials.service';
import { ArticleService } from './core/services/article.service';
import { AdminService } from './services/admin-service';
import { MaterialsTypeService } from './core/services/materials-type.service';

const appRoutes: Routes = [
  { path: '', component: FeedComponent },
  { path: 'about', component: AboutComponent },
    { path: 'admin', component: LoginComponent },
    { path: 'admin/about', component: AdminAboutComponent, canActivate: [AdminService] },
    { path: 'admin/articles', component: AdminArticleComponent, canActivate: [AdminService] },
    { path: 'admin/gallery', component: AdminGalleryComponent, canActivate: [AdminService] },
    { path: 'admin/materials-types', component: AdminMaterialsTypeComponent, canActivate: [AdminService] },
    { path: 'admin/materials', component: AdminMaterialsComponent, canActivate: [AdminService] },
  { path: 'article/:id', component: ArticleComponent },
  { path: 'materials', component: MaterialsComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'contact', component: ContactComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FeedComponent,
    AboutComponent,
    AdminComponent,
    ArticleComponent,
    MaterialsComponent,
    AdminAboutComponent,
    AdminArticleComponent,
    AdminGalleryComponent,
    AdminMaterialsTypeComponent,
    AdminMaterialsComponent,
    AdminArticleComponent,
    GalleryComponent,
    ContactComponent,
    LoginComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
    providers: [LoaderService, MetadataRepository, MaterialService, ArticleService, AdminService, MaterialsTypeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
