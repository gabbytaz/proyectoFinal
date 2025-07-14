import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { User } from '../models/user.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './user-form.html'

})
export class UserForm implements OnChanges {
  @Input() user?: User;
  @Output() save = new EventEmitter<User>();
  form: FormGroup;
  successMessage = '';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: [null, Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user'] && this.user) {
      this.form.patchValue(this.user);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.save.emit(this.form.value);
      this.form.reset({ id: 0, name: '', address: '', phone: null });  
    }
  }

}
