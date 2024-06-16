import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loggedUser: any;
  loginForm: FormGroup;
  hidePassword = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(x => {
      this.loggedUser = x;
      if (!this.loggedUser || Object.keys(this.loggedUser).length === 0) {
        this.initializeForm();
      } else {
        this.router.navigate(['dashboard']);
      }
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        (response) => {
            this.router.navigate(['dashboard']);
            this.sendSuccess();
        },
        (error: HttpErrorResponse) => {
          if (error.error === "Inicio de sesión fallido.") {
            this.sendFailedLogin();
          } else {
            this.sendError();
          }
        }
      );
  }
  
  sendSuccess(): void {
    Swal.fire('Ingresaste', 'Ingreso correctamente', 'success');
  }
  
  sendFailedLogin(): void {
    Swal.fire('Inicio de sesión fallido', 'Por favor verifica tus credenciales e intenta de nuevo', 'error');
  }
  
  sendError(): void {
    Swal.fire('Error', 'Vuelve a intentar, algo salió mal', 'error');
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      this.sendRequired();
    }else{
      this.login();
    }
  }

  sendRequired() {
    Swal.fire('Error', 'Ingresar datos válidos. Revisar los campos', 'error');
  }

  goToRegister() {
    this.router.navigate(['register']);
  }
}
