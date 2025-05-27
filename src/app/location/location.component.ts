import { Component, Input, SimpleChange } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-location',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent {
  @Input() city!: any;
  @Input() tempFormat!: string;

  ngOnInit(){
    this.city.current.temp_f = Math.round(this.city.current.temp_f);
  }

  ngOnChanges(changes: SimpleChange){
    if(this.tempFormat == 'fahrenheit'){
      this.city.current.temp = `${Math.round(this.city.current.temp_f)}°F`;
    }
    else if(this.tempFormat == 'celsius'){
      this.city.current.temp = `${Math.round(this.city.current.temp_c)}°C`;
    }
  }

}
