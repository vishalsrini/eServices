import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { Http } from '@angular/http';
import { OneSignal } from '@ionic-native/onesignal';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/map';

import { SocialSharing } from '@ionic-native/social-sharing';
import { AdMobFree, AdMobFreeBannerConfig } from "@ionic-native/admob-free";

const bannerConfig: AdMobFreeBannerConfig = {
  // add your config here
  // for the sake of this example we will just use the test config
  isTesting: false,
  autoShow: true,
  id: "ca-app-pub-1307546929784150/9777361229"
};

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  items: any[];

  dataList: any = [{
    "title": "Passport Seva",
    "imgSrc": "http://is3.mzstatic.com/image/thumb/Purple71/v4/42/8d/96/428d9618-03e6-c310-4184-3ca717d1cdfe/source/1200x630bb.jpg",
    "href": "http://www.passportindia.gov.in",
    "description": "This portal has been designed to provide comprehensive, reliable, user-friendly and one-stop source of information on obtaining a passport by a citizen in India."
  }, {
    "title": "EPFO",
    "imgSrc": "http://epfo-hyd.ap.nic.in/images/epfobig2.jpg",
    "href": "https://unifiedportal-mem.epfindia.gov.in/memberinterface/",
    "description": "Employees provident fund organisation. Can see the details about your PF amount here"
  }, {
    "title": "Income Tax eFiling",
    "imgSrc": "http://www.oneindia.com/img/2015/07/14-1436859753-income-tax.jpg",
    "href": "https://incometaxindiaefiling.gov.in/",
    "description": "The Portal has been developed as a Mission Mode Project under the National E-Governance Plan of the Government. The objective behind the Portal is to provide a single window access to the information and services being provided by the Indian Government for the citizens and other stakeholders."
  }, {
    "title": "IRCTC",
    "imgSrc": "https://upload.wikimedia.org/wikipedia/en/thumb/4/45/IRCTC_Logo.svg/826px-IRCTC_Logo.svg.png",
    "href": "https://www.irctc.co.in/eticketing/loginHome.jsf",
    "description": "Online portal to get rail tickets. Book tickets on the go from any place"
  }, {
    "title": "RTI Online",
    "imgSrc": "https://onlinerti.com/images/new_design/logo.png",
    "href": "https://onlinerti.com/",
    "description": "At Online RTI, our lawyers are experts at processing RTIs, so you don’t have to worry about it. Simply click on your problem below, submit your application, and consider your case at the top of the government’s queue."
  }, {
    "title": "India Post Mail Services",
    "imgSrc": "https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/India_Post_Logo.svg/1280px-India_Post_Logo.svg.png",
    "href": "https://www.indiapost.gov.in/MBE/Pages/Content/Mail-Services.aspx",
    "description": "The primary function of Post Office is collection, processing, transmission and delivery of mail. All postal articles whose contents are in the nature of message can be classified as mail which includes Letters, Postcards, Inland Letter Cards, Packets, Ordinary, Registered, Insured, Value Payable articles and Speed Post."
  }];

  constructor(public navCtrl: NavController, private admob: AdMobFree, private _http: Http, private _sharing: SocialSharing, public oneSignal: OneSignal) {
    this._http.get("http://www.vishalsrini.com/eservices.json").map(data => data.json()).subscribe(data => {
      this.dataList = data.data;
      this.items = this.dataList;
    }, error => {
      alert('Please Connect with Internet to get more');
    })
    this.items = this.dataList;
   
    this.admob.banner.config(bannerConfig);

    this.admob.banner.prepare()
      .then(() => {
        // banner Ad is ready
        // if we set autoShow to false, then we will need to call the show method here
      })
      .catch(e => console.log(e));

      this.oneSignal.startInit('36fb5194-bd75-4624-9e29-ff0ba74301ec', '153740038298');

        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

        this.oneSignal.handleNotificationReceived().subscribe(() => {
        // do something when notification is received
        });

        this.oneSignal.handleNotificationOpened().subscribe(() => {
          // do something when a notification is opened
        });

        this.oneSignal.endInit();

  }

  initializeItems() {
    this.items = this.dataList;
  }

  share() {
    this._sharing.share("Want to know all the government websites that helps your day to day life easier? Here it is - Govt EServices App https://play.google.com/store/apps/details?id=io.govt.services");
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don"t filter the items
    if (val && val.trim() != "") {
      this.items = this.items.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
