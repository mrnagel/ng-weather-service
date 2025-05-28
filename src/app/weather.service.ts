import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from './city';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly storageKey = 'cityWeatherData';

  private readonly baseUrlComponents: string[] = ['http://api.weatherapi.com/v1/forecast.json?key=647da063ff7b4d5db62174534252305&q=', '&days=5&aqi=no&alerts=yes']
  
  cityWeatherArray: any[] = []; //have to say any if we don't know strucuture. otherwise will encounter errors below

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();

    if(this.cityWeatherArray.length == 0) { //case where we're navigating to detail from home page
      this.fetchWeatherData();
    }
  }

  private loadFromLocalStorage(){
    const storedData = localStorage.getItem(this.storageKey)
    if(storedData){
      this.cityWeatherArray = JSON.parse(storedData);
      console.log("Loaded from localStorage: ", this.cityWeatherArray);
    }
  }

  private saveToLocalStorage(){
    localStorage.setItem(this.storageKey, JSON.stringify(this.cityWeatherArray));
    console.log("Saved to localStorage:", this.cityWeatherArray);

  }

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
        this.saveToLocalStorage(); // Save updated data to localStorage
      });
    }
  }

    //  for(let city of this.cityArray){
    //   let url = `${this.baseUrlComponents[0]}${city.name}${this.baseUrlComponents[1]}`
    //   let data = this.http.get(url);
    //   data.subscribe(response => {
    //     const cityDataWithPhoto = {
    //       ...response,
    //       photo: city.photo,
    //       id: Number(city.id),
    //     };

    //     this.cityWeatherArray.push(cityDataWithPhoto);
    //   });

    // } //angular performs dependency injection with whatever's in parameters of constructor
  
  getData(){
    return this.cityWeatherArray;
  }

  getCityById(id: number){
    if(!this.cityWeatherArray || this.cityWeatherArray.length == 0){
      console.log("Data unavailable, checking localStorage");
      this.loadFromLocalStorage();
    }

    return this.cityWeatherArray.find(city => city.id == id) || null;
  }

  // getCityById(id: number){
  //   if(this.cityWeatherArray){
  //     console.log("cityWeatherArray:", this.cityWeatherArray);
  //     console.log("cityWeatherArray length:", this.cityWeatherArray.length);
  //     console.log("Attributes of first city: ", Object.keys(this.cityWeatherArray[0]));
  //     return this.cityWeatherArray.find(city => city.id === id);

  //   }
  //   else{
  //     console.log("cityWeatherArray is undefined");
  //   }

  //   return 1;
  // }
  


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

  // getAnchorageData(){
  //   let ancUrl = `${this.baseUrlComponents[0]}Anchorage${this.baseUrlComponents[1]}`;
  //   return this.http.get(ancUrl);
    

  // }
}
