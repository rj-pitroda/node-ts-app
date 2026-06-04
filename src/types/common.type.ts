export type TApiResponse<T = unknown> = {
  isSuccess: boolean;
  message?: string;
  statusCode: number;
  data?: T;
  stack?: string;
};

export type TUserRequest = {
  id: number;
  email: string;
};
