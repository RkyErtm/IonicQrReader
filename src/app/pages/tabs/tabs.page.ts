
import { Component, OnInit, Injector } from '@angular/core';
import { BasePage } from '../base-page';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage extends BasePage implements OnInit {
  user?: User;
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    const user = localStorage.getItem('user');
    this.user = user ? JSON.parse(user) : null;
  }

  navToLogin() {

  }
}
