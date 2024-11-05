import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmDeleteCategoriesComponent } from './adm-delete-categories.component';

describe('AdmDeleteCategoriesComponent', () => {
  let component: AdmDeleteCategoriesComponent;
  let fixture: ComponentFixture<AdmDeleteCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmDeleteCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmDeleteCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
