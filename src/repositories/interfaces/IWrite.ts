export interface IWrite<T> {
  create(item: T): Promise<any>;
  delete(id: number): Promise<boolean>;
}
