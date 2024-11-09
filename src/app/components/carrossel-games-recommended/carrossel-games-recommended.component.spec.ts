import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrosselGamesRecommendedComponent } from './carrossel-games-recommended.component';

describe('CarrosselGamesRecommendedComponent', () => {
  let component: CarrosselGamesRecommendedComponent;
  let fixture: ComponentFixture<CarrosselGamesRecommendedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarrosselGamesRecommendedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrosselGamesRecommendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
