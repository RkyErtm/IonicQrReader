import { Component, Injector, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BasePage } from '../base-page';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-generate-code',
  templateUrl: './generate-code.page.html',
  styleUrls: ['./generate-code.page.scss'],
})
export class GenerateCodePage extends BasePage implements OnInit {

  inputValue?: any;
  user: any;
  constructor(injector: Injector,
    private apiService: ApiService
  ) {
    super(injector);
  }

  ngOnInit() {
    const user = localStorage.getItem('user');
    this.user = user ? JSON.parse(user) : null;
  }

  async generateCode() {
    const load = await this.loadingCtrl.create({});
    await load.present();
    this.apiService.generateQr(this.inputValue, this.user?.id).subscribe(async (res: any) => {
      if (res) {
        await load.dismiss();
        window.open(res?.url);
        window.location.reload();
      }
    });
  }
}
