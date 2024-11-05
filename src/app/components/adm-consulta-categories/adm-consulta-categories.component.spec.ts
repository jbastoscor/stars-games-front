import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmConsultaCategoriesComponent } from './adm-consulta-categories.component';

describe('AdmConsultaCategoriesComponent', () => {
  let component: AdmConsultaCategoriesComponent;
  let fixture: ComponentFixture<AdmConsultaCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmConsultaCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmConsultaCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
