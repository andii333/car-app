import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToFirestoreService } from '../sevices/to-firestore.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['../app.component.css']
})
export class AddCarComponent implements OnInit {
active = false;
  form : FormGroup;
  url: HTMLImageElement | undefined;
  
  constructor(public service: ToFirestoreService) {
    this.form = new FormGroup({
      "name": new FormControl ('', Validators.required),
      "color": new FormControl ('', Validators.required),
      "year": new FormControl ('', Validators.required),
      "info": new FormControl('', Validators.required),
      "photo": new FormControl ('')
    })
   }

  ngOnInit(): void {
  }

  submit(){
    if (this.url){
      this.form.value.photo = this.url;
      console.log('this.form.value.photo', this.form.value.photo)
    }
    const car = this.form.value;
    this.service.car = car;
    this.service.addData(car);
    this.url = undefined;
    this.form.reset();
    this.alertWindowOpen();
  }

  addPhoto(event: any) {
    if (event.target.files[0]) {
      if (event.target.files[0].type.match(/image\/*/) == null) {
      } else {
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event: any) => {
          this.url = event.target.result;
        }
      }
    }
  }

alertWindowOpen(){
this.active = true;
}

alertWindowClose(){
this.active = false;
}
  
}
