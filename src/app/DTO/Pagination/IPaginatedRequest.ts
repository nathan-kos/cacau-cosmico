class IPaginationRequest<T> {
  page: number;
  limit: number;
  filter?: Partial<T>;

  constructor(page: number, limit: number, filter?: Partial<T>) {
    this.page = page;
    this.limit = limit;
    this.filter = filter;
  }
}

export { IPaginationRequest };
