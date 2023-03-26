import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SuperHeroService {

  constructor(private http:HttpClient) { }

  getSuperHero()
  {
    return this.http.get<any>("http://localhost:3000/superHroesList/");
  }
  addSuperHero(data :any)
  {
    return this.http.post<any>("http://localhost:3000/superHroesList/",data);
  }
  deleteSuperHero(id:number)
  {
    return this.http.delete<any>("http://localhost:3000/superHroesList/"+id);
  }
  editSuperHero(data:any,id:number)
  {
    return this.http.put<any>("http://localhost:3000/superHroesList/"+id,data);
  }
}
