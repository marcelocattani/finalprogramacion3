import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { personaInterface } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class DatabaseService {

  _url: string = "http://localhost:8080/api/v1/persona/";

  /** 
   * Este emiter $persona, se lanza con las acciones de guardar o actualizar del usuario
   * envia los nuevos datos al homeComponent para que este los trate, asi evita realizar consultas
   * a la base de datos
   */
  public $persona; 
  public $personaSelec;

  constructor(private http: HttpClient) {
    this.$persona = new EventEmitter<personaInterface>();
    this.$personaSelec = new EventEmitter<personaInterface>();
  }

  getAll(): Observable<personaInterface[]> {     
    return this.http.get<personaInterface[]>(this._url);
  }

  getOne(id: number): Observable<personaInterface> {
    return this.http.get<personaInterface>(this._url + id);
  }

  post(persona: personaInterface): Observable<personaInterface> {
    return this.http.post<personaInterface>(this._url, persona);
  }

  put(id: number, persona: personaInterface): Observable<personaInterface> {
    return this.http.put<personaInterface>(this._url + id, persona);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this._url + id);
  }
}
