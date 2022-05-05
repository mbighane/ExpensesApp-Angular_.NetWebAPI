import { Component, OnInit, ViewChild } from '@angular/core';
import { EntryService } from '../entry.service';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material/table';
import { EntryElement } from '../Interfaces/EntryElement';
import { MatDialog } from '@angular/material/dialog';
import { UpdateEntryComponent } from '../update-entry/update-entry.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent implements OnInit {
  
  dataSource:any;
  search:any;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  displayedColumns: string[]=['Description','IsExpense','Value', 'Actions'];
  constructor(private service:EntryService,
              private dialog:MatDialog) { }

  ngOnInit() {
    this.service.getAll().subscribe((data) => {
      console.log('Result - ', data);
      this.dataSource = new MatTableDataSource<EntryElement>(data as EntryElement[]);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(){
    this.dataSource.filter = this.search ? this.search.trim().toLowerCase() : '';
  }

  
  updateEntry(entry:any){
     debugger;
    this.dialog.open(UpdateEntryComponent,
      { data:
        {
          Id: entry.Id,
          Description: entry.Description,
          IsExpense: entry.IsExpense,
          Value: entry.Value
        } 
      }
    )
  }



}
