import { Component } from '@angular/core';
import { Input } from '@angular/core';

import { User } from '../fetch.service';
@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
})
export class UserViewComponent {
  @Input() user?: User;
  constructor() {}
}
