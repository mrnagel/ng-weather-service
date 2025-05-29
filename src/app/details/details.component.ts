import { Component, inject, Input, SimpleChange} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../weather.service';
import { Title } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { TempService } from '../temp.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [CommonModule, MatCardModule, DatePipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  tempService: TempService = inject(TempService);
  tempFormat!: string;

  route: ActivatedRoute = inject(ActivatedRoute);
  weatherService: WeatherService = inject(WeatherService);
  titleService: Title = inject(Title);

  city: any;
  cityId: number;
  cityName: string;

  constructor(){
    // get city ID from the route paramters (included via ActivatedRoute)
    this.cityId = Number(this.route.snapshot.params['id']);
    this.city = this.weatherService.getCityById(this.cityId);

    this.cityName = this.city.location.name;
    this.titleService.setTitle(`${this.cityName} Weather Details`);

    this.tempService.tempFormat$.subscribe(format => {
      this.tempFormat = format;
      this.updateUnits();
    });
  }

  updateUnits(){
    if(this.tempFormat == 'fahrenheit'){
      this.city.current.temp = `${Math.round(this.city.current.temp_f)}°F`;
      this.city.current.feelsLike = `${Math.round(this.city.current.feelslike_f)}°F`;
      this.city.current.wind = `${Math.round(this.city.current.wind_mph)} mph`;
      this.city.current.vis = `${Math.round(this.city.current.vis_miles)} mi`;
      this.city.current.pressure = `${this.city.current.pressure_in} in`;
      
      for (let day of this.city.forecast.forecastday){
        day.day.maxtemp = `${Math.round(day.day.maxtemp_f)}°F`;
        day.day.mintemp = `${Math.round(day.day.mintemp_f)}°F`;
      }
    }
    else if (this.tempFormat == 'celsius'){
      this.city.current.temp = `${Math.round(this.city.current.temp_c)}°C`;
      this.city.current.feelsLike = `${Math.round(this.city.current.feelslike_c)}°C`;
      this.city.current.wind = `${Math.round(this.city.current.wind_kph)} kph`;
      this.city.current.vis = `${Math.round(this.city.current.vis_km)} km`;
      this.city.current.pressure = `${this.city.current.pressure_mb} mb`;
      
      for (let day of this.city.forecast.forecastday){
        day.day.maxtemp = `${Math.round(day.day.maxtemp_c)}°C`;
        day.day.mintemp = `${Math.round(day.day.mintemp_c)}°C`;
      }
    }
  }
}
