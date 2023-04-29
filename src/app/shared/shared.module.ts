import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatrialModule } from './matrial.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    MatrialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  exports: [
    MatrialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    NavbarComponent,
    BrowserModule,
    HttpClientModule,
  ],
})
export class SharedModule {}
