import { ConflictException } from '@nestjs/common';

export class ExistsCpfException extends ConflictException {
  constructor() {
    super('CPF já existente!');
  }
}
