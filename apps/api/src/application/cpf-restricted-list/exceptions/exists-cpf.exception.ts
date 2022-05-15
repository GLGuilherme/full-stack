import { ConflictException, HttpStatus } from '@nestjs/common';

export class ExistsCpfException extends ConflictException {
  constructor() {
    super({
      status: HttpStatus.CONFLICT,
      type: 'ExistsCpfException',
      message: 'CPF already exists.',
    });
  }
}
