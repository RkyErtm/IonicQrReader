import { Component, Injector, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { BasePage } from '../base-page';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage extends BasePage implements OnInit {
  imagePath?: string;
  imgs: any[] = [];
  scannedResult: any;
  content_visibility = '';
  id?: number;
  user?: User;

  constructor(
    injector: Injector,
    private alertController: AlertController,
    private apiService: ApiService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    this.user = user ? JSON.parse(user) : null;
  }

  async checkPermission() {
    try {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async startScan() {
    try {
      const permission = await this.checkPermission();
      if (!permission) {
        return;
      }
      await BarcodeScanner.hideBackground();
      document.querySelector('body')?.classList.add('scanner-active');
      this.content_visibility = 'hidden';
      const result = await BarcodeScanner.startScan();
      console.log(result);
      BarcodeScanner.showBackground();
      document.querySelector('body')?.classList.remove('scanner-active');
      this.content_visibility = '';
      if (result?.hasContent) {
        this.scannedResult = result.content;
        this.presentAlert(this.scannedResult);
        console.log(this.scannedResult);
      }
    } catch (e) {
      console.log(e);
      this.stopScan();
    }
  }

  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body')?.classList.remove('scanner-active');
    this.content_visibility = '';
  }

  ngOnDestroy(): void {
    this.stopScan();
  }


  async presentAlert(link: any) {
    const alert = await this.alertController.create({
      header: 'QR Link',
      subHeader: 'Yönlendirmeye gitmek ister misin?',
      message: link,
      buttons: [
        {
          text: 'İptal',
          role: 'cancel'
        },
        {
          text: 'Git',
          role: 'confirm',
          handler: () => {
            window.open(link);
          },
        }
      ],
    });

    await alert.present();
  }
}
