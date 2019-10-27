import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController,AlertController,LoadingController, Loading } from 'ionic-angular';
import {RestProvider} from '../../../providers/rest/rest';
import { StorageProvider } from '../../../providers/storage/storage';
import { ResetPasswordPage } from '../reset-password/reset-password.page';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {

  public user='';
  constructor(public navCtrl: NavController, public navParams: NavParams,public rest:RestProvider,public storage:StorageProvider,public alertCtrl: AlertController,public loadingCtrl: LoadingController) {
    
  }

  ngOnInit() {
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    console.log('ionViewDidLoad ForgetpasswordPage');
  }

  goResetPasswordPage(){
      console.log(this.user);
      this.presentLoading();

      
      if(this.user!=""){
      
        this.rest.SendOTP(this.user) .subscribe(
          outcome => this.ProcessResult(JSON.parse(outcome)),
          error => this.ErrorToast(error));
        }
        else{
          this.ErrorToast("Can not be empty");
        }
      }


      ProcessResult(data){ 
        console.log(data);
        if(data["status"]){
          this.ErrorToast(data["message"]);
          
        }
        else{
          this.ErrorToast(data["message"]);
        }
        
       }
      
       ErrorToast(error){
        console.log(error);
      
            let alert = this.alertCtrl.create({
            title: 'Info',
            subTitle: error,
            buttons: [
              {
                text: 'OK',
                handler: () => {
                  this.navCtrl.push(ResetPasswordPage); 
                }
              }
            ]
          });
          alert.present();
        
      }

      presentLoading() {
        let loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
      
        loading.present();
      
        setTimeout(() => {
          loading.dismiss();
        }, 3000);
      }
     
}



