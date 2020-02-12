import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { personaInterface } from "../../model/user";
import { DatabaseService } from "../../services/database.service";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.css"]
})
export class ModalComponent implements OnInit {
  public forma: FormGroup;
  @ViewChild("btnClose", { static: true }) btnClose: ElementRef;

  constructor(public dataBase: DatabaseService) {
    this.forma = new FormGroup({
      nombre: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-zA-Z]*"),
        Validators.minLength(3),
        Validators.maxLength(15)
      ]),
      apellido: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-zA-Z]+"),
        Validators.minLength(3),
        Validators.maxLength(15)
      ]),
      edad: new FormControl("", [
        Validators.required,
        Validators.maxLength(2),
        Validators.pattern("[0-9]*")
      ]),
      id: new FormControl("")
    });

    this.dataBase.$personaSelec.subscribe(data => {
      this.forma.setValue(data);
    });
  }

  ngOnInit() {}

  public onGuardar() {   
    
    let persona: personaInterface = {
      id: this.forma.value.id,
      nombre: this.forma.value.nombre,
      apellido: this.forma.value.apellido,
      edad: this.forma.value.edad
    };

    if (!this.forma.value.id) {
      this.dataBase.post(persona).subscribe(data => {
        if (data) {
          this.dataBase.$persona.emit(data); //Si la accion fue correcta se emiten los nuevos datos
        }
      });
    } else {
      this.dataBase.put(persona.id, persona).subscribe(data => {
        if (data) {
          this.dataBase.$persona.emit(data); //Si la accion fue correcta se lanzan los datos de actualizacion
        }
      });
    }    
    this.forma.reset({});
    this.btnClose.nativeElement.click();
  }
}
