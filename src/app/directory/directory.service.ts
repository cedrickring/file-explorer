import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {

  constructor(private http: HttpClient) {
  }

  getSupportedFileTypes(): Observable<string[]> {
    return this.http.get<string[]>('/assets/filetypes/filetypes.json');
  }

}
