import { Component } from '@angular/core';
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { pageRoutes } from './page.routes';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-page',
  imports: [Header, Footer, RouterOutlet],
  templateUrl: './page.html',
  styleUrl: './page.css'
})

export class Page {
}
