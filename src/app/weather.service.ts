import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from './city';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private readonly baseUrlComponents: string[] = ['http://api.weatherapi.com/v1/forecast.json?key=647da063ff7b4d5db62174534252305&q=', '&days=5&aqi=no&alerts=no']
  
  cityWeatherArray: any[] = []; //have to say any if we don't know strucuture. otherwise will encounter errors below

  constructor(private http: HttpClient) {

     for(let city of this.cityArray){
      let url = `${this.baseUrlComponents[0]}${city.name}${this.baseUrlComponents[1]}`
      let data = this.http.get(url);
      data.subscribe(response => {
        const cityDataWithPhoto = {
          ...response,
          photo: city.photo,
        };

        this.cityWeatherArray.push(cityDataWithPhoto);
      });

    } //angular performs dependency injection with whatever's in parameters of constructor
  }
  getData(){
    return this.cityWeatherArray;
  }


  cityArray: City[] = [
    {
      name: 'New York',
      photo: 'https://kidmoto.taxi/wp-content/uploads/2020/01/kidmoto-new-y.jpg'
    },
    {
      name: 'Paris',
      photo: 'https://th.bing.com/th/id/R.38d6f466e3e59c696a99b3ce6b8e01ef?rik=w%2bt8JRYHVi%2b%2bWg&pid=ImgRaw&r=0',
    },
    {
      name: 'Rome',
      photo: 'https://wallpapercave.com/wp/wp6750203.jpg',
    },
    {
      name: 'London',
      photo: 'https://www.fodors.com/wp-content/uploads/2017/10/HERO_UltimateLondon_Hero_shutterstock412054315.jpg',
    },
    {
      name: 'Jerusalem',
      photo: 'https://th.bing.com/th/id/R.02ea6d22dc59ebdf828dd3f1a3644cbb?rik=Vb6%2bNZb9UV8NAg&pid=ImgRaw&r=0',
    },
    {
      name: 'Singapore',
      photo: 'https://www.amitravel.my/wp-content/uploads/2019/06/Singapore_SingaporeTourismBoard.jpg',
    },
    {
      name: 'Berlin',
      photo: 'https://www.canvasartrocks.com/cdn/shop/products/Aerial_view_of_Berlin_skyline_Wall_Mural_Wallpaper_a_1400x.jpg?v=1578614305',
    },
    {
      name: 'Amsterdam',
      photo: 'https://wallpaperaccess.com/full/2827671.jpg',
    },
    {
      name: 'Madrid',
      photo: 'https://wallpaperaccess.com/full/229932.jpg',
    },
    {
      name: 'Sydney',
      photo: 'https://wallpaperaccess.com/full/2588989.jpg',
    },
    {
      name: 'Cape Town',
      photo: 'https://images8.alphacoders.com/110/1106146.jpg',
    },
    {
      name: 'Anchorage',
      photo: 'https://wallpaperaccess.com/full/2986239.jpg',
    },
    {
      name: 'Toronto',
      photo: 'https://th.bing.com/th/id/OIP.E_a7B-IPW_6UeHVez8UJbwHaEK?cb=iwc2&rs=1&pid=ImgDetMain',
    },
    {
      name: 'Rio De Janeiro',
      photo: 'https://wallpaperaccess.com/full/3188296.jpg',
    },
    {
      name: 'Tokyo',
      photo: 'https://external-preview.redd.it/uLto2DOaxZX9kIP3JcJWdoohdFToZ_Vlta578HFTj_k.jpg?auto=webp&s=4df3c8264fbaa7984f0602054b24815be8bd6b68',
    },
    {
      name: 'Beijing',
      photo: 'https://wallpaperaccess.com/full/3247.jpg',
    },

    
  ]

  // getAnchorageData(){
  //   let ancUrl = `${this.baseUrlComponents[0]}Anchorage${this.baseUrlComponents[1]}`;
  //   return this.http.get(ancUrl);
    

  // }
}
