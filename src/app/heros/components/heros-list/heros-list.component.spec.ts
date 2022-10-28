import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HerosListComponent } from './heros-list.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HerosService } from '../services/heros.service';
import { Hero } from '../models/hero.model';
import { of } from 'rxjs';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';

describe('HerosListComponent', () => {
  let component: HerosListComponent;
  let herosService: HerosService;
  let fixture: ComponentFixture<HerosListComponent>;
  const heroMock: Hero = {
    title: "Mock",
    description: ""
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HerosListComponent ],
      imports: [
        RouterTestingModule,
        MatDialogModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
      ],
      providers: [
        HerosService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();

    herosService = TestBed.inject(HerosService);
    fixture = TestBed.createComponent(HerosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created retrieveHeros', () => {
    const spy = spyOn<any>(component, 'retrieveHeros').and.callThrough();
    const service: HerosService = TestBed.inject(HerosService);
    spyOn<any>(service, 'getAll').and.returnValue(of(heroMock));
    (component as any).retrieveHeros();
    expect(spy).toHaveBeenCalled();
  });

  it('should be created searchTitle', () => {
    component.title = "Mock";
    const spy = spyOn<any>(component, 'searchTitle').and.callThrough();
    const service: HerosService = TestBed.inject(HerosService);
    spyOn<any>(service, 'findByTitle').and.returnValue(of(heroMock));
    (component as any).searchTitle();
    expect(spy).toHaveBeenCalled();
  });

  it('should be created deleteHero (true)', () => {
    const spy = spyOn<any>(component, 'deleteHero').and.callThrough();
    const service: HerosService = TestBed.inject(HerosService);
    spyOn(component.dialog, 'open')
      .and
      .returnValue({
          afterClosed: () => of(true)
      } as MatDialogRef<typeof component>);
    spyOn<any>(service, 'delete').and.returnValue(of(heroMock));
    (component as any).deleteHero();
    expect(spy).toHaveBeenCalled();
  });

  it('should be created deleteHero (false)', () => {
    const spy = spyOn<any>(component, 'deleteHero').and.callThrough();
    spyOn(component.dialog, 'open')
      .and
      .returnValue({
          afterClosed: () => of(false)
      } as MatDialogRef<typeof component>);
    (component as any).deleteHero();
    expect(spy).toHaveBeenCalled();
  });

  it('should be created refreshList', () => {
    const spy = spyOn<any>(component, 'refreshList').and.callThrough();
    (component as any).refreshList();
    expect(spy).toHaveBeenCalled();
  });
});
