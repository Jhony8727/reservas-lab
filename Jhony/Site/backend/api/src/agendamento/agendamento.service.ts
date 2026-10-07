import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAgendamentoDto, UpdateAgendamentoStatusDto } from './dto/agendamento.dto';

@Injectable()
export class AgendamentoService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    const agendamentos = await this.prismaService.agendamento.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        usuario: true,
        laboratorio: true,
      },
    });

    return agendamentos.map((agendamento) => this.mapAgendamento(agendamento));
  }

  async findByUser(userId: string) {
    const agendamentos = await this.prismaService.agendamento.findMany({
      where: { usuarioId: userId },
      orderBy: { createdAt: 'desc' },
      include: { laboratorio: true },
    });

    return agendamentos.map((agendamento) => this.mapAgendamento(agendamento));
  }

  async findById(agendamentoId: string) {
    const agendamento = await this.prismaService.agendamento.findUnique({
      where: { id: agendamentoId },
      include: { usuario: true, laboratorio: true },
    });

    if (!agendamento) {
      throw new NotFoundException('Agendamento não encontrado.');
    }

    return this.mapAgendamento(agendamento);
  }

  async create(userId: string, createAgendamentoDto: CreateAgendamentoDto) {
    const laboratorio = await this.prismaService.laboratorio.findUnique({
      where: { id: createAgendamentoDto.laboratorioId },
    });

    if (!laboratorio) {
      throw new NotFoundException('Laboratório informado não existe.');
    }

    const usuario = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    const existing = await this.prismaService.agendamento.findFirst({
      where: {
        usuarioId: userId,
        data: createAgendamentoDto.data,
        periodo: createAgendamentoDto.periodo,
        horaInicio: createAgendamentoDto.horaInicio,
        horaFim: createAgendamentoDto.horaFim,
      },
    });

    if (existing) {
      throw new ConflictException('Você já possui um agendamento sobreposto neste horário.');
    }

    const agendamento = await this.prismaService.agendamento.create({
      data: {
        usuarioId: userId,
        laboratorioId: createAgendamentoDto.laboratorioId,
        computadorId: createAgendamentoDto.computadorId,
        data: createAgendamentoDto.data,
        periodo: createAgendamentoDto.periodo,
        horaInicio: createAgendamentoDto.horaInicio,
        horaFim: createAgendamentoDto.horaFim,
        finalidade: createAgendamentoDto.finalidade,
        precisaMonitor: createAgendamentoDto.precisaMonitor ?? false,
        foraDoExpediente: createAgendamentoDto.foraDoExpediente ?? false,
        ehEad: createAgendamentoDto.ehEad ?? false,
        status: 'pendente',
      },
      include: { laboratorio: true },
    });

    return this.mapAgendamento(agendamento);
  }

  async updateStatus(agendamentoId: string, updateAgendamentoStatusDto: UpdateAgendamentoStatusDto) {
    const agendamento = await this.prismaService.agendamento.findUnique({
      where: { id: agendamentoId },
    });

    if (!agendamento) {
      throw new NotFoundException('Agendamento não encontrado.');
    }

    const updated = await this.prismaService.agendamento.update({
      where: { id: agendamentoId },
      data: {
        status: updateAgendamentoStatusDto.status,
      },
      include: { laboratorio: true, usuario: true },
    });

    return this.mapAgendamento(updated);
  }

  private mapAgendamento(agendamento: {
    id: string;
    usuarioId: string;
    laboratorioId: string;
    computadorId?: string | null;
    data: string;
    periodo: 'manha' | 'tarde' | 'noite';
    horaInicio: string;
    horaFim: string;
    finalidade: string;
    precisaMonitor: boolean;
    foraDoExpediente: boolean;
    ehEad: boolean;
    status:
      | 'pendente'
      | 'aprovado'
      | 'recusado'
      | 'cancelado'
      | 'aguardando_confirmacao_cancelamento';
    aprovadoPor?: string | null;
    createdAt: Date;
    laboratorio?: { id: string; nome?: string } | null;
  }) {
    return {
      id: agendamento.id,
      usuarioId: agendamento.usuarioId,
      laboratorioId: agendamento.laboratorioId,
      computadorId: agendamento.computadorId ?? undefined,
      data: agendamento.data,
      periodo: agendamento.periodo,
      horaInicio: agendamento.horaInicio,
      horaFim: agendamento.horaFim,
      finalidade: agendamento.finalidade,
      precisaMonitor: agendamento.precisaMonitor,
      foraDoExpediente: agendamento.foraDoExpediente,
      ehEad: agendamento.ehEad,
      status: agendamento.status,
      aprovadoPor: agendamento.aprovadoPor ?? undefined,
      criadoEm: agendamento.createdAt.toISOString(),
      laboratorio: agendamento.laboratorio
        ? { id: agendamento.laboratorio.id, nome: agendamento.laboratorio.nome }
        : undefined,
    };
  }
}
