import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  activeTab: number =0;
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  clickTab(id: number){
    this.activeTab=id;
  }

  logout(){
    this.authService.logOut();
  }

}
