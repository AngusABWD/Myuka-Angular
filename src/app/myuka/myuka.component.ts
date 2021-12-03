import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-myuka',
  templateUrl: './myuka.component.html',
  styleUrls: ['./myuka.component.css']
})
export class MyukaComponent implements OnInit {

  public ingredients: string = '';
  public URLImage: string = '';
  public nutriscore: string = '';
  public allergene: string = '';
  public novaGroup: number = 0;
  public gluten: boolean = false;
  public soja: boolean = false;
  public oeufs: boolean = false;
  public produit: boolean = false;
  constructor( private http: HttpClient ) {


   }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm) {
    let temp = form.value;
      this.http.get('https://world.openfoodfacts.org/api/v0/product/' + temp.EAN ).subscribe((data: any) => {
        if ( data.product === undefined) {
          alert('Produit inconnu');
          this.produit = false;
        } else {
          this.gluten = false;
          this.soja = false;
          this.oeufs = false;
          this.ingredients = data.product.ingredients_text;
          this.URLImage = data.product.image_front_url;
          this.nutriscore = data.product.nutriscore_grade;
          this.allergene = data.product.allergens_imported;
          this.novaGroup = data.product.nova_group;
          this.affichageAllergene();
          this.affichageNovaGroup();
          this.produit = true;
          form.reset();
        }
    },
    (error) => {
      alert('Erreur ! : ' + error);
    }
    );
  }
  affichageAllergene() {
    if ( this.allergene !== undefined ) {
      if ( this.allergene.match(/gluten/gi)) {
      this.gluten = true;
      } 
      if ( this.allergene.match(/soja/gi)) {
      this.soja = true;
      } 
      if ( this.allergene.match(/œufs/gi)) {
      this.oeufs = true;
      } 
    } else {
      this.allergene = ' Aucun allergène répertorié ';
    }
  }
  affichageNovaGroup() {

  }

}
