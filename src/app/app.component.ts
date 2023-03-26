import { Component, OnInit,AfterViewInit, ViewChild } from '@angular/core';
import {SuperHeroService} from "./services/super-hero.service"
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  displayedColumns: string[] = ['Id', 'Name', 'Power','action'];
  dataSource = new MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  title:string = 'Super Heroes';

constructor(private superHeroService:SuperHeroService,private dialog: MatDialog)
{}

  ngOnInit(): void {
    this.getAllSuperHeroes();
  }

  /**Super hero Dialog
 * 
 */
openDialog(): void {
  const dialogRef = this.dialog.open(DialogComponent, {
  width:'30%'
  }).afterClosed().subscribe(val=>{
    if(val === 'save')
    { this.getAllSuperHeroes()}
  });
}

/**Listing all super heroes
 *  
 */

  getAllSuperHeroes()
  {
    this.superHeroService.getSuperHero()
    .subscribe({
      next:(res)=>{
        this.dataSource=new MatTableDataSource(res)
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
      },
      error:(err)=>{
        alert("somethng went wrong while fetching the SH")
      }
    })
    ;
  }

/**Editing a super hero
 * 
 */
  editsuperHero(row :any)
  {
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row
      }).afterClosed().subscribe(val=>{
        if(val==='update')
        {this.getAllSuperHeroes();}
      });
  }

  /**Deleting a super heroes
   * 
  */
  deletesuperHero(id:number,Name:string){
    /////Browser Native confirmation alert//////////
      if(confirm("Are you sure you want to delete "+Name))
    {
    this.superHeroService.deleteSuperHero(id)
    .subscribe({
      next:(res)=>{
        alert("SuperHero deleted succesfuly")
        this.getAllSuperHeroes();
      },error:()=> {
        alert("Something went wrong while deleting the SuperHero")
      },
    })
    ;
  }}

/**Filtering super heroes
 * 
 * @param event 
 */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
  }
}}
