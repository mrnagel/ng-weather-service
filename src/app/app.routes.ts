import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Le Weather App',
    },
    {
        path: 'details/:id',
        component: DetailsComponent,
        //title is handled by the DetailsComponent
    },
];
