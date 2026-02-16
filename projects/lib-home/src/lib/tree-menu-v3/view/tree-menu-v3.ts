import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeMenuItem } from '../models/tree-menu-item';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { Router } from '@angular/router';
import { TreeMenuV3Service } from '../services/tree-menu-v3.service';

@Component({
  standalone: true,
  selector: 'app-tree-menu-v3',
  templateUrl: './tree-menu-v3.html',
  styleUrls: ['./tree-menu-v3.css'],
  styles: [
    `
      [nz-menu] {
        width: 240px;
        overflow-x: hidden;
      }
    `
  ],
  imports: [NzMenuModule, CommonModule],
})
export class TreeMenuV3Component implements OnInit {
  @Input() items: TreeMenuItem[] = [];

  constructor(private router: Router, private service: TreeMenuV3Service) {}

  trackByKey(_: number, item: TreeMenuItem) {
    return item.key;
  }

  ngOnInit(): void {
    this.itemsSetup();
  }

  itemsSetup() {
    this.items = [
      {
        key: 1,
        label: 'Viajes',
        icon: 'truck',
        children: [
          {
            key: 2,
            label: 'Gestion de Viajes',
            icon: 'truck',
            onClick: () => {
              this.router.navigate(['viajes/gestion-viajes']);
            },
          },
          {
            key: 3,
            label: 'Clientes',
            onClick: () => {
              this.router.navigate(['/gestion-clientes']);
            },
          },
          {
            key: 4,
            label: 'Reportes',
            onClick: () => {
              this.router.navigate(['/reportes-viajes']);
            },
          },
        ],
      },
      {
        key: 5,
        label: 'Mantenimiento',
        children: [
          {
            key: 6,
            label: 'Gestion de Mantenimiento',
            onClick: () => {
              this.router.navigate(['/gestion-mantenimiento']);
            },
          },
          {
            key: 7,
            label: 'Compra de Repuestos',
            onClick: () => {
              this.router.navigate(['/compra-repuestos']);
            },
          },
          {
            key: 8,
            label: 'Talleres',
            onClick: () => {
              this.router.navigate(['/talleres']);
            },
          },
          {
            key: 9,
            label: 'Proveedores',
            onClick: () => {
              this.router.navigate(['/proveedores']);
            },
          },
        ],
      },
      {
        key: 10,
        label: 'Finanzas',
        children: [
          {
            key: 11,
            label: 'Gestion de Pagos',
            onClick: () => {
              this.router.navigate(['/gestion-pagos']);
            },
          },
          {
            key: 12,
            label: 'Gestion de Cobros',
            onClick: () => {
              this.router.navigate(['/gestion-cobros']);
            },
          },
          {
            key: 13,
            label: 'Cheques Emitidos',
            onClick: () => {
              this.router.navigate(['/cheques-emitidos']);
            },
          },
        ],
      },
      {
        key: 10,
        label: 'Generales',
        children: [
          {
            key: 11,
            label: 'Maestro de Localidades',
            onClick: () => {
              this.router.navigate(['generales/gestion-localidad']);
            },
          },
          {
            key: 12,
            label: 'Maestro de Provincias',
            onClick: () => {
              this.router.navigate(['generales/gestion-provincia']);
            },
          },
        ],
      },
      {
        key: 14,
        label: 'Configuraciones',
        icon: 'setting',
        onClick: () => {
          this.router.navigate(['/configuracion']);
        },
      },
    ];
  }

  logout() {
    this.service.logout();
  }
}
