import { Component, OnInit, OnDestroy } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-sign-in-sign-up',
  templateUrl: './sign-in-sign-up.component.html',
  styleUrls: ['./sign-in-sign-up.component.scss']
})
export class SignInSignUpComponent implements OnInit, OnDestroy {
  windowWidth: number = 0;
  storageUsername: string = "";
  storageFullName: string = "";
  signinUsername: string = "";
  signinPassword: string = "";
  signupFullName: string = "";
  signupUsername: string = "";
  signupPassword1: string = "";
  signupPassword2: string = "";
  signupBirthday: string = "";
  signupCountry: string = "";
  signupState: string = "";
  isPasswordVisible: boolean = false;
  isPassword1Visible: boolean = false;
  isPassword2Visible: boolean = false;
  isSignInOpen: boolean = false;
  isSignUpOpen: boolean = false;
  isModalSearchOpen: boolean = false;
  modalMessage: string = "";
  isMessageModalOpen: boolean = false;
  isLoaderOpen: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions.bind(this));
    window.addEventListener('keydown', this.enterFunction.bind(this), false);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.updateWindowDimensions.bind(this));
    window.removeEventListener('keydown', this.enterFunction.bind(this), false);
  }

  @HostListener('window:resize', ['$event'])
  updateWindowDimensions(): void {
    this.windowWidth = window.innerWidth;
  }

  enterFunction(event: KeyboardEvent): void {
    if (event.key === "Enter" && (document.activeElement as HTMLElement).id === 'password') {
      this.validateSignInInputs();
    }
  }

  openSignInForm(): void {
    this.isSignInOpen = true;
    this.isSignUpOpen = false;
  }

  openSignUpForm(): void {
    this.isSignUpOpen = true;
    this.isSignInOpen = false;
  }

  validateSignInInputs(): void {
    if (this.signinUsername && this.signinPassword) {
      this.isLoaderOpen = true;
      this.handleSignIn();
    } else {
      this.modalMessage = "Complete todos os campos!";
      this.isMessageModalOpen = true;
    }
  }

  handleSignIn(): void {
    const host = window.location.hostname;
    const fetchURL = host === 'localhost' ? "http://localhost:8080/user/signin" : "http://stars-games-back-dev.sa-east-1.elasticbeanstalk.com/user/signin";

    const body = {
      user_username: this.signinUsername,
      user_password: this.signinPassword
    };

    fetch(fetchURL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(response => {
      if (response.status === 200 && response.statusText === "OK") {
        response.json().then(data => {
          if (data.login_authorized) {
            this.isLoaderOpen = false;
            this.modalMessage = "Login feito com sucesso!";
            this.isMessageModalOpen = true;
            this.storageUsername = data.login_username;
            this.storageFullName = data.login_fullName;
            this.setUserStorage();
            this.resetSignInForm();
            setTimeout(() => {
              this.navigationToHome();
            }, 500);
          } else {
            this.isLoaderOpen = false;
            this.modalMessage = data.login_error;
            this.isMessageModalOpen = true;
          }
        });
      } else {
        this.isLoaderOpen = false;
        this.modalMessage = "Erro inesperado, tente novamente!";
        this.isMessageModalOpen = true;
      }
    });
  }

  validateSignUpInputs(): void {
    if (this.signupFullName && this.signupUsername && this.signupPassword1 && this.signupPassword2 && this.signupBirthday && this.signupCountry && this.signupState) {
      if (this.signupUsername.length < 5) {
        this.modalMessage = "Username deve ser maior que 5 caracteres!";
        this.isMessageModalOpen = true;
      } else if (this.signupPassword1.length < 8) {
        this.modalMessage = "Senha deve ser maior que 8 caracteres!";
        this.isMessageModalOpen = true;
      } else if (this.signupPassword1 !== this.signupPassword2) {
        this.modalMessage = "Os campos de senha não coincidem!";
        this.isMessageModalOpen = true;
      } else if (this.signupBirthday.length !== 10) {
        this.modalMessage = "Complete sua data de nascimento!";
        this.isMessageModalOpen = true;
      } else if (this.signupState.length !== 2) {
        this.modalMessage = "Estado inválido!";
        this.isMessageModalOpen = true;
      } else {
        this.isLoaderOpen = true;
        this.handleSignUp();
      }
    } else {
      this.modalMessage = "Complete todos os campos!";
      this.isMessageModalOpen = true;
    }
  }

  handleSignUp(): void {
    const host = window.location.hostname;
    const fetchURL = host === 'localhost' ? "http://localhost:8080/user/signup" : "http://stars-games-back-dev.sa-east-1.elasticbeanstalk.com/user/signup";

    const body = {
      user_full_name: this.signupFullName,
      user_username: this.signupUsername,
      user_password: this.signupPassword1,
      user_birthday: this.signupBirthday,
      user_country: this.signupCountry,
      user_state: this.signupState
    };

    fetch(fetchURL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(response => {
      if (response.status === 200 && response.statusText === "OK") {
        response.json().then(data => {
          if (data.signup_success) {
            this.isLoaderOpen = false;
            this.modalMessage = data.signup_message;
            this.isMessageModalOpen = true;
            this.storageUsername = this.signupUsername;
            this.storageFullName = this.signupFullName;
            this.setUserStorage();
            this.resetSignUpForm();
            setTimeout(() => {
              this.navigationToHome();
            }, 1000);
          } else {
            this.isLoaderOpen = false;
            this.modalMessage = data.signup_error;
            this.isMessageModalOpen = true;
          }
        });
      } else {
        this.isLoaderOpen = false;
        this.modalMessage = "Erro inesperado, tente novamente!";
        this.isMessageModalOpen = true;
      }
    });
  }

  resetSignInForm(): void {
    this.signinUsername = "";
    this.signinPassword = "";
  }

  resetSignUpForm(): void {
    this.signupFullName = "";
    this.signupUsername = "";
    this.signupPassword1 = "";
    this.signupPassword2 = "";
    this.signupBirthday = "";
    this.signupCountry = "";
    this.signupState = "";
  }

  handleSignInPasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
    const passwordField = document.getElementById('password') as HTMLInputElement;
    passwordField.type = this.isPasswordVisible ? 'text' : 'password';
  }

  handleSignUpFirstPasswordVisibility(): void {
    this.isPassword1Visible = !this.isPassword1Visible;
    const passwordField = document.getElementById('signUpFirstPassword') as HTMLInputElement;
    passwordField.type = this.isPassword1Visible ? 'text' : 'password';
  }

  handleSignUpSecondPasswordVisibility(): void {
    this.isPassword2Visible = !this.isPassword2Visible;
    const passwordField = document.getElementById('signUpSecondPassword') as HTMLInputElement;
    passwordField.type = this.isPassword2Visible ? 'text' : 'password';
  }

  setUserStorage(): void {
    localStorage.setItem('user', JSON.stringify({
      username: this.storageUsername,
      full_name: this.storageFullName
    }));
  }

  navigationToHome(): void {
    window.location.href = `${window.location.origin}/`;
  }

  formatBirthday(event: any) {
    this.signupBirthday = event.target.value.replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d)/, "$1");
  }
}