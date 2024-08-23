class IPaginatedResponse<T> {
  results: T[];
  total: number;
  page: number;
  limit: number;

  constructor(results: T[], total: number, page: number, limit: number) {
    this.results = results;
    this.total = total;
    this.page = page;
    this.limit = limit;
  }
}

export { IPaginatedResponse };
