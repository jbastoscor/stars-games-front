import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  is_logged = false;
  is_adm = false;
  user_storage_username = '';
  user_full_name = '';
  user_username = '';
  user_password = '';
  user_birthday = '';
  user_country = '';
  user_state = '';
  user_legacy_password = '';
  user_new_password_1 = '';
  user_new_password_2 = '';
  modal_message = '';
  is_message_modal_open = false;
  is_update_data = false;
  is_update_password = false;
  is_legacy_password_visible = false;
  is_new_password_1_visible = false;
  is_new_password_2_visible = false;
  is_loader_open = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.handleLogin();
  }

  handleLogin(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.username) {
      this.is_logged = true;
      this.user_storage_username = user.username;
      this.consultUser(user.username);
      return true;
    } else {
      window.location.href = `${window.location.origin}/login`;
      return false;
    }
  }

  consultUser(username: string): void {
    const host = window.location.hostname;
    const fetchURL = host === 'localhost'
      ? 'http://localhost:8080/user/consult'
      : 'http://stars-games-back-dev.sa-east-1.elasticbeanstalk.com/user/consult';

    const body = { user_username: username };

    this.http.post(fetchURL, body).subscribe((response: any) => {
      if (response && response.length === 1) {
        const data = response[0];
        this.is_loader_open = false;
        this.user_full_name = data.user_full_name;
        this.user_username = data.user_username;
        this.user_password = data.user_password;
        this.user_birthday = data.user_birthday;
        this.user_country = data.user_country;
        this.user_state = data.user_state;

        if (data.is_adm) {
          this.is_adm = true;
        }
      } else {
        this.is_loader_open = false;
        this.modal_message = 'Erro inesperado, por favor recarregue a página!';
        this.is_message_modal_open = true;
      }
    }, () => {
      this.is_loader_open = false;
      this.modal_message = 'Erro inesperado, por favor recarregue a página!';
      this.is_message_modal_open = true;
    });
  }

  saveUserDate(): void {
    const host = window.location.hostname;
    const fetchURL = host === 'localhost'
      ? 'http://localhost:8080/user/valid/update/data'
      : 'http://stars-games-back-dev.sa-east-1.elasticbeanstalk.com/user/valid/update/data';

    const body = {
      user_full_name: this.user_full_name,
      user_username: this.user_username,
      user_password: this.user_password,
      user_birthday: this.user_birthday,
      user_country: this.user_country,
      user_state: this.user_state,
    };

    this.http.post(fetchURL, body).subscribe((response: any) => {
      if (response && response.update_success) {
        this.is_loader_open = false;
        this.modal_message = response.update_message;
        this.is_message_modal_open = true;
        this.cancelUpdateData();
      } else {
        this.is_loader_open = false;
        this.modal_message = response.update_message;
        this.is_message_modal_open = true;
      }
    }, () => {
      this.is_loader_open = false;
      this.modal_message = 'Erro inesperado, tente novamente!';
      this.is_message_modal_open = true;
    });
  }

  validateInputsUserData(): void {
    if (this.user_full_name && this.user_username && this.user_birthday && this.user_country && this.user_state) {
      if (this.user_birthday.length !== 10) {
        this.modal_message = 'Complete sua data de nascimento!';
        this.is_message_modal_open = true;
      } else if (this.user_state.length !== 2) {
        this.modal_message = 'Estado inválido!';
        this.is_message_modal_open = true;
      } else {
        this.is_loader_open = true;
        this.saveUserDate();
      }
    } else {
      this.modal_message = 'Complete todos os campos!';
      this.is_message_modal_open = true;
    }
  }

  saveUserPassword(): void {
    const host = window.location.hostname;
    const fetchURL = host === 'localhost'
      ? 'http://localhost:8080/user/valid/update/password'
      : 'http://stars-games-back-dev.sa-east-1.elasticbeanstalk.com/user/valid/update/password';

    const body = {
      user_username: this.user_username,
      user_password: this.user_new_password_1,
    };

    this.http.post(fetchURL, body).subscribe((response: any) => {
      if (response && response.update_success) {
        this.is_loader_open = false;
        this.modal_message = response.update_message;
        this.is_message_modal_open = true;
        this.cancelUpdatePassword();
      } else {
        this.is_loader_open = false;
        this.modal_message = response.update_message;
        this.is_message_modal_open = true;
      }
    }, () => {
      this.is_loader_open = false;
      this.modal_message = 'Erro inesperado, tente novamente!';
      this.is_message_modal_open = true;
    });
  }

  validateInputsUserPassword(): void {
    if (this.user_legacy_password && this.user_new_password_1 && this.user_new_password_2) {
      if (this.user_legacy_password !== this.user_password) {
        this.modal_message = 'Senha atual incorreta!';
        this.is_message_modal_open = true;
      } else if (this.user_new_password_1.length < 8) {
        this.modal_message = 'A nova senha deve ser maior que 8 caracteres!';
        this.is_message_modal_open = true;
      } else if (this.user_new_password_1 !== this.user_new_password_2) {
        this.modal_message = 'Os campos de senha nova não coincidem!';
        this.is_message_modal_open = true;
      } else {
        this.saveUserPassword();
      }
    } else {
      this.modal_message = 'Complete todos os campos!';
      this.is_message_modal_open = true;
    }
  }

  updateUserData(): void {
    this.is_update_data = true;
    (document.getElementById('fullName') as HTMLInputElement).disabled = false;
    (document.getElementById('birthday') as HTMLInputElement).disabled = false;
    (document.getElementById('country') as HTMLInputElement).disabled = false;
    (document.getElementById('state') as HTMLInputElement).disabled = false;
  }

  cancelUpdateData(): void {
    this.is_loader_open = true;
    this.is_update_data = false;
    (document.getElementById('fullName') as HTMLInputElement).disabled = true;
    (document.getElementById('birthday') as HTMLInputElement).disabled = true;
    (document.getElementById('country') as HTMLInputElement).disabled = true;
    (document.getElementById('state') as HTMLInputElement).disabled = true;
    this.consultUser(this.user_storage_username);
  }

  updateUserPassword(): void {
    this.is_update_password = true;
  }

  cancelUpdatePassword(): void {
    this.is_update_password = false;
    this.user_legacy_password = '';
    this.user_new_password_1 = '';
    this.user_new_password_2 = '';
  }

  triggerLegacyPasswordVisibility(): void {
    this.is_legacy_password_visible = !this.is_legacy_password_visible;
    (document.getElementById('userLegacyPassword') as HTMLInputElement).type = this.is_legacy_password_visible ? 'text' : 'password';
  }

  triggerNew1PasswordVisibility(): void {
    this.is_new_password_1_visible = !this.is_new_password_1_visible;
    (document.getElementById('userFirstPassword') as HTMLInputElement).type = this.is_new_password_1_visible ? 'text' : 'password';
  }

  triggerNew2PasswordVisibility(): void {
    this.is_new_password_2_visible = !this.is_new_password_2_visible;
    (document.getElementById('userSecondPassword') as HTMLInputElement).type = this.is_new_password_2_visible ? 'text' : 'password';
  }

  navigateToAdm(): void {
    window.location.href = `${window.location.origin}/adm`;
  }

  formatBirthday(event: any) {
    this.user_birthday = event.target.value.replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d)/, "$1");
  }
}