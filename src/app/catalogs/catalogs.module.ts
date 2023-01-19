import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { CatalogsRoutingModule } from './catalogs-routing-module';
import { IndexComponent } from './index/index.component';
import { UserComponent } from './user/user.component';
import { FileComponent } from './file/file.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [IndexComponent, UserComponent, FileComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    CatalogsRoutingModule,
    AgGridModule
  ],
  providers: [
    AuthService
  ]
})
export class CatalogsModule { }
