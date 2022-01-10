import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { PictureInfo } from 'src/PICTURE';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  pictures: PictureInfo[] = []
  @Input() currentUser? : number;
  @Input() currentUserName? : string;

  @Output() btnClick = new EventEmitter();

  picName = ''
  picUrl = ''
  picFormat = ''

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getUserPictures().subscribe((listReturn) => {
      this.pictures = listReturn.filter((t) => {return t.user_id == this.currentUser})[0].images
    })
  }


  onSubmit() {

    let k = this.picUrl.length;
    if (!(["jpg", "png", "jpeg"].includes(this.picUrl.substring(k - 3).toLowerCase()))) {
      this.picUrl = this.picUrl + "." + this.picFormat
    }

    const newPicture = {
      name : this.picName,
      url : this.picUrl,
      createdAt : new Date(),
      updatedAt : new Date(),
      status : "active"
    }

    this.pictures.push(newPicture)

    const userPictures = {
      user_id : Number(this.currentUser),
      images : this.pictures
    }

    console.log("User Pictures from fileUpload: ")
    console.log(userPictures)

    this.dataService.updatePictures(userPictures).subscribe(() => alert("New Picture Added."))

    this.btnClick.emit(newPicture)
  }

}
