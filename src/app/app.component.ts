import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
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
