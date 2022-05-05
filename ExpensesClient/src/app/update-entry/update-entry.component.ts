import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EntryService } from '../entry.service';
import { EntryElement } from '../Interfaces/EntryElement';
import { Type } from '../Interfaces/Type';

@Component({
  selector: 'app-update-entry',
  templateUrl: './update-entry.component.html',
  styleUrls: ['./update-entry.component.css']
})
export class UpdateEntryComponent implements OnInit {

  form:FormGroup;
  id:number;

  //constructor start
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateEntryComponent>,
    @Inject(MAT_DIALOG_DATA){Description, IsExpense,Value,Id}: 
    {Description:string, IsExpense:boolean, Value:number, Id:number},
    private service:EntryService) 
  
 {

              
  this.id = Id;

  this.form = fb.group({
    description: [Description, Validators.required],
    isExpense: [IsExpense, Validators.required],
    value: [Value, Validators.required],
    id:[Id]

  })
                

  }
   //constructor end

  types:Type[] = [
    {value:true, display:'Expense'},
    {value:false, display:'Income'}
  ]

  close(){
    console.log("close clicked");
    this.dialogRef.close();
  }
  save(){
   // this.id=1;
    this.form.value.id = this.id;
    console.log('Id: ', this.id);
    this.service.updateEntry(this.id, this.form.value).subscribe((data) => {
      console.log('Data: ', data);
    })
  }


  ngOnInit() {
  }

}
