import { Component } from '@angular/core';
import { Input } from '@angular/core';

import { Repository } from '../fetch.service';
@Component({
  selector: 'app-repository-view',
  templateUrl: './repository-view.component.html',
  styleUrls: ['./repository-view.component.scss'],
})
export class RepositoryViewComponent {
  @Input() repositories?: Repository[];
  constructor() {}
}
