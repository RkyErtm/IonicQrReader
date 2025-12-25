import { Login } from './../../models/register';
import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base-page';
import { ApiService } from 'src/app/services/api.service';
import { QrCode } from 'src/app/models/qrCode';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage extends BasePage implements OnInit {

  qrCodes: QrCode[] = [];
  user: any;
  constructor(injector: Injector,
    private apiService: ApiService
  ) {
    super(injector);
  }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({
      backdropDismiss: true
    });
    loading.present();
    const user = localStorage.getItem('user');
    this.user = user ? JSON.parse(user) : null;
    if (this.user) {
      this.getQrCodes(this.user?.id);
      loading.dismiss();
    } else {
      loading.dismiss();
    }
  }

  async deleteCode(id: number | any, index: number) {
    const alert = await this.alertCtrl.create({
      header: 'Uyarı',
      subHeader: 'Silmek istediğinize emin misiniz?',
      message: 'Kod kalıcı olarak silinecektir',
      buttons: [
        {
          text: 'İptal',
          role: 'cancel',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Onayla',
          role: 'confirm',
          handler: () => {
            this.apiService.deleteQrCode(id).subscribe((res: any) => {
              if (res.success == true) {
                this.qrCodes.splice(index, 1);
                this.showToast('Silme işlemi başarılı', 'success');
              }
            },
              (err: any) => {
                this.showToast('Silme işlemi başarısız', 'danger');

              })
          },
        },
      ],
    });
    await alert.present();

  }

  async quit() {
    const alert = await this.alertCtrl.create({
      header: 'Uyarı',
      subHeader: 'Çıkış yapmak istediğinize emin misiniz?',
      backdropDismiss: false,
      buttons: [
        {
          text: 'İptal',
          role: 'cancel',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Onayla',
          role: 'confirm',
          handler: async () => {
            const alert = await this.alertCtrl.create({
              message: 'Yine Bekleriz :)',
              backdropDismiss: false,
              buttons: [{
                text: 'Tamam',
                role: 'confirm',
                handler: async () => {
                  localStorage.clear();
                  this.router.navigate(['/tabs/home']);
                  setTimeout(() => {
                    window.location.reload();
                  }, 1000);
                }
              }]
            });
            alert.present();

          },
        },
      ],
    });
    await alert.present();
  }

  getQrCodes(userId: number) {
    this.apiService.getListQrCode(userId).subscribe((res: any) => {
      this.qrCodes = res?.data
      console.log('codes: ', this.qrCodes);
    })
  }
}
