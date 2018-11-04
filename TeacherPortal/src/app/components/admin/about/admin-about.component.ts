import { Component, OnInit } from '@angular/core';
import { MetadataRepository } from '../../../database/metadata-repository';
import { forEach } from '@angular/router/src/utils/collection';
import { Metadata } from '../../../core/models/metadata.model';
import { AdminLogin } from '../admin-login';
import { AdminService } from '../../../services/admin-service';
import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'app-admin-about-component',
  templateUrl: './admin-about.component.html'
})
export class AdminAboutComponent extends AdminLogin implements OnInit{
   
  name: Metadata;
  phone: Metadata;
  email: Metadata;
  school: Metadata;
  photo: Metadata;
  constructor(private metadataRepository: MetadataRepository, private adminService: AdminService, private loaderService: LoaderService) {
    super();
  }
  ngOnInit(): void {
      this.name = new Metadata();
      this.phone = new Metadata();
      this.email = new Metadata();
      this.school = new Metadata();
      this.photo = new Metadata();
      this.metadataRepository.GetAll().subscribe(data => {
        for (let i = 0; i < data.length; i++) {
          if ('name' == data[i].key) {
            this.name = data[i];
          }
          if ('phone' == data[i].key) {
            this.phone = data[i];
          }
          if ('email' == data[i].key) {
            this.email = data[i];
          }
          if ('school' == data[i].key) {
            this.school = data[i];
          }
          if ('photo' == data[i].key) {
            this.photo = data[i];
          }
        }
      });
  }
  SubmitForm() {
    this.loaderService.Start();
    this.metadataRepository.Update(this.name).subscribe(data => this.name = data);
    this.metadataRepository.Update(this.phone).subscribe(data => this.phone = data);
    this.metadataRepository.Update(this.email).subscribe(data => this.email = data);
    this.loaderService.Middle();
    this.metadataRepository.Update(this.school).subscribe(data => this.school = data);
    this.metadataRepository.Update(this.photo).subscribe(data => this.photo = data);
    this.loaderService.FinishGood();
  }
}
