import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyukaComponent } from './myuka/myuka.component';
import { HttpClientModule } from '@angular/common/http';
import { CreditsComponent } from './credits/credits.component';
import { CopyrightComponent } from './copyright/copyright.component';
import { InformationsComponent } from './informations/informations.component';
import { ContactComponent } from './contact/contact.component';
import { LegalComponent } from './legal/legal.component';

@NgModule({
  declarations: [
    AppComponent,
    MyukaComponent,
    CreditsComponent,
    CopyrightComponent,
    InformationsComponent,
    ContactComponent,
    LegalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
