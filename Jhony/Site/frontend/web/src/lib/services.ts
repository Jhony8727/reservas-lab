import {
  MOCK_AGENDAMENTOS,
  MOCK_LABORATORIOS,
  MOCK_NOTIFICACOES,
  MOCK_USUARIOS,
} from "@/lib/mock-data";
import { api } from "@/lib/api";
import type {
  Agendamento,
  Laboratorio,
  Notificacao,
  Usuario,
} from "@/lib/types";

const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

const useMockApi = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";

async function withFallback<T>(
  request: () => Promise<T>,
  fallback: T,
): Promise<T> {
  if (useMockApi) {
    await delay();
    return fallback;
  }

  try {
    return await request();
  } catch {
    await delay();
    return fallback;
  }
}

export async function fetchUsuarios(): Promise<Usuario[]> {
  return withFallback(() => api.get<Usuario[]>("/users"), MOCK_USUARIOS);
}

export async function fetchLaboratorios(): Promise<Laboratorio[]> {
  return withFallback(
    () => api.get<Laboratorio[]>("/laboratorios"),
    MOCK_LABORATORIOS,
  );
}

export async function fetchAgendamentos(): Promise<Agendamento[]> {
  return withFallback(
    () => api.get<Agendamento[]>("/agendamentos"),
    MOCK_AGENDAMENTOS,
  );
}

export async function fetchNotificacoes(): Promise<Notificacao[]> {
  return withFallback(
    () => api.get<Notificacao[]>("/notificacoes"),
    MOCK_NOTIFICACOES,
  );
}

export async function fetchDashboardData() {
  const [usuarios, laboratorios, agendamentos] = await Promise.all([
    fetchUsuarios(),
    fetchLaboratorios(),
    fetchAgendamentos(),
  ]);

  return { usuarios, laboratorios, agendamentos };
}
