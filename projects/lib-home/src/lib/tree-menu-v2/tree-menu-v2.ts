import { Component, OnInit } from '@angular/core';
import { ReactComponentDirective } from 'lib-core';
import type { MenuProps } from 'antd';
import { TreeMenuV2, TreeMenuV2Props } from './react-component/tree-menu-v2';
import {
  AppstoreOutlined,
  TruckOutlined,
} from '@ant-design/icons';
import { Router } from '@angular/router';

type MenuItem = Required<MenuProps>['items'][number];

@Component({
  standalone: true,
  selector: 'app-tree-menu-v2',
  imports: [ReactComponentDirective],
  template:
    '<div class="content"><div [reactComponent]="component" [props]="props"></div></div>',
})
export class TreeMenuV2Component implements OnInit {
  public component = TreeMenuV2;
  public props: TreeMenuV2Props;

  constructor(private router: Router) {}

  ngOnInit() {
    this.props = {
      items: [
        {
          key: 1,
          label: 'Viajes',
          icon: AppstoreOutlined,
          children: [
            {
              key: 2,
              label: 'Gestion de Viajes',
              icon: TruckOutlined,
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
          key: 14,
          label: 'Configuraciones',
          onClick: () => {
            this.router.navigate(['/configuracion']);
          },
        },
      ],
    };
  }
}
