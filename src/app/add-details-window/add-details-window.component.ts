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
  urls: string[] = [];
  tooBigSizePhoto = false;
  constructor(public service: ToFirestoreService,
    public sc: SearchComponent,
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
    if (event.target.files[0] && event.target.files[0].type.match(/image\/*/) != null) {
      if (event.target.files[0].size < 300000) {
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event: any) => {
          this.urls.push(event.target.result);
          this.tooBigSizePhoto = false
        }
      } else { this.tooBigSizePhoto = true}
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
  this.sc.activWindow = false;
}

removeImg(url: string){
  this.urls = this.urls.filter(e => e != url)
}
}
