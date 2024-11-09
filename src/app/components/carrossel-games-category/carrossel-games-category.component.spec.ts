import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrosselGamesCategoryComponent } from './carrossel-games-category.component';

describe('CarrosselGamesCategoryComponent', () => {
  let component: CarrosselGamesCategoryComponent;
  let fixture: ComponentFixture<CarrosselGamesCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarrosselGamesCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrosselGamesCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
