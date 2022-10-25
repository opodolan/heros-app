import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HerosService } from '../services/heros.service';
import { Hero } from '../models/hero.model';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-heros-list',
  templateUrl: './heros-list.component.html',
  styleUrls: ['./heros-list.component.css']
})
export class HerosListComponent implements OnInit {

  dataSource: MatTableDataSource<Hero> = new MatTableDataSource();
  title = '';
  displayedColumns: string[] = ['id', 'title', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private herosService: HerosService,
    public translate: TranslateService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.retrieveHeros();
  }

  retrieveHeros(): void {
    this.herosService.getAll()
      .subscribe({
        next: (data) => {
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;
          console.log(this.dataSource);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveHeros();
  }

  searchTitle(): void {
    this.herosService.findByTitle(this.title)
      .subscribe({
        next: (data) => {
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;
        },
        error: (e) => console.error(e)
      });
  }

  deleteHero(heroId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        message: this.translate.instant("CONFIRM_ON_DELETE"),
        yes: this.translate.instant("YES"),
        no: this.translate.instant("NO")
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.herosService.delete(heroId)
        .subscribe({
          next: () => {
            this.retrieveHeros();
          },
          error: (e) => console.error(e)
        });
    });
  }
}
