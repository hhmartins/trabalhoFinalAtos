import { UsersComponent } from './users/users.component';
import { HistoricComponent } from './historic/historic.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'historic',component:HistoricComponent},
  {path: 'users', component:UsersComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
