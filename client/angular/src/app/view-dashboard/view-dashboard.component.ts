import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

declare let $: any;
// Set the Locaion of the Reveal Server - this is the default Sample Server for Reveal
//$.ig.RevealSdkSettings.setBaseUrl('https://samples.revealbi.io/upmedia-backend/reveal-api/');
$.ig.RevealSdkSettings.setBaseUrl("http://localhost:5111");

@Component({
  selector: 'app-view-dashboard',
  templateUrl: './view-dashboard.component.html',
  styleUrls: ['./view-dashboard.component.scss']
})

export class ViewDashboardComponent implements AfterViewInit {

  @ViewChild('revealView') el!: ElementRef;

  async ngAfterViewInit() {
    let dashboard = await $.ig.RVDashboard.loadDashboard("Sales");
    var revealView = new $.ig.RevealView(this.el.nativeElement);
    revealView.interactiveFilteringEnabled = true;
    //revealView.canEdit = false;
    revealView.dashboard = dashboard;
    };
  } 
