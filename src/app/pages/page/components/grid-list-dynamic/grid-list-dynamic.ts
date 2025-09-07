import {Component, Input} from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

/**
 * @title Dynamic grid-list
 */
@Component({
  selector: 'grid-list-dynamic',
  templateUrl: 'grid-list-dynamic.html',
  imports: [MatGridListModule],
})
export class GridListDynamic{
  @Input() tiles: Tile[] = [];
}