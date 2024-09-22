import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcluirJogosComponent } from './excluir-jogos.component';

describe('ExcluirJogosComponent', () => {
  let component: ExcluirJogosComponent;
  let fixture: ComponentFixture<ExcluirJogosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcluirJogosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcluirJogosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
