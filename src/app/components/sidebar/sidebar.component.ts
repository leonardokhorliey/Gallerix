import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faBars, faAngleDoubleLeft, faUpload, faChartBar, faPlayCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() userName? : string;

  @Output() activateSideBar = new EventEmitter();

  @Output() showStatistics = new EventEmitter();

  @Output() fileUpload = new EventEmitter();
  @Output() dateFilter = new EventEmitter();
  faBars = faBars
  faAngleDoubleLeft = faAngleDoubleLeft
  faUpload = faUpload
  faChartBar = faChartBar
  faPlayCircle = faPlayCircle

  @Input() showSideBar = false;
  filterStartDate? : Date;
  filterEndDate? : Date;

  constructor() { }

  ngOnInit(): void {
  }

  toggleSideBar() {
    this.showSideBar = !this.showSideBar
    this.activateSideBar.emit()
  }

  viewStats() {
    this.showStatistics.emit()
  }

  uploadFile() {
    this.fileUpload.emit()
  }

  filterImages() {

    this.dateFilter.emit([this.filterStartDate, this.filterEndDate])
  }

}
