import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router'
import { PostCreateComponent } from '../posts/post-create/post-create.component';
import { PostListComponent } from '../posts/post-list/post-list.component';
import { LoginComponent } from '../auth/login/login/login.component';
import { SignupComponent } from '../auth/signup/signup/signup.component';
import { AuthGuard } from '../auth/auth.guard';


const routes: Routes =[
  {path:'' , component:PostListComponent} ,
   { path:'create',component:PostCreateComponent, canActivate:[AuthGuard]},
   { path:'edit/:postId',component:PostCreateComponent,canActivate:[AuthGuard]},
   { path:'login',component: LoginComponent},
   { path:'signup',component: SignupComponent}

  
   

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { 

}
