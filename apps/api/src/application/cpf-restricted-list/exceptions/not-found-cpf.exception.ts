import { HttpStatus, NotFoundException } from '@nestjs/common';

export class NotFoundCpfException extends NotFoundException {
  constructor() {
    super({
      status: HttpStatus.NOT_FOUND,
      type: 'NotFoundCpfException',
      message: 'CPF not found.',
    });
  }
}
