import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { PictureInfo } from 'src/PICTURE';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() btnClick = new EventEmitter();

  isLoggedIn = false;
  signUpView = false;
  pictures: PictureInfo[] = []
  signUpBtnText = 'Sign Up';
  signUpTextInfo = 'Don\'t have an account?';
  registeredIDs: number[] = [];
  registeredUsersList: string[] = [];
  passWords: string[] = [];
  userName = ''
  pass = ''
  passConfirm = ''
  email = ''



  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getLogins().subscribe((listreturn) => {
      // console.log(listreturn)
      for (let user of listreturn) {
        
        this.registeredIDs.push(Number(user.id))
        this.registeredUsersList.push(user.username)
        this.passWords.push(user.password)

      }
      

    })
  }

  onSignUpBtnClick() {
    this.signUpView = !this.signUpView;
    this.signUpTextInfo = this.signUpView ? 'Already have an account?' : 'Don\'t have an account?';
    this.signUpBtnText = this.signUpView ? 'Log In' : 'Sign Up';
  }

  onBtnClick() {
    if (this.signUpView) {
      const newSignUp = {
        username : this.userName,
        email : this.email,
        password : this.pass,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: "active"

      }

      let k = 0

      try {
        k = this.registeredIDs.reduce((a,b) => {return Math.max(a,b)})
      } catch {
        k = 0
      }

      const newSignUpPictures = {
        user_id : k + 1,
        images : this.pictures
      }

      this.dataService.addAccount(newSignUp).subscribe()
      this.dataService.addUserPicture(newSignUpPictures).subscribe()

      alert("Registration Successful.")

      this.registeredUsersList.push(this.userName)
      this.registeredIDs.push(k + 1)
      this.passWords.push(this.pass)

      this.userName = ''
      this.pass = ''
      this.signUpView = false

      this.signUpTextInfo = this.signUpView ? 'Already have an account?' : 'Don\'t have an account?';
      this.signUpBtnText = this.signUpView ? 'Log In' : 'Sign Up';

      
      
      return
    } 

    let k = this.registeredUsersList.indexOf(this.userName)
    console.log(k)
    if (k != -1) {
      if (this.passWords[k] == this.pass) {
        alert("Login Successful.")
        this.isLoggedIn = true;
      } else {
        alert("Incorrect credentials. Try again.")
        return
      }
    } else {
      alert("Incorrect credentials. Try again.")
      return
    }


    this.btnClick.emit([this.isLoggedIn, this.registeredIDs[k], this.registeredUsersList[k]])

    console.log("Emitted Event from Login: ")
    console.log([this.isLoggedIn, this.registeredIDs[k], this.registeredUsersList[k]])

    
  }

}
