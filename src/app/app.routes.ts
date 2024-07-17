import { Routes} from '@angular/router';
import { HomepageComponent } from './component/homepage/homepage.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LoginOrRegisterComponent } from './component/login-or-register/login-or-register.component';

export const routes: Routes = [
    {path: '', component: HomepageComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'loginOrRegister', component: LoginOrRegisterComponent},
    {path: '**', redirectTo: '', pathMatch: 'full' }
];