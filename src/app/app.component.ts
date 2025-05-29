import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WeatherService } from './weather.service';
import { MatToolbar } from '@angular/material/toolbar';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { TempService } from './temp.service';

@Component({
  selector: 'app-root',
  imports: [RouterModule, MatToolbar, MatSlideToggleModule, MatInputModule, MatProgressSpinnerModule, MatButtonModule, MatSelectModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ng-weather-service';
  weatherService: WeatherService = inject(WeatherService); 
  tempService: TempService = inject(TempService);
  weatherData: any[] = [];
  currentFormat = 'fahrenheit';

  constructor(){}

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

  onOptionSelected(event: any){
    this.weatherService.sortArray(event.value);
  }

  filterResults(text: string){
    this.weatherService.filterResults(text);
  }

}
