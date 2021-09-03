import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { applicationRoutes } from './app-routing.module';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ViewitemsComponent } from './viewitems/viewitems.component';
import { ManageComponent } from './manage/manage.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { CartComponent } from './cart/cart.component';
import { PayGateComponent } from './pay-gate/pay-gate.component';
import { OrderPlacedComponent } from './order-placed/order-placed.component';
import { FooterComponent } from './footer/footer.component';
import { ProductService } from './product.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NgModel } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';
import { UsercartService } from './usercart.service';
import { UserService } from './user.service';
import { CartService } from './cart.service';

@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    AboutComponent,
    ContactComponent,
    PagenotfoundComponent,
    LoginComponent,
    RegisterComponent,
    ViewitemsComponent,
    ManageComponent,
    AddproductComponent,
    EditproductComponent,
    CartComponent,
    PayGateComponent,
    OrderPlacedComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(applicationRoutes),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    DataTablesModule,
    CommonModule
  ],
  providers: [ProductService,UsercartService,UserService,CartService],
  bootstrap: [MainComponent]
})
export class AppModule { }
