import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { personaInterface } from '../../model/user';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  public forma : FormGroup;
  @ViewChild('btnClose' ,{static :true}) btnClose : ElementRef;

  constructor(public dataBase : DatabaseService) { 
    
    this.forma = new FormGroup({
      'nombre' : new FormControl("", Validators.required),
      'apellido' : new FormControl("", Validators.required),
      'edad' : new FormControl("", Validators.required),
      'id' : new FormControl(""),
    });

    
    this.dataBase.$personaSelec.subscribe( data => {     
      this.forma.setValue(data);
    })
  }

  ngOnInit() {  
        
  }

  public onGuardar() {
    
    let persona : personaInterface = {
      id : this.forma.value.id,
      nombre : this.forma.value.nombre,
      apellido : this.forma.value.apellido, 
      edad : this.forma.value.edad
    }

    if (!this.forma.value.id) {     
      
      this.dataBase.post(persona).subscribe(data => {
        if (data) {
          this.dataBase.$persona.emit(data); //Si la accion fue correcta se emiten los nuevos datos
        }
      })
    } else {
      this.dataBase.put(persona.id, persona).subscribe(data => {
        if (data) {
          this.dataBase.$persona.emit(data); //Si la accion fue correcta se lanzan los datos de actualizacion
        }
      })
    }

    this.btnClose.nativeElement.click();
    
  }

}
