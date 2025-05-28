import { Component, inject, Input} from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { WeatherService } from '../weather.service';
import { LocationComponent } from '../location/location.component';
import { ActivatedRoute } from '@angular/router';
import { TempService } from '../temp.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-home',
  imports: [ MatGridListModule, LocationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  weatherService: WeatherService = inject(WeatherService);
  cityData: any[] = [];
  tempService: TempService = inject(TempService);
  route: ActivatedRoute = inject(ActivatedRoute);
  tempFormat = 'fahrenheit'; // default format
  subscription: Subscription | undefined;

  ngOnInit() {
    this.weatherService.filteredArray$.subscribe(data => {
      this.cityData = data
    })
    this.subscription = this.tempService.tempFormat$.subscribe((format: string) => {
      this.tempFormat = format;
    });
  }

  ngOnDestroy(){
    this.subscription?.unsubscribe();
  }
  
 
}

