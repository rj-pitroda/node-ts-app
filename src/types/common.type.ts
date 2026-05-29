export type TApiResponse<T = unknown> = {
  isSuccess: boolean;
  message?: string;
  statusCode: number;
  data?: T;
  stack?: string;
};
