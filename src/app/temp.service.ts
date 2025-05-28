import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TempService {

  private tempFormat = new BehaviorSubject<string>('fahrenheit');
  tempFormat$ = this.tempFormat.asObservable();

  setTempFormat(format: string){
    this.tempFormat.next(format);
  }
}
