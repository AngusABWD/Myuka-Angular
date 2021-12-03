import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyukaComponent } from './myuka/myuka.component';

const routes: Routes = [
  {path:'', component: MyukaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
