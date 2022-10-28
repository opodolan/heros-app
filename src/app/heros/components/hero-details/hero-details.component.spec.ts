import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HerosService } from '../services/heros.service';
import { HeroDetailsComponent } from './hero-details.component';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';


describe('HeroDetailsComponent', () => {
  let component: HeroDetailsComponent;
  let fixture: ComponentFixture<HeroDetailsComponent>;
  let herosService: HerosService;
  const formDataMock = {
    title: "Test",
    description: "",
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroDetailsComponent ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule,
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
        {
          provide: ActivatedRoute,
          useValue: {snapshot: {params: {'id': '1'}}}
        }]
    })
    .compileComponents();

    herosService = TestBed.inject(HerosService);
    fixture = TestBed.createComponent(HeroDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created ngOnInit', () => {
    const spy = spyOn<any>(component, 'ngOnInit').and.callThrough();
    (component as any).ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should be created getHero', () => {
    const spy = spyOn<any>(component, 'getHero').and.callThrough();
    const service: HerosService = TestBed.inject(HerosService);
    spyOn<any>(service, 'get').and.returnValue(of(formDataMock));
    (component as any).getHero();
    expect(spy).toHaveBeenCalled();
  });

  it('should be created saveHero (form valid = true)', () => {
    component.addForm.controls['title'].setValue("Test");
    component.addForm.controls['description'].setValue("Test");

    const spy = spyOn<any>(component, 'saveHero').and.callThrough();
    (component as any).saveHero();
    expect(spy).toHaveBeenCalled();
  });

  it('should be created saveHero (form valid = false)', () => {
    component.addForm.setErrors({invalid: true});

    const spy = spyOn<any>(component, 'saveHero').and.callThrough();
    (component as any).saveHero();
    expect(spy).toHaveBeenCalled();
  });

  it('should be created updateHero (form valid = true)', () => {
    component.addForm.controls['title'].setValue("Test");
    component.addForm.controls['description'].setValue("Test");

    const spy = spyOn<any>(component, 'updateHero').and.callThrough();
    (component as any).updateHero();
    expect(spy).toHaveBeenCalled();
  });

  it('should be created updateHero (form valid = false)', () => {
    component.addForm.setErrors({invalid: true});

    const spy = spyOn<any>(component, 'updateHero').and.callThrough();
    (component as any).updateHero();
    expect(spy).toHaveBeenCalled();
  });
});
