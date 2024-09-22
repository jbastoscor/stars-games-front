import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaAtualizaJogosComponent } from './consulta-atualiza-jogos.component';

describe('ConsultaAtualizaJogosComponent', () => {
  let component: ConsultaAtualizaJogosComponent;
  let fixture: ComponentFixture<ConsultaAtualizaJogosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaAtualizaJogosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaAtualizaJogosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
