import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  userForm!: FormGroup;
  students: any[] = [];
  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getStudents();
  }

  createForm() {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  getStudents() {
    this.service.getUsers('students').subscribe((res: any) => {
      this.students = res;
    });
  }

  submit() {
    let index = this.students.findIndex(
      (item) => item.email == this.userForm.value.email
    );
    if (index !== -1) {
      this.toastr.error('هذا الإيميل موجود مسبقاً', '', {
        disableTimeOut: false,
        titleClass: 'toastr_title',
        messageClass: 'toastr_message',
        timeOut: 5000,
        closeButton: true,
      });
    } else {
      const model = {
        username: this.userForm.value.username,
        email: this.userForm.value.email,
        password: this.userForm.value.password,
      };

      this.service.createUser(model).subscribe((res) => {
        this.toastr.success('تم إنشاء الحساب بنجاح', '', {
          disableTimeOut: false,
          titleClass: 'toastr_title',
          messageClass: 'toastr_message',
          timeOut: 5000,
          closeButton: true,
        });
        this.router.navigate(['/login']);
      });
    }
  }
}
