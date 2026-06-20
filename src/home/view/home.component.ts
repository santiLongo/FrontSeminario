import { AfterViewInit, Component, ViewEncapsulation } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { Router, RouterOutlet } from "@angular/router";
import { BreadcrumbComponent, TreeMenuItem, TreeMenuV3Component } from "lib-home";
import { HomeHttpService } from "../service/http.service";
import { MenuModel } from "../models/models";
import { map } from "leaflet";
import { AuthService } from "lib-core";

@Component({
    standalone: true,
    selector: 'app-home-component',
    templateUrl: './home.component.html',
    styleUrl: './home.css',
    imports: [RouterOutlet, MatSidenavModule, MatIcon, MatButtonModule, BreadcrumbComponent, TreeMenuV3Component]
})
export class HomeComponent implements AfterViewInit {
    public opened = false;
    public menuItems: TreeMenuItem[];

    constructor(
        private httpService: HomeHttpService,
        private router: Router,
        private authService: AuthService
    ){

    }

    ngAfterViewInit(): void {
        this.httpService.getMenu().subscribe((res) => {
            this.menuItems = res.map<TreeMenuItem>(item => this.map(item))
        })
    }

    onClick(){
        this.opened = !this.opened;
    }

    private map(item: MenuModel): TreeMenuItem {
        return {
            key: item.key,
            label: item.label,
            icon: item.icon,
            onClick: () => this.router.navigate([item.route]),
            children: item.children?.map(item => this.map(item))
        }
    }

    logout() {
        this.authService.logout();
        window.location.reload();
    }
}