import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmCadastroCategoriesComponent } from './adm-cadastro-categories.component';

describe('AdmCadastroCategoriesComponent', () => {
  let component: AdmCadastroCategoriesComponent;
  let fixture: ComponentFixture<AdmCadastroCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmCadastroCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmCadastroCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
