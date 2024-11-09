import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryGamesComponent } from './category-games.component';

describe('CategoryGamesComponent', () => {
  let component: CategoryGamesComponent;
  let fixture: ComponentFixture<CategoryGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryGamesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
