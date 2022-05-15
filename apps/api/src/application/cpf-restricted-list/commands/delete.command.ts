import { ICommand } from '@nestjs/cqrs';

export interface DeleteCpfCommandPayload {
  readonly cpf: string;
}

export class DeleteCpfCommand implements ICommand {
  constructor(public readonly payload: DeleteCpfCommandPayload) {}
}
