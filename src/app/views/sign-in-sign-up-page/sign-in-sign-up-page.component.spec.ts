import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInSignUpPageComponent } from './sign-in-sign-up-page.component';

describe('SignInSignUpPageComponent', () => {
  let component: SignInSignUpPageComponent;
  let fixture: ComponentFixture<SignInSignUpPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInSignUpPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignInSignUpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
