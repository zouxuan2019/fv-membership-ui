import { Injectable } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class WidgetUtilServiceService {

  constructor(private toastController: ToastController, private alertController: AlertController) { }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500
    });
    toast.present();
  }

  async presentAlertConfirm(header, message, buttons) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons
    });
    await alert.present();
  }
}
