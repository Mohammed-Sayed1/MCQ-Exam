import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.scss'],
})
export class NewExamComponent implements OnInit {
  name = new FormControl('');
  questionForm!: FormGroup;
  questions: any[] = [];
  correctNum: any;
  subjectName: string | null = '';
  stepperIndex = 0;
  startAdd: boolean = false;
  preview: boolean = false;
  id: any;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private service: DoctorService
  ) {}
  ngOnInit(): void {
    this.createForm();
  }

  start() {
    if (this.name.value == '') {
      this.toastr.error('يرجي إدخال إسم المادة');
    } else {
      this.startAdd = true;
      this.subjectName = this.name.value;
      this.stepperIndex = 1;
    }
  }

  createForm() {
    this.questionForm = this.fb.group({
      question: ['', [Validators.required]],
      answer1: ['', [Validators.required]],
      answer2: ['', [Validators.required]],
      answer3: ['', [Validators.required]],
      answer4: ['', [Validators.required]],
    });
  }

  createQuestion() {
    if (this.correctNum) {
      const model = {
        question: this.questionForm.value.question,
        answer1: this.questionForm.value.answer1,
        answer2: this.questionForm.value.answer2,
        answer3: this.questionForm.value.answer3,
        answer4: this.questionForm.value.answer4,
        correctAnswer: this.questionForm.value[this.correctNum],
      };

      this.questions.push(model);
      this.questionForm.reset();
    } else {
      this.toastr.error('!يرجي إختيار الإجابة الصحيحة');
    }
  }

  cancel() {
    this.questionForm.reset();
    this.questions = [];
    this.subjectName = '';
    this.name.reset();
    this.stepperIndex = 0;
    this.startAdd = false;
  }

  clearForm() {
    this.questionForm.reset();
  }

  getCorrect(event: any) {
    this.correctNum = event.value;
  }

  submit() {
    const model = {
      name: this.subjectName,
      questions: this.questions,
    };

    if (this.preview) {
      this.stepperIndex = 2;
    } else {
      this.service.createSubject(model).subscribe((res: any) => {
        this.preview = true;
        this.id = res.id;
      });
    }
  }

  deleteQ(index: number) {
    this.questions.splice(index, 1);
    const model = {
      name: this.subjectName,
      questions: this.questions,
    };
    this.service.updateSubject(model, this.id).subscribe((res) => {
      this.toastr.success('تم حذف السؤال بنجاح');
    });
  }
}
