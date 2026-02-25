import { Component, Input, OnInit } from "@angular/core";
import { Cards, IconKey, ICONS } from "lib-core";
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-dashboard-v2',
    templateUrl: './dashboard-v2.html',
    styleUrl: './dashboard-v2.css',
    imports: [MatIconModule]
})
export class DashboardV2Component {
    @Input() cards: Cards[] = []
    ICONS = ICONS

    constructor(private router: Router,
        private route: ActivatedRoute
    ){}

    onClick(href: string){
        this.router.navigate([href], {relativeTo: this.route})
    }
}