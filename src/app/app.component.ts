import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './weather.service';
import { MatToolbar } from '@angular/material/toolbar';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { HomeComponent } from './home/home.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent, MatToolbar, MatSlideToggleModule, MatInputModule, MatProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ng-weather-service';
  weatherService: WeatherService = inject(WeatherService); 
  weatherData: any[] = [];
  tempFormat = 'fahrenheit';

  constructor(){
    this.weatherData = this.weatherService.getData();
    //need to make sure WeatherService is injected before the above function is called, hence in constructor
    //at this point, WeatherService will have been injected
    //angular initializes properties before the constructor runs
  }

  onToggleChange(event: MatSlideToggleChange){
    if(event.checked){
      this.tempFormat = 'celsius';
    }
    else{
      this.tempFormat = 'fahrenheit';
    }

    console.log(this.tempFormat)

  }

}
