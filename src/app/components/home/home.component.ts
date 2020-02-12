import { Component, OnInit } from '@angular/core';
import { personaInterface } from 'src/app/model/user';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public personas : personaInterface[];
  

  constructor(public dataBase: DatabaseService) { 
    this.escucharCambios();
  }

  ngOnInit() {
    this.dataBase.getAll().subscribe(data => {
      this.personas = data; 
    })
  }

  
  /**
   * Escucha las acciones del usuario, al actualizar o agregar se emite el dato de dicha accion
   * Si el dato emitido contiene un id conocido se actualiza en la lista local,
   * en caso contrario se agrega al array, evitando realizar consultas. 
   *  !ver : DATABASE.SERVICES.TS 
   */
  private escucharCambios(){
    this.dataBase.$persona.subscribe(data => {
  
    if(this.personas.find(elemento => elemento.id == data.id)) {
      
      const persona = this.personas.find(elemento => elemento.id == data.id);
      persona.nombre = data.nombre;
      persona.apellido = data.apellido; 
      persona.edad = data.edad; 
      persona.id = data.id;
    } else {
      this.personas.push(data);
    }
      
      

    })
  }

  //Envia el delete, si la respuesta es true, se elimina de la lista
  public OnBorrar(id : number) {
    if(confirm("Desea eliminar este elemento?")) {
      this.dataBase.delete(id).subscribe(data => {
        if(data) { //Si se elimino correctamente se eliminara del array
          this.personas = this.personas.filter(data => data.id != id);
        }  
      })
    } 
  }

  public onPreCargar(persona : personaInterface){ 
    this.dataBase.personaSeleccionada = Object.assign({}, persona);
  }

  public onNuevo(){
    this.dataBase.personaSeleccionada = {};
  }

}
