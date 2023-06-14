import {Component, Inject, Output, EventEmitter} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {NgIf} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BloodGroup } from '../app.component';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';

export interface DialogData {
  test: any,
  bloodGroups: string[],
  bloodGroupBottlesCount: any
}

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'form-component',
  templateUrl: 'form.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    NgIf,
    MatDialogModule,
  ],
})
export class FormComponent {
  bloodGroupBottlesCount: any = {
    [BloodGroup.aplus]: 0,
    [BloodGroup.bplus]: 0,
    [BloodGroup.oplus]: 0,
    [BloodGroup.abplus]: 0,
    [BloodGroup.aminus]: 0,
    [BloodGroup.bminus]: 0,
    [BloodGroup.ominus]: 0,
    [BloodGroup.abminus]: 0
  }

  @Output() onFormSubmit: EventEmitter<any> = new EventEmitter();
  constructor(public dialog: MatDialog) {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: { bloodGroupBottlesCount: this.bloodGroupBottlesCount, bloodGroups: Object.keys(this.bloodGroupBottlesCount) },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', Object.keys(this.bloodGroupBottlesCount), result);
      this.bloodGroupBottlesCount = result;
      this.onFormSubmit.emit(result);
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, MatGridListModule, FormsModule, MatButtonModule, CommonModule],
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

