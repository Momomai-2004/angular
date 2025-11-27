import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableTplModule } from 'noc/table';
import { GridColumn } from 'noc/table';

export interface DetailItem {
  type: string;
  model: string;
  count: number;
  amount: number;
  description?: string;
}

@Component({
  selector: 'app-nested-table',
  standalone: true,
  imports: [CommonModule, TableTplModule],
  templateUrl: './nested-table.component.html',
  styleUrl: './nested-table.component.scss'
})
export class NestedTableComponent {
  @Input() dateData!: any; // 接收父父组件传递的日期数据
  @Input() detailData!: DetailItem[]; // 接收明细数据
  
  // 表格列定义
  columns: GridColumn[] = [
    {
      field: 'type',
      header: '类型',
      sort: true
    },
    {
      field: 'model',
      header: '模型',
      sort: true
    },
    {
      field: 'count',
      header: '数量',
      sort: true
    },
    {
      field: 'amount',
      header: '金额',
      sort: true,
      render: (row: DetailItem, column: GridColumn, index: number) => {
        return new Intl.NumberFormat('zh-CN', {
          style: 'currency',
          currency: 'CNY'
        }).format(row.amount);
      }
    },
    {
      field: 'description',
      header: '描述',
      sort: true
    }
  ];

  // 表格数据
  data: DetailItem[] = [];

  ngOnInit() {
    if (this.detailData) {
      this.data = this.detailData;
    }
  }
}
