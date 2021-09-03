
import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { LoginComponent } from './login/login.component';
import { ManageComponent } from './manage/manage.component';
import { OrderPlacedComponent } from './order-placed/order-placed.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PayGateComponent } from './pay-gate/pay-gate.component';
import { RegisterComponent } from './register/register.component';
import { ViewitemsComponent } from './viewitems/viewitems.component';

export const applicationRoutes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'dashboard', component: DashboardComponent},
  {path:'about', component: AboutComponent},
  {path:'contact', component: ContactComponent},
  {path:'login', component: LoginComponent},
  {path:'logout', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'viewitems', component: ViewitemsComponent},
  {path:'manage', component: ManageComponent},
  {path:'addproduct',component:AddproductComponent},
  {path:'editproduct/:id',component:EditproductComponent},
  {path:'cart',component:CartComponent},
  {path:'payment',component:PayGateComponent},
  {path:'orderplaced',component:OrderPlacedComponent},

  {path:'cart/payment',redirectTo:'payment'},
  {path:'cart/dashboard',redirectTo:'dashboard'},
  {path:'payment/orderplaced',redirectTo:'orderplaced'},
  {path:'orderplaced/dashboard',redirectTo:'dashboard'},
  
  {path:'login/register',redirectTo:'register'},
  {path:'register/login',redirectTo:'login'},

  {path:'viewitems/cart',redirectTo:'cart'},
  {path:'editproduct/:id/manage',redirectTo:'manage'}, 

  {path:'manage/addproduct',redirectTo:'addproduct'},
  {path:'manage/editproduct',redirectTo:'editproduct'}, 

  {path:'**', component: PagenotfoundComponent},
];
