import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeMenuItem } from '../models/tree-menu-item';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { MatIconModule } from "@angular/material/icon";
import { ICONS } from 'lib-core';

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
  imports: [NzMenuModule, CommonModule, MatIconModule],
})
export class TreeMenuV3Component {
  @Input() items: TreeMenuItem[] = [];

  @Output()
  onSalir = new EventEmitter();
  ICONS = ICONS

  trackByKey(_: number, item: TreeMenuItem) {
    return item.key;
  }

  salir() {
    this.onSalir.emit();
  }
}
