import { FlatTreeControl } from '@angular/cdk/tree';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
  MatTreeModule,
} from '@angular/material/tree';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';


export interface MenuNode {
  name: string;
  children?: MenuNode[];
  onClick?: () => void;
  icon?: 
   'home' |
   'book' |
   'bookmark' |
   'bug_report' | 
   'build' |
   'cached' |
   'check_cicrcle' |
   'class' |
   'credit_card' |
   'date_range' | 
   'delete' |
   'description' |
   'event' |
   'extension' |
   'help' |
   'info' |
   'shopping_cart' |
   'timeline' |
   'local_shipping' |
   'person_pin' |
   'insert_drive_file' |
   'settings';
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  onClick?: () => void;
  icon?: string
}

@Component({
  standalone: true,
  selector: 'app-tree-menu',
  templateUrl: './tree-menu.html',
  styleUrl: './tree-menu.css',
  imports: [MatTreeModule, MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('expandCollapse', [
      state(
        'collapsed',
        style({
          height: '0px',
          opacity: 0,
          overflow: 'hidden',
        })
      ),
      state(
        'expanded',
        style({
          height: '*',
          opacity: 1,
        })
      ),
      transition('expanded <=> collapsed', animate('250ms ease')),
    ]),
  ],
})
export class TreeMenuComponent implements OnInit {
  private config: MenuNode[];
  //
  private _transformer = (node: MenuNode, level: number): ExampleFlatNode => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      onClick: node.onClick,
      icon: node.icon
    };
  };

  public treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  private treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  public dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.config = [
      {
        name: 'Viajes',
        children: [
          {
            name: 'Gestion de Viajes',
            onClick: () => {
              this.router.navigate(['/gestion-viajes']);
            },
            icon: 'local_shipping'
          },
          {
            name: 'Clientes',
            onClick: () => {
              this.router.navigate(['/gestion-clientes']);
            },
            icon: 'person_pin'
          },
          {
            name: 'Reportes',
            onClick: () => {
              this.router.navigate(['/reportes-viajes']);
            },
            icon: 'insert_drive_file'
          },
        ],
      },
      {
        name: 'Mantenimiento',
        children: [
          {
            name: 'Gestion de Mantenimiento',
            onClick: () => {
              this.router.navigate(['/gestion-mantenimiento']);
            },
          },
          {
            name: 'Compra de Repuestos',
            onClick: () => {
              this.router.navigate(['/compra-repuestos']);
            },
          },
          {
            name: 'Talleres',
            onClick: () => {
              this.router.navigate(['/talleres']);
            },
          },
          {
            name: 'Proveedores',
            onClick: () => {
              this.router.navigate(['/proveedores']);
            },
          },
        ],
      },
      {
        name: 'Finanzas',
        children: [
          {
            name: 'Gestion de Pagos',
            onClick: () => {
              this.router.navigate(['/gestion-pagos']);
            },
          },
          {
            name: 'Gestion de Cobros',
            onClick: () => {
              this.router.navigate(['/gestion-cobros']);
            },
          },
          {
            name: 'Cheques Emitidos',
            onClick: () => {
              this.router.navigate(['/cheques-emitidos']);
            },
          },
        ],
      },
      {
        name: 'Configuraciones',
        onClick: () => {
            this.router.navigate(['/configuraciones']);
        },
        icon: 'settings'
      }
    ];

    this.dataSource.data = this.config;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
