export interface TableItemModel {
  [key: string]: TableColumnModel;
}

export interface TableColumnModel {
  label: string;
  value: any;
}
