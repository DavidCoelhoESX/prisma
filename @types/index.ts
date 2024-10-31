export type Person = {
  name: string;
  email: string;
  age: number;
};

export type SuccessResult = {
  status: 200;
  body: Person;
};

export type ErrorResult = {
  status: Exclude<number, 201>;
  body: string;
};

export type Result = SuccessResult | ErrorResult;
