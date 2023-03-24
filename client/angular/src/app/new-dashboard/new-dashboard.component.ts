import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';


declare let $: any;

@Component({
  selector: 'app-new-dashboard',
  templateUrl: './new-dashboard.component.html',
  styleUrls: ['./new-dashboard.component.scss']
})


export class NewDashboardComponent implements AfterViewInit {
  
  @ViewChild('revealView') el!: ElementRef;
  
  ngAfterViewInit(): void {
    // Set to your server 
    $.ig.RevealSdkSettings.setBaseUrl("http://localhost:5111/");
   
    var revealView = new $.ig.RevealView(this.el.nativeElement);
   
    revealView.interactiveFilteringEnabled = true;
    revealView.startInEditMode = true;
       
    revealView.onDataSourcesRequested = (callback) => {

        // This id the 'full' database
        var redshiftDS = new $.ig.RVRedshiftDataSource
        redshiftDS.id = "redshiftDsId";
        redshiftDS.title = "Redshift Data";
        redshiftDS.subtitle = "Full Database";

        // this is how to add curated items / data sets
        // you can add as many as you want
        // the .id property can be checked on the server to customize the query
        var redshiftDSItem = new $.ig.RVRedshiftDataSourceItem(redshiftDS);
        redshiftDSItem.id = "Invoices";
        redshiftDSItem.title = "Invoices";
        redshiftDSItem.subtitle = "";
        
        callback(new $.ig.RevealDataSources([redshiftDS], [redshiftDSItem], true));
  };

  }  
}
