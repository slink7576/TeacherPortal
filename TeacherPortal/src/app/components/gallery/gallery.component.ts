import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../../core/services/materials.service';
import { Material } from '../../core/models/material.model';
import { Mapper } from '../../helpers/data/mapper';

@Component({
  selector: 'app-gallery-component',
  templateUrl: './gallery.component.html'
})
export class GalleryComponent implements OnInit {
  photos: Array<Material>;

  ngOnInit(): void {
    this.photos = this.photoService.GetPhotos();
  }
  
  constructor(private photoService: MaterialService) {
  }
}
