import { Component, ElementRef, Injector, OnInit, Renderer2, ViewChild } from '@angular/core';
import { BasePage } from '../base-page';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Login } from 'src/app/models/register';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage extends BasePage implements OnInit {
  loginForm!: FormGroup | any;
  submitted: boolean = false;
  @ViewChild('passwordInput') passwordInput!: ElementRef;
  passwordFieldType: 'password' | 'text' = 'password';

  constructor(injector: Injector,
    private fb: FormBuilder,
    private apiService: ApiService,
    private renderer: Renderer2
  ) {
    super(injector);
  }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onForgotPassword() {
    this.router.navigate(['forgot-password']);
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    const inputElement = this.passwordInput.nativeElement;
    this.renderer.setAttribute(inputElement, 'type', this.passwordFieldType);
  }

  async login() {
    const loading = await this.loadingCtrl.create();
    loading.present();
    console.log('form value: ', this.loginForm?.value);

    this.submitted = true;
    if (this.loginForm.invalid) {
      this.showToast('geçersiz form', 'danger');
      loading.dismiss();
      return;
    } else {
      const loginFormData: Login = Object.assign({}, this.loginForm?.value);
      this.apiService.login(loginFormData).subscribe(async (res: any) => {
        loading.dismiss();
        if (res.success) {
          const alert = await this.alertCtrl.create({
            message: 'Giriş Başarılı!',
            backdropDismiss: false,
            buttons: [{
              text: 'Tamam',
              role: 'confirm',
              handler: async () => {
                localStorage.setItem('user', JSON.stringify(res?.data));
                this.router.navigate(['/tabs/home']);
                window.location.reload();
              }
            }]
          });
          alert.present();

        } else {
          this.showToast('Giriş başarısız!', 'danger');
        }


      }, (err: any) => {
        this.showToast('Giriş başarısız!', 'danger');
        loading.dismiss();
      })
    }
  }
}
