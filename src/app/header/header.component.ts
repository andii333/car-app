import { Component } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { FromFirestoreService } from '../sevices/from-firestore.service';
import { ToFirestoreService } from '../sevices/to-firestore.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../app.component.css']
})
export class HeaderComponent {
 
  constructor(private serviceFromFirestore: FromFirestoreService) { }

  async ngOnInit() {
    // await this.serviceFromFirestore.getCars()
  }
  
}
