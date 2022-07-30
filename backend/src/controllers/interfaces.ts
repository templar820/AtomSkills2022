export interface ASController<T> {
  statusCode: number;
  isError: boolean;
  message: string;
  data: T[]
}
