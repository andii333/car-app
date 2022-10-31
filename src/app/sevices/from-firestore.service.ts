import { Injectable } from '@angular/core';
import { collection, doc, DocumentData, getDoc, getDocs, getFirestore } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { CarClass } from 'src/app/classes/car-class';
import { DetailInterface } from '../interfaces/detail-interface';
import { ToFirestoreService } from './to-firestore.service';

@Injectable({
  providedIn: 'root'
})

export class FromFirestoreService {
  app = initializeApp(environment.firebaseConfig);
  db = getFirestore(this.app);
  carDetails: DetailInterface[] = [];
  cars: CarClass[] = [];

  constructor(private serviceToFirestore: ToFirestoreService) { 
    this.getCars()
  }

  async getData(car: CarClass) {
    const docRef = doc(this.db, "cars", `${car.name + ' ' + car.year + 'p'}`);
    const docSnap = await getDoc(docRef);
      this.carDetails.push(docSnap.data() as DetailInterface)
  }

  async getCars() {
    const querySnapshot = await getDocs(collection(this.db, "cars"));
    querySnapshot.forEach((doc) => {
      if (doc) {
        const car = new CarClass;
        car.name = doc.data()['car'].name;
        car.year = doc.data()['car'].year;
        car.color = doc.data()['car'].color;
        car.info = doc.data()['car'].info;
        car.photo = doc.data()['car'].photo;
        this.cars.push(car);
      }
    });
  }

  

}
