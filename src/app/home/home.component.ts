import { Component, inject, Input} from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { WeatherService } from '../weather.service';
import { LocationComponent } from '../location/location.component';
import { City } from '../city';


@Component({
  selector: 'app-home',
  imports: [ MatGridListModule, LocationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  weatherService: WeatherService;
  private dataSubscription: any;
  cityData: any[] = [];
  cities: City[] = [];
  @Input() tempFormat!: string;

  
  //constructor should only be used for dependency injection:
  constructor(){
    this.weatherService = inject(WeatherService);
  }

  ngOnInit() {
    this.cityData = this.weatherService.getData();
  }
 
}

