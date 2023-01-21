import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { FileDataI } from '../models/fileData';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class FileService {

  AUTH_SERVER: string = 'http://localhost:8080/';
  authSubject = new BehaviorSubject(false);

  constructor(private httpClient: HttpClient) { }

  public createAddFileForm(name: string, file: File): FormData {

    const formData = new FormData();
    formData.append('name', name);
    formData.append('file', file);
    return formData;
  }

  public createFileFormDate(oldName: string, newName: string): FormData {

    const formData = new FormData();
    formData.append('oldName', oldName);
    formData.append('newName', newName);
    return formData;
  }

  // * Obtiene todos los archivos de la BD
  public getAllFiles():  Observable<FileDataI[]> {

    const headers= new HttpHeaders()
    .set('content-type', 'application/json');

    return this.httpClient.get<FileDataI[]>(`${this.AUTH_SERVER}file/list`, {'headers': headers});
  }

  public addFile ( file: FileDataI, fileSave: File ): Observable<FileDataI> {

    const formData = this.createAddFileForm(file.name, fileSave);

    return this.httpClient.post<FileDataI>(`${this.AUTH_SERVER}file/add`, formData);
  }

  public addFileMulti ( file: FileDataI[] ): Observable<String> {

    const formData = new FormData();

    let array: any[] = [];

    for (let index = 0; index < file.length; index++) {

      array.push(file[index].name);

    }
    formData.append("name", JSON.stringify(array));

    // For para poder guardar todos los archivos y poder mandarlos en un array
    for (let index = 0; index < file.length; index++) {
      const element = file[index].file;

      formData.append('file', element);
    }

    return this.httpClient.post<String>(`${this.AUTH_SERVER}file/add-file-multiple`, formData);
  }

  public editFile(form: FormData): Observable<FileDataI> {

    return this.httpClient.put<FileDataI>(`${this.AUTH_SERVER}file/update`, form);
  }

  public deleteFile(name: string): Observable<FileDataI> {

    return this.httpClient.delete<FileDataI>(`${this.AUTH_SERVER}file/delete/${name}`);
  }
}
