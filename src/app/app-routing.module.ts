import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyukaComponent } from './myuka/myuka.component';
import { CreditsComponent } from './credits/credits.component';
import { CopyrightComponent } from './copyright/copyright.component';
import { InformationsComponent } from './informations/informations.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {path:'', component: MyukaComponent},
  {path:'credits', component: CreditsComponent},
  {path:'copyright', component: CopyrightComponent},
  {path:'informations', component: InformationsComponent},
  {path:'contact', component: ContactComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
