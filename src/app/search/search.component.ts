import { Component, OnChanges, OnInit, Output } from '@angular/core';
import { ToFirestoreService } from '../sevices/to-firestore.service';
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { CarClass } from '../classes/car-class';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['../app.component.css']
})
export class SearchComponent implements OnInit {
  activWindow!: boolean;
  activWatchCar!: boolean;
  cars: CarClass[] = [];

  constructor(public service: ToFirestoreService) {
  }

  ngOnInit() {
  this.show()
  }

  async show() {
    const querySnapshot = await getDocs(collection(this.service.db, "cars"));
    querySnapshot.forEach((doc) => {
      if (doc) {
        const car = new CarClass;
        car.name = doc.data()['car'].name;
        car.year = doc.data()['car'].year;
        car.color = doc.data()['car'].color;
        car.info = doc.data()['car'].info;
        car.photo = doc.data()['car'].photo;
        this.cars.push(car)
      }
    });
  }

  showWindow(car: CarClass) {
    this.activWindow = true;
    this.service.car = car
  }

  showWatchCar(car: CarClass) {
    this.activWatchCar = true;
    this.service.car = car
  }
}
