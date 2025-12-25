import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style, Animation } from '@capacitor/status-bar';
import { ScreenOrientation } from '@capacitor/screen-orientation'
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { BasePage } from './pages/base-page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent extends BasePage implements OnInit {
  @ViewChild(IonRouterOutlet, { static: true }) routerOutlet?: IonRouterOutlet;
  user: any;

  constructor(injector: Injector, private platform: Platform) {
    super(injector);
    if (Capacitor.isNativePlatform()) {
      StatusBar.setOverlaysWebView({ overlay: true });
      StatusBar.setStyle({ style: Style.Light });
      StatusBar.getInfo();
      StatusBar.setBackgroundColor({ color: '#ffffff' });
      StatusBar.show({ animation: Animation.None });
      StatusBar.hide({ animation: Animation.Fade });

    }
  }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    this.user = user ? JSON.parse(user) : null;
    if (this.user) {
      this.router.navigate(['tabs/home']);
    }
  }

  async initializeApp() {
    this.platform.ready().then(async () => {
      // await this.firebaseAuthenticationService.initialize();
      if (Capacitor.isNativePlatform()) {
        StatusBar.setOverlaysWebView({ overlay: true });
        StatusBar.setStyle({ style: Style.Light });
        await ScreenOrientation.lock({ orientation: 'portrait' });
      }
      this.platform.backButton.subscribeWithPriority(666666, () => {
        if (this.routerOutlet && this.routerOutlet.canGoBack()) {
          this.routerOutlet.pop();
        } else {
          App.exitApp();
        }
      });
    });
  }
}