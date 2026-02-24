import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginHttpServie } from '../services/login-http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule]
})
export class LoginComponent implements OnInit {
  public form!: UntypedFormGroup;
  public errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: LoginHttpServie,
    private router: Router
  ) {}
  //
   ngOnInit(): void {
    this.form = this.fb.group({
      usuario: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }
  //
  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.errorMessage = 'Credenciales inválidas: ' + err;
        },
      });
    }
  }
}
