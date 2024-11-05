import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmConsultaUpdateGamesComponent } from './adm-consulta-update-games.component';

describe('AdmConsultaUpdateGamesComponent', () => {
  let component: AdmConsultaUpdateGamesComponent;
  let fixture: ComponentFixture<AdmConsultaUpdateGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmConsultaUpdateGamesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmConsultaUpdateGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
