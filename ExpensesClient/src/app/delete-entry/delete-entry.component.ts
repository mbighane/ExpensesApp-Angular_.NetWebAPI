import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { EntriesComponent } from '../entries/entries.component';
import { EntryService } from '../entry.service';
import { EntryElement } from '../Interfaces/EntryElement';

@Component({
  selector: 'app-delete-entry',
  templateUrl: './delete-entry.component.html',
  styleUrls: ['./delete-entry.component.css']
})
export class DeleteEntryComponent implements OnInit {
  
  entry ={
    description:'',
    value:0,
    isExpense:false
  };
 id:any;
 constructor(private route:ActivatedRoute,
  private service:EntryService,
  private router:Router) { }

  ngOnInit() {
   
    this.id = this.route.snapshot.paramMap.get('id');
    this.service.getEntry(this.id).subscribe((data:any) => {
      console.log(data);
      this.entry.description = data.Description;
      this.entry.isExpense = data.IsExpense;
      this.entry.value = data.Value;
    })
  }

  cancel(){
    this.router.navigate(['/'])
  }

  confirm(){
    this.service.deleteEntry(this.id).subscribe((data)=>{
      console.log(data);
    })
  }

}
