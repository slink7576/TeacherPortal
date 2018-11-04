import { Component } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { Config } from '../../../config';
import { MetadataRepository } from '../../database/metadata-repository';

@Component({
  selector: 'app-contact-component',
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  name: string;
  body: string;
  formError: boolean = false;
  hasSend :boolean = false;
  constructor(private metadataRepository: MetadataRepository) {
  }
  SubmitForm() {
    if (this.name == undefined || this.name.length == 0) {
      this.formError = true;
    }
    else if (this.body == undefined || this.body.length == 0) {
      this.formError = true;
    }
    else {
      this.hasSend = true;
      this.metadataRepository.SendEmail(this.name, this.body);
    } 
  }
}
