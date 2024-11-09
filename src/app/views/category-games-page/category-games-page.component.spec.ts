import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryGamesPageComponent } from './category-games-page.component';

describe('CategoryGamesPageComponent', () => {
  let component: CategoryGamesPageComponent;
  let fixture: ComponentFixture<CategoryGamesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryGamesPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryGamesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
