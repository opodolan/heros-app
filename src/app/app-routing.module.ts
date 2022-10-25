import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'heros',
    loadChildren: () => import('./heros/heros-list/heros-list.module').then(m => m.HerosListModule)
  },
  {
    path: 'heros/:id',
    loadChildren: () => import('./heros/hero-details/heros-details.module').then(m => m.HeroDetailsModule)
  },
  {
    path: 'add',
    loadChildren: () => import('./heros/hero-details/heros-details.module').then(m => m.HeroDetailsModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
