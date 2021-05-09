import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./public/public.module').then(
        (m) => m.PublicModule
      ),
  },

  {
    path: 'complaints',
    loadChildren: () => import('./auth/Auth.module').then((m) => m.AuthModule),
    canActivate: [AuthGuard],
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
