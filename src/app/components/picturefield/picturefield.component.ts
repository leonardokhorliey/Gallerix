import { Component, Input, OnInit } from '@angular/core';
import { PictureInfo } from 'src/PICTURE';
import { faTimes, faExclamationCircle, faAngleDoubleDown, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-picturefield',
  templateUrl: './picturefield.component.html',
  styleUrls: ['./picturefield.component.css']
})
export class PicturefieldComponent implements OnInit {
  @Input() day?: string;

  @Input() picturesArray : PictureInfo[] = [];
  faAngleDoubleDown = faAngleDoubleDown
  faAngleDoubleUp = faAngleDoubleUp
  showImages = true;

  pictureOutlineArray: string[][] = [[]];

  image = "How-to-Use-Google-Tasks-on-a-Desktop.jpeg";

  constructor() { }

  ngOnInit(): void {
    let k = this.day
    this.pictureOutlineArray = this.createPictureOutlineArray(this.picturesArray)
    // console.log(this.day)

    // console.log(this.pictureOutlineArray)

    
  }

  createPictureOutlineArray(arr: PictureInfo[]) {
    
    let k: string[][] = [[],[],[],[]];
    for (let i = 0; i < arr.length; i++) {
      k[i%4].push(arr[i].url)
    }
    return k;
  }

  hideImages() {
    this.showImages = !this.showImages
  }

}
