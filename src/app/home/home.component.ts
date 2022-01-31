import { Component, OnInit } from '@angular/core';
import { Team } from '../team';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  firstname = localStorage.getItem('username');
   

  constructor() {

   }

  ngOnInit(): void {
  
  }

}
