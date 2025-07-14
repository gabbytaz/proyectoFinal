import { ChangeDetectorRef, Component,EventEmitter,OnInit,Output} from '@angular/core';
import { UserService } from '../services/user';
import { User } from '../models/user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserForm } from '../user-form/user-form';

@Component({
  selector: 'app-usuarios',
  imports: [FormsModule, CommonModule,UserForm],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css'
})
export class Usuarios implements OnInit {
 users: User[] = [];
 selectedUser?: User;

  constructor(private userService: UserService,private cd:ChangeDetectorRef) {
    
  }
  
  ngOnInit(): void {
   this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.loadUsers().subscribe(users => {
       this.users = users;
       console.log('users loaded:', this.users);
       this.cd.detectChanges();
    });
  }
  
  onSave(user: User):void {
  if (user.id) {
      this.userService.updateUser(user).subscribe(() => this.fetchUsers());
    } else {
      this.userService.addUser(user).subscribe(() => this.fetchUsers());
     
    }
    this.selectedUser = undefined;
  }

  onEdit(id: number):void {
     const user = this.users.find(u => u.id === id);
    if (user) {
      this.selectedUser = { ...user };
    }
  }

  confirmDelete(id: number):void {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este usuario?');
    if (confirmed) {
      this.userService.deleteUser(id).subscribe(() => this.fetchUsers());
    }
  }
}
