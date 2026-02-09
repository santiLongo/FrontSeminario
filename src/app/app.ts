import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalSpinnerComponent } from "lib-core";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GlobalSpinnerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}
