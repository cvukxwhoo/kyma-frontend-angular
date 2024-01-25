import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookiesService } from 'src/app/services/cookies.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createFormChangePassword();
  }

  createFormChangePassword() {
    this.changePasswordForm = this.fb.group({
      // USER
      curentPassword: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[!@#$%^&*]+)[a-z0-9!@#$%^&*]{6,32}$/),
        ]),
      ],
      newPassword: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[!@#$%^&*]+)[a-z0-9!@#$%^&*]{6,32}$/),
        ]),
      ],
      confirmPassword: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[!@#$%^&*]+)[a-z0-9!@#$%^&*]{6,32}$/),
        ]),
      ],
    });
  }

  // --------- INFOR BUYER ----------- //
  get currentPasswordFormControl() {
    return this.changePasswordForm.get('curentPassword');
  }

  get newPasswordFormControl() {
    return this.changePasswordForm.get('newPassword');
  }

  get confirmPasswordFormControl() {
    return this.changePasswordForm.get('confirmPassword');
  }

  onSubmit() {
    if (this.changePasswordForm.valid) {
      // Perform actions when the form is submitted
      console.log(this.changePasswordForm.value);
    }
  }
}
