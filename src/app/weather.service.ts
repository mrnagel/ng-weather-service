import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  readonly baseUrlComponents: string[] = ['http://api.weatherapi.com/v1/forecast.json?key=647da063ff7b4d5db62174534252305&q=', '&days=5&aqi=no&alerts=no']

  cityArray: string[] = [
    'New York',
    'Paris',
    'Rome',
    'London',
    'Jerusalem',
    'Bangkok',
    'Berlin',
    'Amsterdam',
    'Madrid',
    'Sydney',
    'Cape Town',
    'Buenos Aires',
    'Toronto',
    'Rio',
    'Tokyo',
  ]
  
  cityWeatherArray: any[] = []; //have to say any if we don't know strucuture. otherwise will encounter errors below

  // constructor(private http: HttpClient) {

  //   for(let city of this.cityArray){
  //     let url = `${this.baseUrlComponents[0]}${city}${this.baseUrlComponents[1]}`
  //     console.log(url);
  //     let data = this.http.get(url);
  //     data.subscribe(response => this.cityWeatherArray.push(response));
  //   }

  //  } //angular performs dependency injection with whatever's in parameters of constructor
  
  getData(){
    return this.cityWeatherArray;
  }
}
