import { Routes } from '@angular/router';
import { Inicial } from './telas/inicial/inicial';
import { Cadusu } from './telas/cadusu/cadusu';
import { Principal } from './telas/principal/principal';
//import { AuthGuard } from './service/auth.guard';
import { Login } from './telas/login/login';
import { Cademp } from './telas/cademp/cademp';
import { CadastroEvento } from './telas/cadeve/cadeve';

export const routes: Routes = [
  { path: '', redirectTo: 'principal', pathMatch: 'full' },
  { path: 'inicial', component: Inicial },
  { path: 'login', component: Login },
  { path: 'cadusu', component: Cadusu },
  { path: 'cademp', component: Cademp /*,canActivate: [AuthGuard]*/ },
  { path: 'principal', component: Principal/*, canActivate: [AuthGuard] */ },
  { path: 'cadeve', component: CadastroEvento/*, canActivate: [AuthGuard] */ },
  //{ path: '**', redirectTo: 'inicial' }*/
];

