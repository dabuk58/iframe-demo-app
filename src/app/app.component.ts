import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  formGroup!: FormGroup;
  isLoggedIn: boolean = false;

  constructor(){ }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      login: new FormControl(null, {
        updateOn: 'change',
        validators: Validators.required
      }),
      password: new FormControl(null, {
        updateOn: 'change',
        validators: Validators.required
      })
    });

    window.parent.postMessage(true, "http://localhost:4200");

    window.addEventListener("message", (event) => {
      if(event.origin !== "http://localhost:4200"){
        return;
      } else {
        this.formGroup.patchValue({
          login: event.data.login,
          password: event.data.password
        });
      }
    });
  }

  onLogin(){
    this.isLoggedIn = true;
  }
}
