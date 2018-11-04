import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../../config';
import { Injectable, NgModule } from '@angular/core';
import { Metadata } from '../core/models/metadata.model';

@NgModule({
  imports: [
    HttpClient,
  ]
})
@Injectable({
  providedIn: 'root',
})

export class MetadataRepository {
  path: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) {
    this.path = Config.SERVER + 'Metadatas/';
  }

  GetAll() {
    return this.http.get<Array<Metadata>>(this.path);
  }
  Add(entity: Metadata) {
    this.http.post(this.path, JSON.stringify(entity), this.httpOptions).subscribe();
  }

  Delete(id: number) {
    this.http.delete(this.path + id).subscribe();
  }

  Update(entity: Metadata) {
    return this.http.put<Metadata>(this.path + entity.id, JSON.stringify(entity), this.httpOptions);
  }

  GetById(id: number) {
    return this.http.get<Metadata>(this.path + id);
  }
  SendEmail(title: string, body: string) {
    this.http.get(Config.SERVER + 'Email/' + title + '/' + body).subscribe();
  }
}
