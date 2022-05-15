import { ICommand } from '@nestjs/cqrs';

export interface UpdateCpfCommandPayload {
  readonly id: string;
  readonly cpf: string;
}

export class UpdateCpfCommand implements ICommand {
  constructor(public readonly payload: UpdateCpfCommandPayload) {}
}
