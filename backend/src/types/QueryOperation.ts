import { By } from "./By";

 export enum QueryOperation {
  FILTER = "filter",
  SORT = "sort",
  SLICE = "slice",
}

 export interface FilterOperation {
  type: QueryOperation.FILTER;
  by: By;
  value: string;
}

export  interface SortOperation {
  type: QueryOperation.SORT;
  by: By;
  order?: 'asc' | 'desc';
}

export interface SliceOperation {
  type: QueryOperation.SLICE;
  offset: number;
  limit: number;
}


export interface TaskQueryOperations {
  filter?: FilterOperation[]; // We can filter by multiple columns
  sort?: SortOperation;
  slice?: SliceOperation;
}

/*
EXAMPLE:
const criteria: TaskQueryOperations = {
  filter: {
    type: QueryOperation.FILTER,
    by: By.TASK_STATUS,
    value: "finished",
  },
  sort: {
    type: QueryOperation.SORT,
    by: By.TASK_CREATION_DATE,
    order: "desc",
  },
  slice: {
    type: QueryOperation.SLICE,
    offset: 10,
    limit: 5,
  }
};*/
