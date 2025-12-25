import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../../pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'history',
        loadChildren: () => import('../../pages/history/history.module').then(m => m.HistoryPageModule)
      },
      {
        path: 'sign-in',
        loadChildren: () => import('../../pages/sign-in/sign-in.module').then(m => m.SignInPageModule)
      },
      {
        path: 'generate-code',
        loadChildren: () => import('../../pages/generate-code/generate-code.module').then(m => m.GenerateCodePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
