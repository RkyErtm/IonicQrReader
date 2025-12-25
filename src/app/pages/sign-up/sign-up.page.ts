import { Component, ElementRef, Injector, OnInit, Renderer2, ViewChild } from '@angular/core';
import { BasePage } from '../base-page';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaskitoOptions, MaskitoElementPredicate } from '@maskito/core';
import { Register } from 'src/app/models/register';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage extends BasePage implements OnInit {
  registerForm!: FormGroup | any;
  submitted: boolean = false;
  @ViewChild('passwordInput') passwordInput!: ElementRef;
  passwordFieldType: 'password' | 'text' = 'password';
  genders: any = [
    { id: 1, name: 'Kız' },
    { id: 2, name: 'Erkek' },
    { id: 3, name: 'Belirtmek istemiyorum' },
  ]

  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private api: ApiService,
    private renderer: Renderer2
  ) {
    super(injector);
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      genderId: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(14)]],
    })
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    const inputElement = this.passwordInput.nativeElement;
    this.renderer.setAttribute(inputElement, 'type', this.passwordFieldType);
  }
  async submitForm() {
    const loading = await this.loadingCtrl.create();
    loading.present();
    console.log('form value: ', this.registerForm?.value);

    this.submitted = true;
    if (this.registerForm.invalid) {
      this.showToast('geçersiz form', 'danger');
      loading.dismiss();
      return;
    }
    const regformData: Register = Object.assign({}, this.registerForm?.value);
    this.api.register(regformData).subscribe((res: any) => {
      loading.dismiss();
      console.log(res);
      localStorage.setItem('user', JSON.stringify(res?.data));

      this.router.navigate(['/tabs/home']);
      this.showToast('Kayıt başarılı!', 'success');

    }, (err: any) => {
      this.showToast('Kayıt başarısız!', 'danger');
      loading.dismiss();

    })
  }

  goBack() {
    this.navCtrl.back();
  }

  //ion-input phone mask:
  readonly phoneMask: MaskitoOptions = {
    mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/],
  };

  readonly maskPredicate: MaskitoElementPredicate = async (el: any) => (el as HTMLIonInputElement).getInputElement();


}
