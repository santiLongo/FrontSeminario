import { Component, ViewEncapsulation } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { RouterOutlet } from "@angular/router";
import { BreadcrumbComponent, TreeMenuComponent, TreeMenuV2Component } from "lib-home";

@Component({
    selector: 'app-home-component',
    templateUrl: './home.component.html',
    styleUrl: './home.css',
    imports: [RouterOutlet, MatSidenavModule, MatIcon, MatButtonModule, BreadcrumbComponent, TreeMenuV2Component]
})
export class HomeComponent {
    public opened = false;

    onClick(){
        this.opened = !this.opened;
    }
}