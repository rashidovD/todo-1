import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AboutDialogComponent} from "../../dialog/about-dialog/about-dialog.component";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public year: Date;
  public site = '#'
  public blog = '#'
  public siteName = 'AngularBegin'

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.year = new Date()
  }

  public openAboutDialog() {
    this.dialog.open(AboutDialogComponent, {
      autoFocus: false,
      data: {
        dialogTitle: 'О программе',
        message: 'Данное приложение поможет мне найти работу Ангуляр разработчиком'
      },
      width: '400px'
    })
  }

}
