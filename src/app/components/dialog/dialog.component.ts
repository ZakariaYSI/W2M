import { Component,Inject } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import {SuperHeroService} from "../../services/super-hero.service"
import {MatDialogRef,MAT_DIALOG_DATA} from "@angular/material/dialog"

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  constructor(private formBuilder :FormBuilder,private superHeroService :SuperHeroService,
    @Inject(MAT_DIALOG_DATA) public editData:any,private dialogRef:MatDialogRef<DialogComponent>){}

  superheroForm !: FormGroup
  editBtn:string="Add";

  ngOnInit(){
    this.superheroForm=this.formBuilder.group({
      
      Name : ['',Validators.required],
      Power:['',Validators.required]
    });
    if(this.editData){
      this.editBtn="Update";
      
      this.superheroForm.controls['Name'].setValue(this.editData.Name);
      this.superheroForm.controls['Power'].setValue(this.editData.Power);
    }
  }

 /**Adding super heroes
 * 
 */

  addSuperHero(){
    if(!this.editData){
    if(this.superheroForm.valid){
      this.superHeroService.addSuperHero(this.superheroForm.value)
      .subscribe({
        next:(res)=>{
          alert("SuperHero added succesfuly")
          this.superheroForm.reset();
          this.dialogRef.close('save');

        },
        error:()=>{
          alert("Error while adding the SuperHero")
        }
      })
      ;
    }
   }else{
    this.updatesuperHero()
   }
  }

  /**editing super heroes
 * 
 */

  updatesuperHero(){
    this.superHeroService.editSuperHero(this.superheroForm.value,this.editData.id)
    .subscribe({
      next:(res)=>
      {
    alert("SuperHero updated succsefuly");
    this.superheroForm.reset()
    this.dialogRef.close('update')

      },
      error:()=>{
        alert("Something went wrong while updating")
      }
  })
}
}