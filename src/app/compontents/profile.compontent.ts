import { Component } from '@angular/core';
import { GithubService } from '../services/github.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  user: User;
  repos: Repo[];
  username: string;

  constructor(private githubService: GithubService) {
    this.user = null;
  }

  searchUser() {
    this.githubService.updateUser(this.username);

    this.githubService.getUser().subscribe(
      (user) => {
        this.user = user as User;
        console.log(user);
      },
      (err: any) => console.log(err),
      () => console.log('Done getting user data')
     );

     this.githubService.getRepos().subscribe(
      (repos) => {
        // this.repos = user as User;
        this.repos = repos as Repo[];
        console.log(repos);
      },
      (err: any) => console.log(err),
      () => console.log('Done getting user data')
     );
  }
}

export interface User {
  name: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  login: string;
  location: string;
  email: string;
  blog: string;
  created_at: Date;
}

export interface Repo {
  name: string;
  html_url: string;
  description: string;
  watchers: number;
  forks: number;
}
