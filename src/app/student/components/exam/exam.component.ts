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
  total: number = 0;
  showResult: boolean = false;
  studentInfo: any;
  userSubjects: any[] = [];
  validExam: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private service: DoctorService,
    private auth: AuthService,
    private toastr: ToastrService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getSubject();
    this.getLogedinUser();
  }
  ngOnInit(): void {}

  getSubject() {
    this.service.getSubject(this.id).subscribe((res) => {
      this.subject = res;
    });
  }

  getLogedinUser() {
    this.auth.getRole().subscribe((res) => {
      this.user = res;
      this.getUserData();
    });
  }

  getUserData() {
    this.auth.getStudent(this.user.userId).subscribe((res: any) => {
      this.studentInfo = res;
      this.userSubjects = res?.subjects ? res?.subjects : [];
      this.checkValidExam();
    });
  }

  getAnswer(event: any) {
    let value = event.value;
    let questionIndex = event.source.name;
    this.subject.questions[questionIndex].studentAnswer = value;
  }

  checkValidExam() {
    for (let x in this.userSubjects) {
      if (this.userSubjects[x].id == this.id) {
        this.total = this.userSubjects[x].degree;
        this.validExam = false;
        this.toastr.warning('لقد أنهيت هذا الإختبار مسبقاً');
      }
    }
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

  getResult() {
    this.total = 0;
    for (let x in this.subject.questions) {
      if (
        this.subject.questions[x].studentAnswer ==
        this.subject.questions[x].correctAnswer
      ) {
        this.total++;
      }
    }
    this.showResult = true;

    this.userSubjects.push({
      name: this.subject.name,
      id: this.id,
      degree: this.total,
    });
    const model = {
      username: this.studentInfo.username,
      email: this.studentInfo.email,
      password: this.studentInfo.password,
      subjects: this.userSubjects,
    };
    this.auth.updateStudent(this.user.userId, model).subscribe((res) => {
      this.toastr.success('تم تسجيل النتيجة بنجاح');
    });
  }
}
