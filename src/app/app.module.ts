import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { TeamcardComponent } from './teamcard/teamcard.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserItemComponent } from './user-item/user-item.component';
import { HeaderComponent } from './header/header.component';
import { TeamListComponent } from './team-list/team-list.component';
import { LoginComponent } from './login/login.component';
import {MatTabsModule} from '@angular/material/tabs'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { InterceptorService } from './interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationGuard } from './authentication.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TeamcardComponent,
    UserListComponent,
    UserItemComponent,
    HeaderComponent,
    TeamListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTabsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgSelectModule,


  ],
  providers: [AuthService,  AuthenticationGuard, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService, {
      provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
