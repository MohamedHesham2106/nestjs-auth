type User = {
  readonly id: string;
  readonly email: string;
  readonly password: string;
  readonly fullName: string;
  readonly age: number;
  readonly mobileNumber: string;
};
export type TSafeUser = Omit<User, 'password'>;
