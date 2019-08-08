import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProvider } from "../../providers/user/user";
import { DailyProvider } from "../../providers/daily/daily";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-filter-person',
  templateUrl: 'filter-person.html',
})
export class FilterPersonPage {

  persons: any = [];
  personToSearch: string;
  personsToShow: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public userProvider: UserProvider, public dailyProvider: DailyProvider,
    public storage: Storage) { }


  ionViewWillEnter() {
    this.personsToShow = [];
    this.storage.get("projectId")
      .then((id: any) => {

        this.userProvider.getUserByProject(id)
          .subscribe((users: any) => {

            for (let user of users) {
              let personToShow: any = {
                "firstName": user.firstName,
                "lastName": user.lastName,
                "userName": user.userName,
                "avatar": user.avatar,
                "yesterday": "",
                "today": "",
                "checked": false
              }
              this.personsToShow.push(personToShow);
            }

            this.persons = this.personsToShow;


            this.dailyProvider.daily.daily_items
              .forEach(itemProvider => {
                this.personsToShow.forEach(itemShow => {
                  if (itemProvider.userName === itemShow.userName)
                    itemShow.checked = true;
                });
              })
          });
      });
  }

  filterItems() {
    this.personsToShow = this.persons.filter(item =>
      (item.firstName.toLowerCase().indexOf(this.personToSearch.toLowerCase()) >= 0 || item.lastName.toLowerCase().indexOf(this.personToSearch.toLowerCase()) >= 0));
  }

  changeStatusChecked(person: any) {
    this.personsToShow
      .filter(item => person.userName === item.userName)
      .map(item => {
        item.checked = !item.checked;
      });
  }

  accept() {
    this.personsToShow.map(itemShow => {
      if (itemShow.checked) {
        if (!this.dailyProvider.daily.daily_items.some(itemOrigin => itemShow.userName === itemOrigin.userName)) {
          this.dailyProvider.daily.daily_items.push(itemShow);
        }
      }
    });

    this.dailyProvider.daily.daily_items.map(itemOrigin => {
      this.personsToShow.filter(itemShow => itemShow.userName === itemOrigin.userName)
        .map(item => {
          if (!item.checked)
            this.dailyProvider.daily.daily_items.splice(this.dailyProvider.daily.daily_items.indexOf(itemOrigin), 1);
        })
    });
    this.navCtrl.pop();
  }

  cancel() {
    this.navCtrl.pop();
  }

}
