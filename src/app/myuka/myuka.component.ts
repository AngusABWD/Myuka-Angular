import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-myuka',
  templateUrl: './myuka.component.html',
  styleUrls: ['./myuka.component.css']
})
export class MyukaComponent implements OnInit {
  public produit = [];
  public ingredients: string = '';
  public test = this.produit[0];


  constructor( private http: HttpClient ) {


   }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm) {
    let temp = form.value;
    this.http.get('https://world.openfoodfacts.org/api/v0/product/' + temp.EAN ).subscribe((data) => {
      this.produit = data['code']; 
      console.log(this.produit)
    }) ;
  }

}
