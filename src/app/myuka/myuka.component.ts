import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-myuka',
  templateUrl: './myuka.component.html',
  styleUrls: ['./myuka.component.css']
})
export class MyukaComponent implements OnInit {
  public textForm: string = 'EAN...13 chiffres'
  public ingredients: string = '';
  public URLImage: string = '';
  public nutriscore: string = '';
  public allergene: string = '';
  public allergeneList: string = '';
  public ingredientAnalyse: string='';
  public marque: string='';
  public name: string='';
  public fabriquant: string='';
  public magasins: string = '';
  public pays: string = '';
  public txFat: string = '';
  public txSaturated: string = '';
  public txSugar: string = '';
  public txSalt: string = '';
  public novaGroup: number = 0;
  public gluten: boolean = false;
  public soja: boolean = false;
  public oeufs: boolean = false;
  public lait: boolean = false;
  public celeri: boolean = false;
  public arachides: boolean = false;
  public coque: boolean = false;
  public palm: number = 0;
  public vegetarien: number = 0;
  public vegan: number = 0;
  public fat100: number = 0;
  public saturatedFat100: number = 0;
  public sugar100: number = 0;
  public salt100: number = 0;
  public fatScore: number = 0;
  public saturatedScore: number = 0;
  public sugarScore: number = 0;
  public saltScore: number = 0;
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
          this.arachides = false;
          this.gluten = false;
          this.soja = false;
          this.oeufs = false;
          this.lait = false;
          this.coque = false;
          this.celeri = false;
          this.ingredients = data.product.ingredients_text;
          this.URLImage = data.product.image_front_url;
          this.nutriscore = data.product.nutriscore_grade;
          this.allergene = data.product.allergens;
          this.allergeneList = data.product.allergens_imported
          this.novaGroup = data.product.nova_group;
          this.nutriscore = data.product.nutriscore_grade;
          this.ingredientAnalyse = data.product.ingredients_analysis_tags;
          this.marque = data.product.brands_tags[0];
          this.name = data.product.product_name;
          this.fabriquant = data.product.owners_tags;
          this.magasins = data.product.stores;
          this.pays = data.product.countries;
          this.fat100 = data.product.nutriments.fat_100g;
          this.saturatedFat100 = data['product']['nutriments']['saturated-fat_100g'];
          this.sugar100 = data.product.nutriments.sugars_100g;
          this.salt100 = data.product.nutriments.sodium_100g;
          this.affichageAllergene();
          this.affichageNovaGroup();
          this.affichageNutriscore();
          this.affichageIngredientAnalyse();
          this.calculScore();
          this.produit = true;
          this.textForm = data.product.code;
          form.reset();
        }
    },
    (error) => {
      alert('Erreur ! : ' + error);
    }
    );
  }
  affichageAllergene() {
    if ( this.allergene.length > 0 ) {
      if ( this.allergene.match(/gluten/gi)) {
      this.gluten = true;
      } 
      if ( this.allergene.match(/soy/gi)) {
      this.soja = true;
      } 
      if ( this.allergene.match(/egg/gi)) {
      this.oeufs = true;
      } 
      if ( this.allergene.match(/milk/gi)) {
        this.lait = true;
        } 
      if ( this.allergene.match(/nuts/gi)) {
        this.coque = true;
        } 
      if ( this.allergene.match(/celery/gi)) {
        this.celeri = true;
        } 
      if ( this.allergene.match(/peanut/gi)) {
        this.arachides = true;
        } 
    } else {
      this.allergeneList = " Aucun allergène répertorié ( ne signifie pas une abscence d'allergènes ) ";
    }
  }
  affichageIngredientAnalyse() {
    if ( this.ingredientAnalyse !== undefined ) {
      if ( this.ingredientAnalyse[0].match(/palm-oil-free/gi)) {
      this.palm = 1;
      } else if ( this.ingredientAnalyse[0].match(/unknown/gi)){
        this.palm = 3;
      } else {
        this.palm = 2;
      }
      if ( this.ingredientAnalyse[1].match(/maybe-vegan/gi)) {
        this.vegan = 1;
        } else if ( this.ingredientAnalyse[1].match(/non-vegan/gi)){
          this.vegan = 2;
        } else {
          this.vegan = 3;
        }
        if ( this.ingredientAnalyse[2].match(/maybe-vegetarian/gi)) {
          this.vegetarien = 1;
          } else if ( this.ingredientAnalyse[2].match(/non-vegetarian/gi)){
            this.vegetarien = 2;
          } else {
            this.vegetarien = 3;
          }
  
    } else {
      this.ingredientAnalyse = ' Aucune Analyse Alimentaire';
    }

  }
  affichageNovaGroup() {
    if ( this.novaGroup === undefined ) {
      this.novaGroup = 5;
    }
  }
  affichageNutriscore() {
    if ( this.nutriscore === undefined ){
      this.nutriscore = 'z';
    }
  }
  calculScore() {
    if ( this.fat100 !== undefined ) {
      if ( this.fat100 < 3 ){
        this.fatScore = 1;
        this.txFat = "Faible";
      } else if ( this.fat100 < 17.5 ) {
        this.fatScore = 2;
        this.txFat = "Moyen";
      } else {
        this.fatScore = 3; 
        this.txFat = "Elevé";
      }
    } else {
      this.fatScore =0;
      this.txFat = "Inconnu"
    }
    if ( this.saturatedFat100 !== undefined ) {
      if ( this.saturatedFat100 < 1.5 ){
        this.saturatedScore = 1;
        this.txSaturated = "Faible";
      } else if ( this.saturatedFat100 < 5 ) {
        this.saturatedScore = 2;
        this.txSaturated = "Moyen";
      } else {
        this.saturatedScore = 3; 
        this.txSaturated = "Elevé";
      }
    } else {
      this.saturatedScore =0;
      this.txSaturated = "Inconnu"
    }
    if ( this.sugar100 !== undefined ) {
      if ( this.sugar100 < 5 ){
        this.sugarScore = 1;
        this.txSugar = "Faible";
      } else if ( this.sugar100 < 22.5 ) {
        this.sugarScore = 2;
        this.txSugar = "Moyen";
      } else {
        this.sugarScore = 3; 
        this.txSugar = "Elevé";
      }
    } else {
      this.sugarScore =0;
      this.txSugar = "Inconnu"
    }
    if ( this.salt100 !== undefined ) {   
      if ( this.salt100 < 0.3 ){
        this.saltScore = 1;
        this.txSalt = "Faible";
      } else if ( this.salt100 < 1.5 ) {
        this.saltScore = 2;
        this.txSalt = "Moyen";
      } else {
        this.saltScore = 3; 
        this.txSalt = "Elevé";
      }
    } else {
      this.saltScore =0;
      this.txSalt = "Inconnu"
    }
  }

}
