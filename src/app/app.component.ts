import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TableTplModule } from 'noc/table';
import { NestedTableComponent, DetailItem } from './nested-table/nested-table.component';
import { GridColumn } from 'noc/table';

// 日期维度数据接口
export interface DateDimensionItem {
  date: string;
  totalCount: number;
  totalAmount: number;
  status: string;
  description?: string;
  detailData: DetailItem[]; // 明细数据
}

const DATE_DIMENSION_DATA: DateDimensionItem[] = [
  {
    date: '2024-01-15',
    totalCount: 150,
    totalAmount: 25000,
    status: '已完成',
    description: '一月十五日业务数据',
    detailData: [
      { type: '产品A', model: 'Model-A1', count: 50, amount: 5000, description: '高质量产品' },
      { type: '产品B', model: 'Model-B1', count: 80, amount: 12000, description: '标准型号' },
      { type: '服务C', model: 'Service-C1', count: 20, amount: 8000, description: '增值服务' }
    ]
  },
  {
    date: '2024-01-16',
    totalCount: 200,
    totalAmount: 30000,
    status: '进行中',
    description: '一月十六日业务数据',
    detailData: [
      { type: '产品A', model: 'Model-A2', count: 70, amount: 7000, description: '升级版本' },
      { type: '产品C', model: 'Model-C1', count: 90, amount: 15000, description: '新型产品' },
      { type: '服务D', model: 'Service-D1', count: 40, amount: 8000, description: '技术服务' }
    ]
  },
  {
    date: '2024-01-17',
    totalCount: 120,
    totalAmount: 20000,
    status: '已完成',
    description: '一月十七日业务数据',
    detailData: [
      { type: '产品B', model: 'Model-B2', count: 40, amount: 4000, description: '特价促销' },
      { type: '产品D', model: 'Model-D1', count: 60, amount: 12000, description: '热销产品' },
      { type: '服务A', model: 'Service-A1', count: 20, amount: 4000, description: '基础服务' }
    ]
  }
];
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TableTplModule, NestedTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-noc-final';
  
  // 使用GridColumn定义表格列 - 按需求调整为"空白+日期+总数量+状态"格式
  columns: GridColumn[] = [
    {
      field: '',
      header: '',
      // 不使用width属性，将通过CSS控制宽度
    },
    // 其他列定义保持不变
  ];

  // 表格数据
  data: DateDimensionItem[] = DATE_DIMENSION_DATA;

  constructor() {
    // 构造函数中可以初始化数据
  }

  // 获取状态样式类
  getStatusClass(status: string): string {
    const statusClassMap: { [key: string]: string } = {
      '已完成': 'status-completed',
      '进行中': 'status-in-progress', 
      '待处理': 'status-pending',
      '已取消': 'status-cancelled'
    };
    return statusClassMap[status] || 'status-default';
  }

  // 处理行展开/折叠事件
  onToggleRow(event: any) {
    console.log('Toggle row event:', event);
    // noc-table-tpl 组件会自动处理展开/折叠逻辑
    // 这里可以添加其他自定义逻辑，比如日志记录、状态更新等
  }
}