import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JokeComponent } from './components/joke/joke.component';

const routes: Routes = [
  { path: 'searchjokes', component: JokeComponent },
  { path: '', redirectTo: '/searchjokes', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
