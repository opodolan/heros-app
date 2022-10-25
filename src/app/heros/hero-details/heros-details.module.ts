import { NgModule } from '@angular/core';
import { CustomDirectivesModule } from './../common/directives/custom-directives.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeroDetailsComponent } from './hero-details.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HttpNotificationInterceptor } from '../common/http-notification-interceptor/http-notification-interceptor.interceptor';

const routes: Routes = [
  {
    path: '',
    component: HeroDetailsComponent,
  },
];

@NgModule({
  declarations: [
    HeroDetailsComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CustomDirectivesModule,
    TranslateModule.forChild(),
    RouterModule.forChild(routes),
    CommonModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpNotificationInterceptor,
      multi: true
    }
  ],
  bootstrap: [HeroDetailsComponent]
})
export class HeroDetailsModule { }
