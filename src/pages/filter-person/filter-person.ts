import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";

@Component({
  selector: 'page-filter-person',
  templateUrl: 'filter-person.html',
})
export class FilterPersonPage {

    persons:any = [];
    persona:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public userProvider: UserProvider) {
  }

  ionViewDidLoad() {
    this.userProvider.getAllUser()
        .subscribe( data => {
            this.persons = data;
        });
  }

    filterItems(){

      //console.log(this.persona);
        return this.persons.filter((item) => {
            return item.firstName.toLowerCase().
                indexOf(this.persona.toLowerCase()) > -1 ||
                item.lastName.toLowerCase().
                indexOf(this.persona.toLowerCase()) > -1;
        });
    }

}
