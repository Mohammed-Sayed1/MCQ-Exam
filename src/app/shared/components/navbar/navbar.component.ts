import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user: any = null;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.user.subscribe((res: any) => {
      if (res.role) {
        this.user = res;
      }
    });
  }

  logout() {
    const model = {};
    this.authService.login(model).subscribe((res) => {
      this.authService.user.next(res);
    });
    this.user = null;
  }
}
