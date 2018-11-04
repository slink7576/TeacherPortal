import { Component, OnInit, ViewChild } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader-component',
  templateUrl: './loader.component.html',
  providers: []
})
export class LoaderComponent {
  @ViewChild('bar') private bar;
  constructor(private loaderService: LoaderService) {
    this.loaderService.change.subscribe(number => { this.Update(number) });
    this.loaderService.result.subscribe(result => { this.Finish(result) });
  }
 
  Update(perc: number) {
    this.bar.nativeElement.style.width = perc + '%';
  }
  Finish(result: boolean) {
    if (result) {
      this.SetSuccess();
    }
    else {
      this.SetError();
    }
  }

  SetSuccess() {
    this.bar.nativeElement.style.backgroundColor = '#5e83ba';
    setTimeout(() => {
      this.Update(0);
    },
      2000);
  }

  SetError() {
      this.bar.nativeElement.style.backgroundColor = '#DC143C';
    setTimeout(() => {
      this.Update(0);
    },
      2000);
  }
}
