import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";

@Component({
    selector: 'app-inicio',
    imports: [RouterOutlet, Header, Footer],
    templateUrl: './inicio.component.html',
})
export class InicioComponent{

}