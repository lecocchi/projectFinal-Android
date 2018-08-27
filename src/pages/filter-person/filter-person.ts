import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import {DailyProvider} from "../../providers/daily/daily";

@Component({
  selector: 'page-filter-person',
  templateUrl: 'filter-person.html',
})
export class FilterPersonPage {

  persons: any = [];
  personToSearch:string;
  personsToShow:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider, public dailyProvider: DailyProvider) {

    this.userProvider.getAllUser()
      .subscribe( data => {
        this.persons = data;

        for( let person of this.persons){

          let personToShow:any = {
            "firstName":person.firstName,
            "lastName":person.lastName,
            "userName":person.userName,
            "avatar":person.avatar,
            "yesterday":"",
            "today":"",
            "checked": false
          }

          this.personsToShow.push(personToShow);
        }


        this.dailyProvider.daily.daily_items
          .forEach( itemProvider =>{
            this.personsToShow.forEach( itemShow =>{
              if (itemProvider.user_name == itemShow.user_name)
                itemShow.checked = true;
            });

          })

      });
  }

  filterItems(){
    this.personsToShow = this.persons.filter(item =>
      (item.firstName.toLowerCase().indexOf(this.personToSearch.toLowerCase()) >= 0 || item.lastName.toLowerCase().indexOf(this.personToSearch.toLowerCase()) >= 0 ));
  }

  changeStatusChecked(person:any){
    this.personsToShow
      .filter(item => person.user_name == item.user_name)
      .map(item => {
        item.checked = !item.checked;
      });
  }

    accept(){
        this.personsToShow.map( itemShow => {
            if (itemShow.checked){
                if (!this.dailyProvider.daily.daily_items.some(itemOrigin => itemShow.user_name === itemOrigin.user_name)) {
                    this.dailyProvider.daily.daily_items.push(itemShow);
                }
            }
        });

        this.dailyProvider.daily.daily_items.map(itemOrigin =>{
            this.personsToShow.filter( itemShow => itemShow.user_name === itemOrigin.user_name)
                .map(item =>{
                    if (!item.checked)
                        this.dailyProvider.daily.daily_items.splice(this.dailyProvider.daily.daily_items.indexOf(itemOrigin), 1);
                })
        });
        this.navCtrl.pop();
    }

  cancel(){
    this.navCtrl.pop();
  }

}
