import { IQuery } from '@nestjs/cqrs';

export interface GetByCpfPayload {
  readonly cpf: string;
}

export class GetByCpfQuery implements IQuery {
  constructor(public readonly payload: GetByCpfPayload) {}
}
