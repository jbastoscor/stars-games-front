import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliacaoGameComponent } from './avaliacao-game.component';

describe('AvaliacaoGameComponent', () => {
  let component: AvaliacaoGameComponent;
  let fixture: ComponentFixture<AvaliacaoGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvaliacaoGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvaliacaoGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
