export class BaseApiResponse {
  constructor(
    public valid: boolean,
    public data?: any,
    public message?: any
  ) { }

}
