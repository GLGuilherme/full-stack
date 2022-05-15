import { ICommand } from '@nestjs/cqrs';

export interface CreateCpfCommandPayload {
  readonly cpf: string;
}

export class CreateCpfCommand implements ICommand {
  constructor(public readonly payload: CreateCpfCommandPayload) {}
}
