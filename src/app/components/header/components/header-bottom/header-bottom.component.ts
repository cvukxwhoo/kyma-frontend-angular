import { Component, OnInit } from '@angular/core';
import {
  cameras,
  lens,
  cameraRecords,
  studioEquipments,
  sounds,
  toys,
  cameraAccessories,
} from '../../nav.interface';

@Component({
  selector: 'app-header-bottom',
  templateUrl: './header-bottom.component.html',
  styleUrls: ['./header-bottom.component.scss'],
})
export class HeaderBottomComponent implements OnInit {
  // ----- NAV LIST HIDDEN ------- //
  isCameraHidden = true;
  isLenHidden = true;
  isCameraRecordHidden = true;
  isCameraAccessory = true;
  isStudioEquipment = true;
  isSound = true;
  isToy = true;

  // ----- PRODUCT TYPES ------------- //
  camera: any;
  len: any;
  cameraRecord: any;
  cameraAccessory: any;
  studioEquipment: any;
  sound: any;
  toy: any;

  constructor() {
    this.camera = cameras;
    this.len = lens;
    this.cameraRecord = cameraRecords;
    this.studioEquipment = studioEquipments;
    this.sound = sounds;
    this.toy = toys;
    this.cameraAccessory = cameraAccessories;
  }

  ngOnInit(): void {}

  // ----- click Hidden ---- //
  camHiddenClick() {
    this.hideAllSubmenus();
    this.isCameraHidden = !this.isCameraHidden;
  }

  lenHiddenClick() {
    this.hideAllSubmenus();
    this.isLenHidden = !this.isLenHidden;
  }

  camRecHiddenClick() {
    this.hideAllSubmenus();
    this.isCameraRecordHidden = !this.isCameraRecordHidden;
  }

  camAccessHiddenClick() {
    this.hideAllSubmenus();
    this.isCameraAccessory = !this.isCameraAccessory;
  }

  stuHiddenClick() {
    this.hideAllSubmenus();
    this.isStudioEquipment = !this.isStudioEquipment;
  }

  soundHiddenClick() {
    this.hideAllSubmenus();
    this.isSound = !this.isSound;
  }
  toyHiddenClick() {
    this.hideAllSubmenus();
    this.isToy = !this.isToy;
  }

  hideAllSubmenus(): void {
    this.isCameraHidden = true;
    this.isLenHidden = true;
    this.isCameraRecordHidden = true;
    this.isCameraAccessory = true;
    this.isStudioEquipment = true;
    this.isSound = true;
    this.isToy = true;
  }

  hideSubmenuOnMouseLeave(): void {
    this.hideAllSubmenus();
  }
}
