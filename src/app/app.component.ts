import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
export enum BloodGroup {
  aplus = "A+",
  bplus = "B+",
  oplus = "O+",
  abplus = "AB+",
  aminus = "A-",
  bminus = "B-",
  ominus = "O-",
  abminus = "AB-"
}

const DONOR_MAP = {
  [BloodGroup.abplus]: [BloodGroup.aplus, BloodGroup.bplus, BloodGroup.oplus, BloodGroup.abplus, BloodGroup.aminus, BloodGroup.bminus, BloodGroup.ominus, BloodGroup.abminus],
  [BloodGroup.abminus]: [BloodGroup.aminus, BloodGroup.bminus, BloodGroup.ominus, BloodGroup.abminus],
  [BloodGroup.aplus]: [BloodGroup.aplus, BloodGroup.oplus, BloodGroup.aminus, BloodGroup.ominus],
  [BloodGroup.aminus]: [BloodGroup.aminus, BloodGroup.ominus],
  [BloodGroup.bplus]: [BloodGroup.bplus, BloodGroup.oplus, BloodGroup.bminus, BloodGroup.ominus],
  [BloodGroup.bminus]: [BloodGroup.bminus, BloodGroup.ominus],
  [BloodGroup.oplus]: [BloodGroup.oplus, BloodGroup.ominus],
  [BloodGroup.ominus]: [BloodGroup.ominus]
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  recBloodGroup: FormControl;
  recBloodCount: FormControl;
  bloodBank: any = {
    [BloodGroup.abplus]: { avlBottle: 0, donors: DONOR_MAP[BloodGroup.abplus]},
    [BloodGroup.abminus]: { avlBottle: 0, donors: DONOR_MAP[BloodGroup.abminus]},
    [BloodGroup.aplus]: { avlBottle: 0, donors: DONOR_MAP[BloodGroup.aplus]},
    [BloodGroup.aminus]: { avlBottle: 0, donors: DONOR_MAP[BloodGroup.aminus]},
    [BloodGroup.bplus]: { avlBottle: 0, donors: DONOR_MAP[BloodGroup.bplus]},
    [BloodGroup.bminus]: { avlBottle: 0, donors: DONOR_MAP[BloodGroup.bminus]},
    [BloodGroup.oplus]: { avlBottle: 0, donors: DONOR_MAP[BloodGroup.oplus]},
    [BloodGroup.ominus]: { avlBottle: 0, donors: DONOR_MAP[BloodGroup.ominus]}
  }

  bloodGroups: string[] = Object.keys(this.bloodBank);

  constructor() {
    this.recBloodGroup = new FormControl('');
    this.recBloodCount = new FormControl(0);
  }

  initBottleCount(bottleCount: any) {
    console.log('[initBottleCount]', bottleCount);
    Object.keys(bottleCount).map(bg => this.bloodBank[bg].avlBottle = bottleCount[bg] || 0)
    console.log(this.bloodBank)
  }

  isDonor(bg: string): boolean {
    return this.bloodBank[this.recBloodGroup.value]?.donors.includes(bg);
  }
}
