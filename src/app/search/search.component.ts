import { Component, OnInit } from '@angular/core';
import { ToFirestoreService } from '../sevices/to-firestore.service';
import { CarClass } from '../classes/car-class';
import { FromFirestoreService } from '../sevices/from-firestore.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['../app.component.css']
})
export class SearchComponent implements OnInit {

  activWindow!: boolean;
  activWatchCar!: boolean;
  cars: CarClass[] = this.serviceFromFirestoreService.cars;
  
  constructor(public serviceToFirestoreService: ToFirestoreService,
    public serviceFromFirestoreService: FromFirestoreService
    ) {}
    
  ngOnInit() {
  }

  showWindow(car: CarClass) {
    this.activWindow = true;
    this.serviceToFirestoreService.car = car
  }

  showWatchCar(car: CarClass) {
    this.activWatchCar = true;
    this.serviceToFirestoreService.car = car
  }

  async searchCar(event: Event) {
    const letter = (event.target as HTMLInputElement).value
    if (typeof (letter) === 'string') {
      this.cars = this.serviceFromFirestoreService.cars.filter(e =>
        e.name.toLowerCase().includes(letter.toLowerCase()))
    }
  }
}


