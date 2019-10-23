import {Injectable, OnInit} from '@angular/core';
import {Plugins} from '@capacitor/core';

@Injectable({
    providedIn: 'root'
})
export class AuthorizedPageBaseService {

    constructor() {
        Plugins.Storage.get({key: 'authData'}).then(x => {
            if (x.value === null) {
                window.location.pathname = '/login';
            }
        });
    }
}
