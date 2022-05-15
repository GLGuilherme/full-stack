import { PartialType } from '@nestjs/mapped-types';
import { CreateCpfDto } from './createCpf.dto';

export class UpdateCpfDto extends PartialType(CreateCpfDto) {}
