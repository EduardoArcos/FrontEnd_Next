import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FileDataI } from '../../models/fileData';
import { FileService } from '../../services/file.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { fileClass } from '../../models/class/fileClass';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent {

  private subscriptions: Subscription[] = [];
  public fileData: FileDataI[] = [];
  public editFile = new fileClass;
  public oldNameFile: string = "";
  public fileSave!: File | null;
  public isVisible: boolean = false;
  public entries: number = 10;
  public tableOffset = 0;
  dataTable: FileDataI[] = [];

  public hiddenList = false;
  public hiddenEdit = true;
  public hiddenAdd = true;
  public hiddenEditMulti = true;
  public hiddenAddMulti = true;

  constructor(
    private fileService: FileService,
    private router: Router,
    private authService: AuthService
  ){
    this.getAllFiles();
  }

  public getAllFiles(): void {

    this.subscriptions.push(
      this.fileService.getAllFiles().subscribe(
        ( resp: any[] ) => {

          this.fileData = resp.map((prop:any) => {
            return {
              ...prop
            }
          });

        },
        (errorResponse: HttpErrorResponse) => {
          alert(`Ocurrio un error: ${errorResponse.message}`);

        }
      )
    );
  }

  public onEditUser(file: FileDataI): void {
    this.editFile = file;
    this.oldNameFile = file.name;
    this.hiddenList = true;
    this.hiddenEdit = false;
    this.hiddenAdd = true;
    this.hiddenAddMulti = true;
  }

  public onEditFileData(oldName:string, file: FileDataI): void {

    // detiene el proceso si el formulario no esta bien llenado
    if (!file.name) {
      alert(`El campo nombre tiene que estar lleno.`);
      return;
    }

    const formData = this.fileService.createFileFormDate(oldName, file.name);

    this.subscriptions.push(
      this.fileService.editFile(formData).subscribe(
        (response: FileDataI) => {
          this.getAllFiles();
          alert(`Se ha modificado correctamente el nombre del archivo con el id: ${response.id}`);
          this.onListUser();
        }
      )
    );
  }

  public onDeleteFile(name: string): void {

    this.subscriptions.push(
      this.fileService.deleteFile(name).subscribe(
        (resp: any) => {

          alert(`Se ha eliminado el archivo con el nombre: ${name}`);
          this.getAllFiles();
        }
      )
    );

  }

  public onListUser():void {

    this.hiddenList = false;
    this.hiddenEdit = true;
    this.hiddenAdd = true;
    this.hiddenAddMulti = true;
  }

  public onFileSaveMulti( event: any): void {
    this.fileSave = event.target.files[0];

    let contador = 0;

    for ( let array of event.target.files ) {

      let dataSave: FileDataI = {
        id:0,
        name:"",
        url:"",
        file:event.target.files[contador]!,
      }

      contador++;
      this.dataTable.push(dataSave);
    }

    this.isVisible = true;
    this.dataTable = [...this.dataTable];
  }

  public onAddFile( form: NgForm ): void {

    // detiene el proceso si el formulario no esta bien llenado
    if (form.invalid) {
      alert(`Favor de llenar el formulario antes de tratar de enviarlo.`);
      return;
    }

    // Validacion de que se mande un archivo
    if(this.fileSave == null || this.fileSave == undefined) {
      alert(`Es necesario adjuntar un archivo`);
      return;
    }

    // Validacion del tamaño del archivo
    if(this.fileSave.size/1024/1024 >= 1.99) {
      alert("El archivo es demasiado grande, reduzca su tamaño o utilice otro.");
      return;
    }

    this.subscriptions.push(
      this.fileService.addFile(form.value, this.fileSave).subscribe(
        (response: FileDataI) => {

          alert(`Se ha correctamente el archivo y tiene el id: ${response.id}`);

          this.fileSave = null;

          this.getAllFiles();
          this.onListUser();
        },
        (errorResponse: HttpErrorResponse) => {
          alert(`Ocurrio un error: ${errorResponse.message}`);
        }
      )
    );

  }

  public onAddFileMulti(): void {

    // detiene el proceso si el formulario no esta bien llenado
    if (this.dataTable.length == 0) {
      alert(`Favor de llenar el formulario antes de tratar de enviarlo.`);
      return;
    }

    this.subscriptions.push(
      this.fileService.addFileMulti(this.dataTable).subscribe(
        (response: any) => {

          alert("Se han agregado correctamente los archivos.");
          this.dataTable = [];

          this.getAllFiles();
          this.onListUser();
        },
        (errorResponse: HttpErrorResponse) => {
          alert(`Ocurrio un error: ${errorResponse.message}`);
        }
      )
    );

  }

  public onFileSave( event: any): void {
    this.fileSave = event.target.files[0];
  }

  public toAdd(): void {

    this.hiddenList = true;
    this.hiddenEdit = true;
    this.hiddenAdd = false;
    this.hiddenAddMulti = true;
  }

  public toEditMulti(file: FileDataI): void {
    this.editFile = file
    this.hiddenEditMulti = false;
    this.hiddenList = true;
    this.hiddenEdit = true;
    this.hiddenAdd = true;
    this.hiddenAddMulti = true;
  }

  public toAddMulti(): void {
    this.hiddenAddMulti = false;
    this.hiddenEditMulti = true;
    this.hiddenList = true;
    this.hiddenEdit = true;
    this.hiddenAdd = true;
  }

  public toAddMultiForm(): void {
    this.hiddenEditMulti = true;
    this.hiddenList = true;
    this.hiddenEdit = true;
    this.hiddenAdd = false;
    this.hiddenAddMulti = true;
  }

  onlogout():void {
    this.authService.logout();

    this.router.navigateByUrl("/login");
  }

  toUser():void {

    this.router.navigateByUrl("/catalogs/user");
  }

  toFile():void {

    this.router.navigateByUrl("/catalogs/file");
  }

  toIndex():void {

    this.router.navigateByUrl("/catalogs/index");
  }
}
