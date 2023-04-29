import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DoctorService } from 'src/app/doctor/services/doctor.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss'],
})
export class ExamComponent implements OnInit {
  id: any;
  subject: any;
  user: any;
  constructor(
    private route: ActivatedRoute,
    private service: DoctorService,
    private auth: AuthService,
    private toastr: ToastrService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getSubject();
    this.getUserInfo();
  }
  ngOnInit(): void {}

  getSubject() {
    this.service.getSubject(this.id).subscribe((res) => {
      this.subject = res;
    });
  }

  getUserInfo() {
    this.auth.getRole().subscribe((res) => {
      this.user = res;
    });
  }

  deleteQ(index: number) {
    this.subject.questions.splice(index, 1);
    const model = {
      name: this.subject.name,
      questions: this.subject.questions,
    };

    this.service.updateSubject(model, this.id).subscribe((res) => {
      this.toastr.success('تم حذف السؤال بنجاح');
    });
  }
}
