import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  @Input() statsValues : any[] = []

  @Output() dayselected = new EventEmitter()
  

  stats = ["Total number of pictures", "Daily Average Picture Upload", "Day with Highest Picture Upload"]
  statsBelow = ["Highest Number of Picture Upload in a Day", "Last Upload Date", "First Upload Date"]

  constructor() { }

  ngOnInit(): void {
  }

  clickStat(stat: string) {
    if (["Day with Highest Picture Upload", "Highest Number of Picture Upload in a Day"].includes(stat)) {
      this.dayselected.emit(this.statsValues[2])
    } else if (stat == "Last Upload Date") {
      this.dayselected.emit(this.statsValues[4])
    } else if (stat == "First Upload Date") {
      this.dayselected.emit(this.statsValues[5])
    } else {
      this.dayselected.emit("")
    }
  }

}
