import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WeatherService } from './weather.service';
import { MatToolbar } from '@angular/material/toolbar';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './home/home.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TempService } from './temp.service';

@Component({
  selector: 'app-root',
  imports: [RouterModule, HomeComponent, MatToolbar, MatSlideToggleModule, MatInputModule, MatProgressSpinnerModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ng-weather-service';
  weatherService: WeatherService = inject(WeatherService); 
  tempService: TempService = inject(TempService);
  weatherData: any[] = [];
  currentFormat = 'fahrenheit';

  constructor(){
    //need to make sure WeatherService is injected before the above function is called, hence in constructor
    //at this point, WeatherService will have been injected
    //angular initializes properties before the constructor runs
  }

  onToggleChange(event: MatSlideToggleChange){
    if(event.checked){
      this.currentFormat = 'celsius';
    }
    else{
      this.currentFormat = 'fahrenheit';
    }
    this.tempService.setTempFormat(this.currentFormat);

    console.log(this.currentFormat)

  }

  filterResults(text: string){
    this.weatherService.filterResults(text);
  }

}
