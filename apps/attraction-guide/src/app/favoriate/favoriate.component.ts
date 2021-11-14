import { Component, OnInit } from '@angular/core';
import { ScenicSpotTourismInfo, TourismPicture, RestaurantTourismInfo, HotelTourismInfo, BusA1Data } from '../../../../../libs/viewmodels';
import { AppService } from '../app.service';
import vehicleBus from '@iconify/icons-fluent/vehicle-bus-16-filled';
import attraction from '@iconify/icons-maki/attraction';
import food from '@iconify/icons-fluent/food-16-filled';
import hotel from '@iconify/icons-ic/baseline-hotel';

@Component({
  selector: 'hexschool-f2e-favoriate',
  templateUrl: './favoriate.component.html',
  styleUrls: ['./favoriate.component.scss']
})
export class FavoriateComponent implements OnInit {
  attractions: ScenicSpotTourismInfo[] = [];
  restauarants: RestaurantTourismInfo[] = [];
  hotels: HotelTourismInfo[] = [];
  buslines: BusA1Data[] = [];
  attractionIcon = attraction;
  foodIcon = food;
  hotelIcon = hotel;
  vehicleBusIcon = vehicleBus;

  constructor(
    private service: AppService
  ) { }

  ngOnInit(): void {
    this.fetchFavoriateList();
  }

  fetchFavoriateList(): void {
    this.service.fetchFavoriateAttraction().subscribe(res => {
      this.attractions = res;
    });
    this.service.fetchFavoriateRestaurant().subscribe(res => {
      this.restauarants = res;
    });
    this.service.fetchFavoriateHotel().subscribe(res => {
      this.hotels = res;
    });
    this.service.fetchFavoriateTrip().subscribe(res => {
      this.buslines = res;
    });

  }

}
