import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HerosListComponent } from './heros-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HttpNotificationInterceptor } from '../../common/http-notification-interceptor/http-notification-interceptor.interceptor';

const routes: Routes = [
  {
    path: '',
    component: HerosListComponent,
  },
];

@NgModule({
  declarations: [
    HerosListComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    TranslateModule.forChild(),
    RouterModule.forChild(routes),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpNotificationInterceptor,
      multi: true
    }
  ],
  schemas: [],
  exports: [RouterModule],
  bootstrap: [HerosListComponent]
})
export class HerosListModule { }
