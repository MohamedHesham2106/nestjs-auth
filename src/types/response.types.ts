import { Response } from 'express';
import { TSafeUser } from './user.types';

export type TResponse<T> = {
  readonly status: number;
  readonly message: string;
  readonly data: T;
};

export type TResponseWithUser = Response & {
  readonly user: TSafeUser;
};
