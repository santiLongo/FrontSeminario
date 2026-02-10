import { Injectable } from '@angular/core';
import { AuthService } from 'lib-core';

@Injectable({
    providedIn: 'root',
})
export class TreeMenuV3Service {
    constructor(private authService: AuthService) {}

    logout() {
        this.authService.logout();
        window.location.reload();
    }
}