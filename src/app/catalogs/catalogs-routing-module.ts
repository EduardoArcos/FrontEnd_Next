import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IndexComponent } from './index/index.component';
import { UserComponent } from './user/user.component';
import { FileComponent } from './file/file.component';

const routes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: 'user', component: UserComponent },
  { path: 'file', component: FileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes),FormsModule],
  exports: [RouterModule,FormsModule]
})
export class CatalogsRoutingModule { }
