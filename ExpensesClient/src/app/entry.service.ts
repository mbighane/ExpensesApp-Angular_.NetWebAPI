import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({

  providedIn: 'root'
})
export class EntryService {

  baseUrl: string ='http://localhost:59530/api/entries'
  constructor(private http:HttpClient) { }
  getAll()
  {
    return this.http.get(this.baseUrl);
  }

  updateEntry(id:number,entry:any){
    return this.http.put(this.baseUrl+'/' + id, entry)

  }
  createEntry(entry:any){
    return this.http.post(this.baseUrl, entry);

  }
  getEntry(id:number){
    return this.http.get(this.baseUrl+'/'+id);
  }
  deleteEntry(id:number){
    return this.http.delete(this.baseUrl+'/'+id);
  }
}
