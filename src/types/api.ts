export interface IApiResponse<T> {
  date: T;
  message?: string;
  success?: boolean;
}
