import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
  FormArray,
  Form,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  buyTicketForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // this.buyTicketForm = new FormGroup({
    //   emailControl: new FormControl(null, [Validators.required]),
    //   phoneControl: new FormControl(null),
    //   address: new FormGroup({
    //     streetControl: new FormControl(null),
    //     postalCodeControl: new FormControl(null),
    //   }),
    // });

    this.buyTicketForm = this.fb.group({
      emailControl: [null, [Validators.required]],
      phoneControl: [null],
      address: this.fb.group({
        streetControl: [null],
        postalCodeControl: [null],
      }),
      tickets: this.fb.array([], Validators.required),
    });
  }

  get tickets(): FormArray {
    return this.buyTicketForm.get('tickets') as FormArray;
  }

  buyTickets() {
    if (this.buyTicketForm.status === 'VALID') {
      console.log(this.buyTicketForm.value);
    } else {
      console.log('Form is not valid');
    }
  }

  addTicket() {
    this.tickets.push(this.createTicket());
  }

  createTicket(): FormGroup {
    return this.fb.group({
      name: [null, [Validators.required]],
      age: [null, [Validators.required]],
    });
  }
}
