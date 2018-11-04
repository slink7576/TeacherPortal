import { Injectable, Output, EventEmitter } from "@angular/core";

@Injectable()
export class LoaderService {

  @Output() change: EventEmitter<number> = new EventEmitter();
  @Output() result: EventEmitter<boolean> = new EventEmitter();

  Start() {
    this.change.emit(10);
    this.Call(20, 500);
    this.Call(30, 500);
    this.Call(40, 500);
  }
  Middle() {
    this.Call(50, 500);
    this.Call(60, 500);
    this.Call(70, 500);
    this.Call(80, 500);
  }
  FinishGood() {
    this.result.emit(true);
    this.Call(90, 500);
    this.Call(100, 500);
  }
    FinishBad() {
    this.result.emit(false);
    this.Call(90, 500);
    this.Call(100, 500);
  }
  Call(perc: number, ms: number) {
    setTimeout(() => {
      this.change.emit(perc);
    },
      ms);
  }
}
