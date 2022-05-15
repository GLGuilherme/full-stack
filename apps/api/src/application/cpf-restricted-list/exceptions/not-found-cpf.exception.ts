import { NotFoundException } from '@nestjs/common';

export class NotFoundCpfException extends NotFoundException {
  constructor() {
    super('CPF não encontrado!');
  }
}
