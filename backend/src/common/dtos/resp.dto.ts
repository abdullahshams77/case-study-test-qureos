export class RespDto<T> {
    data?: string; // Assume data is stored as a JSON string
    constructor(data?: T) {
      if (data) {
        this.data = JSON.stringify(data); // Automatically stringify data to JSON if provided
      }
    }
    getParsedData(): T | undefined {
      if (this.data) {
        return JSON.parse(this.data) as T;
      }
      return undefined;
    }
  }