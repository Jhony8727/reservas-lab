import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAgendamentoDto {
  @IsNotEmpty()
  @IsString()
  laboratorioId: string;

  @IsOptional()
  @IsString()
  computadorId?: string;

  @IsNotEmpty()
  @IsDateString()
  data: string;

  @IsNotEmpty()
  @IsEnum(['manha', 'tarde', 'noite'])
  periodo: 'manha' | 'tarde' | 'noite';

  @IsNotEmpty()
  @IsString()
  horaInicio: string;

  @IsNotEmpty()
  @IsString()
  horaFim: string;

  @IsNotEmpty()
  @IsString()
  finalidade: string;

  @IsOptional()
  @IsBoolean()
  precisaMonitor?: boolean;

  @IsOptional()
  @IsBoolean()
  foraDoExpediente?: boolean;

  @IsOptional()
  @IsBoolean()
  ehEad?: boolean;
}

export class UpdateAgendamentoStatusDto {
  @IsNotEmpty()
  @IsEnum(['pendente', 'aprovado', 'recusado', 'cancelado', 'aguardando_confirmacao_cancelamento'])
  status:
    | 'pendente'
    | 'aprovado'
    | 'recusado'
    | 'cancelado'
    | 'aguardando_confirmacao_cancelamento';

  @IsOptional()
  @IsString()
  observacao?: string;
}
