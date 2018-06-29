import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";

@Component({
  selector: 'page-filter-person',
  templateUrl: 'filter-person.html',
})
export class FilterPersonPage {

  persons: any = [];
  personToSearch:string;
  personsToShow:any = [];

  // persons:any = [{
  //   firstName: 'Leandro',
  //   lastName: 'Cocchi'
  // },
  //   {
  //     firstName: 'Julieta',
  //     lastName: 'Meved'
  //   },
  //   {
  //     firstName: 'Christian',
  //     lastName: 'Cocchi'
  //   },
  //   {
  //     firstName: 'Roberto',
  //     lastName: 'Medved'
  //   },
  //   {
  //     firstName: 'Graciela',
  //     lastName: 'Duhay'
  //   }];


  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider) { }

  ionViewDidLoad() {
    this.userProvider.getAllUser()
      .subscribe( data => {
        this.persons = data;
        this.personsToShow = data;
      });
  }

  filterItems(){
    this.personsToShow = this.persons.filter(item =>
      (item.firstName.toLowerCase().indexOf(this.personToSearch.toLowerCase()) >= 0   || item.lastName.toLowerCase().indexOf(this.personToSearch.toLowerCase()) >= 0 ));
  }

}
