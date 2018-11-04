import { Component, OnInit } from '@angular/core';
import { MetadataRepository } from '../../database/metadata-repository';
import { Metadata } from '../../core/models/metadata.model';

@Component({
    selector: 'app-about-component',
    templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {

    name: Metadata;
    phone: Metadata;
    email: Metadata;
    school: Metadata;
    photo: Metadata;
    constructor(private metadataRepository: MetadataRepository) {
    }
    ngOnInit(): void {
        this.RefreshData();
        this.name = new Metadata();
        this.phone = new Metadata();
        this.email = new Metadata();
        this.school = new Metadata();
        this.photo = new Metadata();
    }

    RefreshData() {
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
}
