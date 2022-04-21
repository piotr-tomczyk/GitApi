import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
} from '@angular/forms';

import { Language, Repository, User, FetchService } from '../fetch.service';
@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
})
export class MainViewComponent implements OnInit {
  responseRequested = false;
  requestError = false;
  requiredError = false;
  isUser = false;
  isRepository = false;
  waiting = false;
  user?: User;
  repositories?: Repository[];
  searchBar!: FormGroup;
  constructor(private Fetch: FetchService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.searchBar = this.formBuilder.group({
      userName: new FormControl('', [Validators.required]),
      responseTypeControl: new FormControl('', [Validators.required]),
    });
  }
  checkError() {
    if (this.userName?.errors?.['required']) {
      this.requiredError = true;
      return false;
    } else if (this.isUser == false && this.isRepository == false) {
      this.requiredError = true;
      return false;
    } else {
      this.requiredError = false;
      return true;
    }
  }
  changeOption(option: number) {
    if (option == 1) {
      this.isUser = true;
      this.isRepository = false;
    }
    if (option == 0) {
      this.isUser = false;
      this.isRepository = true;
    }
  }
  async onSubmit() {
    if (this.checkError()) {
      this.waiting = true;
      let user_response = await this.Fetch.getUser(this.userName?.value);
      let repository_response = await this.Fetch.getRepositories(
        this.userName?.value
      );
      this.waiting = false;
      if (user_response.Error || repository_response.Error) {
        this.requestError = true;
        this.responseRequested = false;
        return;
      }
      this.requestError = false;
      this.responseRequested = true;
      let languages: Language[] = [];
      let keys: string[] = Object.keys(user_response.languages);
      let values: number[] = Object.values(user_response.languages);
      for (let i = 0; i < keys.length; i++) {
        languages.push({
          name: keys[i],
          bytes: values[i],
        });
      }
      this.user = {
        login: user_response.login,
        name: user_response.name,
        bio: user_response.bio,
        languages: languages,
      };
      repository_response.repositories.forEach((repository: any) => {
        let languages: Language[] = [];
        let keys: string[] = Object.keys(repository.languages);
        let values: number[] = Object.values(repository.languages);
        for (let i = 0; i < keys.length; i++) {
          languages.push({
            name: keys[i],
            bytes: values[i],
          });
        }
        repository.languages = languages;
      });
      this.repositories = repository_response.repositories;
    }
  }
  get userName() {
    return this.searchBar.get('userName');
  }
  get responseType() {
    return this.searchBar.get('responseType');
  }
}
