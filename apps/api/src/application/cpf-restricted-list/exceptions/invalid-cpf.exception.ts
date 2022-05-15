import { BadRequestException, HttpStatus } from '@nestjs/common';

export class InvalidCpfException extends BadRequestException {
  constructor() {
    super({
      status: HttpStatus.BAD_REQUEST,
      type: 'InvalidCpfException',
      message: 'CPF is not valid.',
    });
  }
}
