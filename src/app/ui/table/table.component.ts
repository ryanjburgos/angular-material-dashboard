import { Component, Input, OnInit } from '@angular/core';
import { TableItemModel } from '../../shared/models/table-item.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() dataSource!: TableItemModel[];
  @Input() displayedColumns!: string[];

  constructor() {}

  ngOnInit(): void {}
}
