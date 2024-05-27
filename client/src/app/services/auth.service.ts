import { Injectable } from '@angular/core';

export interface User {
  readonly id: string;
  readonly username: string;
  readonly first_name: string;
  readonly last_name: string;
  readonly group: string;
  readonly photo: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
}
