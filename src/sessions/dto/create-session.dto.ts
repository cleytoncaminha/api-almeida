import { IsString, IsDate, IsOptional } from 'class-validator';

export class CreateSessionDto {
  @IsString()
  name: string; // Nome do Evento

  @IsDate()
  startDate: Date; // Data Início

  @IsString()
  time: string; // Horário

  @IsOptional()
  @IsDate()
  endDate: Date; // Data Fim

  @IsString()
  location: string; // Local

  @IsString()
  description: string; // Descrição

  @IsString()
  link: string; // Link (opcional)
}
