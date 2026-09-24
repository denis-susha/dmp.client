export interface ITableQuery {
    pagination: IPaginationApiModel;
    sorting?: ISortApiModel[];
    filters?: IFilterApiModel[];
}

export interface ISortApiModel {
    field: string;
    sort: string;
}

export interface IPaginationApiModel {
    page: number;
    pageSize: number;
}

export interface IFilterApiModel {
    field: string;
    value: string;
}
