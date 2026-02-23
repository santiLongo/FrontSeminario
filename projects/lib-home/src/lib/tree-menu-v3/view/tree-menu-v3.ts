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
    `,
  ],
  imports: [NzMenuModule, CommonModule],
})
export class TreeMenuV3Component implements OnInit {
  @Input() items: TreeMenuItem[] = [];

  constructor(
    private router: Router,
    private service: TreeMenuV3Service,
  ) {}

  trackByKey(_: number, item: TreeMenuItem) {
    return item.key;
  }

  ngOnInit(): void {
    this.itemsSetup();
  }

  itemsSetup() {
    this.items = [
      {
        key: 'viajes',
        label: 'Viajes',
        icon: 'truck',
        children: [
          {
            key: 'viajes-gestion',
            label: 'Gestion de Viajes',
            icon: 'truck',
            onClick: () => this.router.navigate(['viajes/gestion-viajes']),
          },
          {
            key: 'viajes-clientes',
            label: 'Clientes',
            onClick: () => this.router.navigate(['/gestion-clientes']),
          },
          {
            key: 'viajes-choferes',
            label: 'Choferes',
            onClick: () => this.router.navigate(['viajes/gestion-choferes']),
          },
        ],
      },
      {
        key: 'mantenimiento',
        label: 'Mantenimiento',
        children: [
          {
            key: 'mantenimiento-gestion',
            label: 'Gestion de Mantenimiento',
            onClick: () => this.router.navigate(['mantenimiento/gestion-mantenimiento']),
          },
          {
            key: 'mantenimiento-repuestos',
            label: 'Compra de Repuestos',
            onClick: () => this.router.navigate(['/compra-repuestos']),
          },
          {
            key: 'mantenimiento-talleres',
            label: 'Talleres',
            onClick: () => this.router.navigate(['mantenimiento/talleres']),
          },
          {
            key: 'mantenimiento-proveedores',
            label: 'Proveedores',
            onClick: () => this.router.navigate(['mantenimiento/proveedores']),
          },
        ],
      },
      {
        key: 'finanzas',
        label: 'Finanzas',
        children: [
          {
            key: 'finanzas-pagos',
            label: 'Gestion de Pagos',
            onClick: () => this.router.navigate(['/gestion-pagos']),
          },
          {
            key: 'finanzas-cobros',
            label: 'Gestion de Cobros',
            onClick: () => this.router.navigate(['finanzas/gestion-cobros']),
          },
          {
            key: 'finanzas-cheques',
            label: 'Cheques Emitidos',
            onClick: () => this.router.navigate(['/cheques-emitidos']),
          },
        ],
      },
      {
        key: 'generales',
        label: 'Generales',
        children: [
          {
            key: 'generales-localidades',
            label: 'Maestro de Localidades',
            onClick: () =>
              this.router.navigate(['generales/gestion-localidad']),
          },
          {
            key: 'generales-camiones',
            label: 'Maestro de Camiones',
            onClick: () => this.router.navigate(['generales/gestion-camiones']),
          },
        ],
      },
      {
        key: 'configuracion',
        label: 'Configuraciones',
        icon: 'setting',
        onClick: () => this.router.navigate(['/configuracion']),
      },
    ];
  }

  logout() {
    this.service.logout();
  }
}
