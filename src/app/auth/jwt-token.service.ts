import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {

  constructor() { }

  public getUserFromToken(jwtToken: string): User {
    const payload = jwtToken.split('.')[1];
    const obj = JSON.parse(atob(payload));
    const user: User = { name: obj.sub, email: obj.email, password: '', accessToken: '' };
    return user;
  }
}
