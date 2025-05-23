import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './weather.service';
import { MatToolbar } from '@angular/material/toolbar';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatSuffix } from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbar, MatFormField, MatLabel, MatSuffix],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ng-weather-service';
  weatherService: WeatherService = inject(WeatherService); 
  weatherData: any[] = [];

  constructor(){
    this.weatherData = this.weatherService.getData(); 
    //need to make sure WeatherService is injected before the above function is called, hence in constructor
    //at this point, WeatherService will have been injected
    //angular initializes properties before the constructor runs
  }
  

}
