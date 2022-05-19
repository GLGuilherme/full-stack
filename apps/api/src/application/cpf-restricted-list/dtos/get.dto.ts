export class GetDto {
  items: Array<{
    id: string;
    cpf: string;
    createdAt: Date;
  }>;
  page: number;
  perPage: number;
  total: number;
}
