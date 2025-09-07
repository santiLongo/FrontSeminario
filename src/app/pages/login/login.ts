import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class Login {
  onSubmit() : void {
    if (this.loginForm.valid) {
          this.authService.login(this.loginForm.value).subscribe({
            next: (response) => {
              // acá guardás token o redirigís al dashboard
              localStorage.setItem('token', response.token);
              localStorage.setItem('usuario', JSON.stringify(response.usuario));
              this.router.navigate(['/page']);
            },
            error: (err) => {
              console.error('Error en login', err);
              this.errorMessage = 'Credenciales inválidas';
            }
          });
        }
  }

  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
}