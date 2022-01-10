import { Component, OnInit } from '@angular/core';
import { LoginEvent, PictureInfo, UserPicture } from 'src/PICTURE';
import { DataService } from './services/data.service';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'GalleryApp';
  faAngleDoubleDown = faAngleDoubleDown
  sideBarActive = false;
  loggedIn = false;
  showStatsPage = false;
  statisticsSelected = false;
  showFileUpload = false;

  picturesArray: string[] = []
  datesAvailable: string[] = []
  picturesbyDate: PictureInfo[][] = []
  datesRendered: string[] = []

  groupedPictures : {} = {}
  picturesMetaData: PictureInfo[] = []
  currentUser? : number = 2
  userInfo?: LoginEvent;
  filterStartDate = new Date(1990,0,1);
  filterEndDate = new Date();
  
  currentUserName? : string
  statistics: any[] = [];


  

  constructor(private dataService: DataService) {}

  ngOnInit() {
    
  }

  getEvent($event: any[]) {
    
    this.currentUser = $event[1]
    this.loggedIn = $event[0]
    this.currentUserName = $event[2]

    const _ = require("lodash");

    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    this.dataService.getUserPictures().subscribe((listReturn) => {
      console.log(listReturn)
      this.picturesMetaData = listReturn.filter((t) => {return t.user_id == this.currentUser})[0].images
      this.picturesMetaData.sort((a, b) => {return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()})

      //for (let pic of this.picturesMetaData this.picturesArray.push(pic.name);

      this.groupedPictures = _.groupBy(this.picturesMetaData, function(d: PictureInfo){
        let k = new Date(d.createdAt)
        return k.getDate() + " " + month[k.getMonth()] + " " + k.getFullYear();
     })

     this.datesAvailable = Object.keys(this.groupedPictures);
     this.picturesbyDate = Object.values(this.groupedPictures);

     console.log(this.datesAvailable)
     console.log(this.picturesbyDate)
     
     
     this.statistics = this.computeStats()

     if (this.statisticsSelected) {
       this.datesRendered = this.datesAvailable.filter((t) => {
         let p = t.split(" ")
         let k = new Date(Number(p[2]), month.indexOf(p[1]), Number(p[0])).getTime()
         return k >= new Date(this.filterStartDate).getTime() && k<= new Date(this.filterEndDate).getTime()
       })
     } else this.datesRendered = this.datesAvailable

    })
  }

  getSideBarEvent() {
    this.sideBarActive = !this.sideBarActive
  }

  computeStats() {
    let numofPictures = this.picturesMetaData.length;
    let dailyAverageUpload = Math.round(numofPictures/this.datesAvailable.length);
    
    let t = 1
    let indexOfmax = 0
    for (let p of this.picturesbyDate) {
      if (p.length > t) {t = p.length; indexOfmax = this.picturesbyDate.indexOf(p)}
    }
    let daywithmostPictures = this.datesAvailable[indexOfmax]

    return [numofPictures, dailyAverageUpload, daywithmostPictures, t, this.datesAvailable[0], this.datesAvailable[this.datesAvailable.length - 1]]

  }

  statSelected($event: string) {
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let p = $event.split(" ")
    
    if (p.length > 1) {
      this.filterStartDate = new Date(Number(p[2]), month.indexOf(p[1]), Number(p[0]))
      this.filterEndDate = new Date(Number(p[2]), month.indexOf(p[1]), Number(p[0]) + 1)
      
      this.datesRendered = this.datesAvailable.filter((t) => {
        let p = t.split(" ")
        let k = new Date(Number(p[2]), month.indexOf(p[1]), Number(p[0])).getTime()
        return k >= new Date(this.filterStartDate).getTime() && k< new Date(this.filterEndDate).getTime()
      })
    } else this.datesRendered = this.datesAvailable

    // console.log(this.filterEndDate)
    // console.log(this.filterStartDate)
    this.statisticsSelected = true
    this.showStatsPage = false
    this.showFileUpload = false
  }

  showStatistics() {
    this.showStatsPage = true
    this.statisticsSelected = false
    this.showFileUpload = false
  }

  uploadFile() {
    this.showFileUpload = true
    this.showStatsPage = false
    this.statisticsSelected = false
    this.sideBarActive = false
  }

  filterImagesbyDate($event: any[]) {
    this.filterStartDate = new Date($event[0])
    this.filterEndDate = new Date($event[1])
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    this.datesRendered = this.datesAvailable.filter((t) => {
      let p = t.split(" ")
      let k = new Date(Number(p[2]), month.indexOf(p[1]), Number(p[0])).getTime()
      return k >= new Date(this.filterStartDate).getTime() && k< new Date(this.filterEndDate).getTime()
    })
  }


  fileUploaded($event: PictureInfo) {
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const _ = require("lodash");
    this.showFileUpload = false

    this.picturesMetaData.push($event)
    this.picturesMetaData.sort((a, b) => {return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()})

    this.groupedPictures = _.groupBy(this.picturesMetaData, function(d: PictureInfo){
      let k = new Date(d.createdAt)
      return k.getDate() + " " + month[k.getMonth()] + " " + k.getFullYear();
   })

   this.datesAvailable = Object.keys(this.groupedPictures);
   this.picturesbyDate = Object.values(this.groupedPictures);

   console.log(this.datesAvailable)
   console.log(this.picturesbyDate)
   
   
   this.statistics = this.computeStats()
   this.datesRendered = this.datesAvailable
  }

  
}
