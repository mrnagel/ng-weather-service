import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from './city';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  //storing api key directly in the component is obviously a bad idea
  //for my purposes this is more convenient though
  private readonly baseUrlComponents: string[] = ['http://api.weatherapi.com/v1/forecast.json?key=647da063ff7b4d5db62174534252305&q=', '&days=5&aqi=no&alerts=yes']
  
  cityWeatherArray: any[] = []; //do not wanna define those massive objects in an interface, respectfully

  //enable dynamic updates from search, sorting, etc.
  filteredCityWeatherArray = new BehaviorSubject<any[]>([]);
  filteredArray$ = this.filteredCityWeatherArray.asObservable();

  constructor(private http: HttpClient) {
    this.fetchWeatherData();
  }
  
  //fetch api data for each city in the Cities array below
  //also adds my own id's and photos to each city in the new weather dataset (confusing ik)
  private fetchWeatherData() {
    for (let city of this.cityArray) {
      let url = `${this.baseUrlComponents[0]}${city.name}${this.baseUrlComponents[1]}`;
      this.http.get(url).subscribe(response => {
        const cityDataWithPhoto = {
          ...response,
          photo: city.photo,
          id: Number(city.id),
        };
        this.cityWeatherArray.push(cityDataWithPhoto);
      });
    }
    this.filteredCityWeatherArray.next(this.cityWeatherArray);
  }

  filterResults(text: string){
    const results = this.cityWeatherArray.filter((city) => city.location.name.toLowerCase().includes(text.toLowerCase()));
    this.filteredCityWeatherArray.next(results);
  }

  getCityById(id: number){ //used by details component
    return this.cityWeatherArray.find(city => city.id == id) || null;
  }

  sortArray(text: string){ //used for sorting functionality in app component
    const staticArray = this.filteredCityWeatherArray.getValue();
    let sorted: any[] = [];

    if(text == 'alphabetical'){
      sorted = staticArray.sort((a, b) => a.location.name.localeCompare(b.location.name));
    }
    else if(text == 'temp_asc'){
      sorted = staticArray.sort((a, b) => a.current.temp_f - b.current.temp_f);
    }
    else if (text == 'temp_desc'){
      sorted = staticArray.sort((a, b) => b.current.temp_f - a.current.temp_f);
    }else if(text == 'scramble'){
      sorted = this.shuffleArray(staticArray);
    }

    this.filteredCityWeatherArray.next(sorted);
  }

  //Fisher-Yates shuffle
  shuffleArray(array: any[]){
    let currentIndex = array.length;

    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  //source cities array (might try and implement Google Places API)
  cityArray: City[] = [
    {
      id: 8,
      name: 'New York',
      photo: 'https://kidmoto.taxi/wp-content/uploads/2020/01/kidmoto-new-y.jpg'
    },
    {
      id: 9,
      name: 'Paris',
      photo: 'https://th.bing.com/th/id/R.38d6f466e3e59c696a99b3ce6b8e01ef?rik=w%2bt8JRYHVi%2b%2bWg&pid=ImgRaw&r=0',
    },
    {
      id: 11,
      name: 'Rome',
      photo: 'https://wallpapercave.com/wp/wp6750203.jpg',
    },
    {
      id: 6,
      name: 'London',
      photo: 'https://www.fodors.com/wp-content/uploads/2017/10/HERO_UltimateLondon_Hero_shutterstock412054315.jpg',
    },
    {
      id: 5,
      name: 'Jerusalem',
      photo: 'https://th.bing.com/th/id/R.02ea6d22dc59ebdf828dd3f1a3644cbb?rik=Vb6%2bNZb9UV8NAg&pid=ImgRaw&r=0',
    },
    {
      id: 12,
      name: 'Singapore',
      photo: 'https://www.amitravel.my/wp-content/uploads/2019/06/Singapore_SingaporeTourismBoard.jpg',
    },
    {
      id: 3,
      name: 'Berlin',
      photo: 'https://www.canvasartrocks.com/cdn/shop/products/Aerial_view_of_Berlin_skyline_Wall_Mural_Wallpaper_a_1400x.jpg?v=1578614305',
    },
    {
      id: 0,
      name: 'Amsterdam',
      photo: 'https://wallpaperaccess.com/full/2827671.jpg',
    },
    {
      id: 7,
      name: 'Madrid',
      photo: 'https://wallpaperaccess.com/full/229932.jpg',
    },
    {
      id: 13,
      name: 'Sydney',
      photo: 'https://wallpaperaccess.com/full/2588989.jpg',
    },
    {
      id: 4,
      name: 'Cape Town',
      photo: 'https://images8.alphacoders.com/110/1106146.jpg',
    },
    {
      id: 1,
      name: 'Anchorage',
      photo: 'https://wallpaperaccess.com/full/2986239.jpg',
    },
    {
      id: 15,
      name: 'Toronto',
      photo: 'https://th.bing.com/th/id/OIP.E_a7B-IPW_6UeHVez8UJbwHaEK?cb=iwc2&rs=1&pid=ImgDetMain',
    },
    {
      id: 10,
      name: 'Rio De Janeiro',
      photo: 'https://wallpaperaccess.com/full/3188296.jpg',
    },
    {
      id: 14,
      name: 'Tokyo',
      photo: 'https://www.thetimes.com/imageserver/image//methode/times/prod/web/bin/eb7d1f05-31d5-4614-8be1-e63b603bbb85.jpg?crop=3415%2C1920%2C983%2C366&resize=1200',
      //'https://external-preview.redd.it/uLto2DOaxZX9kIP3JcJWdoohdFToZ_Vlta578HFTj_k.jpg?auto=webp&s=4df3c8264fbaa7984f0602054b24815be8bd6b68',
    },
    {
      id: 2,
      name: 'Beijing',
      photo: 'https://wallpaperaccess.com/full/3247.jpg',
    }, 
  ]
}
