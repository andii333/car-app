import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { AddCarComponent } from './add-car/add-car.component';
import { ContactComponent } from './contact/contact.component';
const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'add-car', component: AddCarComponent },
  { path: 'contact', component: ContactComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
