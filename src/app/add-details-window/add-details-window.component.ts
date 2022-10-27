import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchComponent } from '../search/search.component';
import { ToFirestoreService } from '../sevices/to-firestore.service';

@Component({
  selector: 'add-details-window',
  templateUrl: './add-details-window.component.html',
  styleUrls: ['../app.component.css']
})
export class WindowComponent implements OnInit {
  form!: FormGroup;
  urls: string[] =[];
  constructor(public service: ToFirestoreService,
    public asd: SearchComponent,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      kilometrage: ['', Validators.required],
      date: ['', Validators.required],
      info: ['', Validators.required],
      photo: [],
    }
    )
  }

  addPhoto(event: any) {
    if (event.target.files[0]) {
      if (event.target.files[0].type.match(/image\/*/) == null) {
      } else {
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event: any) => {
          this.urls.push(event.target.result) ;
        }
      }
    }
  }
  
  submit() {
    if (this.form.value.photo) {
       this.form.value.photo = this.urls
    }
    this.service.addDetails(this.form.value);
    this.close()
  }

  close() {
    this.asd.activWindow = false;
  }

  removeImg(url:string){
this.urls = this.urls.filter(e=>e!=url)
  }
}
