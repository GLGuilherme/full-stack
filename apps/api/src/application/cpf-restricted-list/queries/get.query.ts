import { IQuery } from '@nestjs/cqrs';

export interface GetPayload {
  readonly page: number;
  readonly perPage: number;
}

export class GetQuery implements IQuery {
  constructor(public readonly payload: GetPayload) {}
}
