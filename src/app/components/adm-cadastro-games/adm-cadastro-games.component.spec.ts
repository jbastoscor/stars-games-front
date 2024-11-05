import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmCadastroGamesComponent } from './adm-cadastro-games.component';

describe('AdmCadastroGamesComponent', () => {
  let component: AdmCadastroGamesComponent;
  let fixture: ComponentFixture<AdmCadastroGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmCadastroGamesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmCadastroGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
