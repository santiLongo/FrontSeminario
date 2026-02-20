import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { NzResultModule } from "ng-zorro-antd/result";

@Component({
    selector: 'app-not-found-component',
    templateUrl: './not-found.component.html',
    imports: [NzResultModule]
})
export class NotFoundComponent {

    constructor(private router: Router){}

    onClick(){
        this.router.navigate(['']);
    }
}