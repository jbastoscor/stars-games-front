import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmDeleteGamesComponent } from './adm-delete-games.component';

describe('AdmDeleteGamesComponent', () => {
  let component: AdmDeleteGamesComponent;
  let fixture: ComponentFixture<AdmDeleteGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmDeleteGamesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmDeleteGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
