"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarCheck2, Clock3, FileText } from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchAgendamentos } from "@/lib/services";
import type { Agendamento } from "@/lib/types";

export default function ProfessorDashboardPage() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetchAgendamentos()
      .then((data) => {
        if (active) setAgendamentos(data);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const aprovados = useMemo(
    () => agendamentos.filter((item) => item.status === "aprovado").slice(0, 3),
    [agendamentos],
  );

  const proximo = useMemo(
    () => [...agendamentos].sort((a, b) => a.data.localeCompare(b.data))[0],
    [agendamentos],
  );

  return (
    <AppShell role="professor" title="Dashboard do professor">
      {loading ? (
        <p className="text-sm text-muted-foreground">
          Carregando dashboard do professor...
        </p>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" /> Solicitações
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold">{agendamentos.length}</p>
                <p className="text-sm text-muted-foreground">
                  Atividades registradas.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock3 className="h-5 w-5" /> Próximo agendamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">
                  {proximo ? proximo.data : "Sem agendamento"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {proximo
                    ? `${proximo.horaInicio} às ${proximo.horaFim}`
                    : "Sem dados"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarCheck2 className="h-5 w-5" /> Ações
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className="bg-emerald-100 text-emerald-700">
                  Fluxo ativo
                </Badge>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Agendamentos aprovados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {aprovados.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-lg border border-border p-3"
                  >
                    <div>
                      <p className="font-medium">{item.finalidade}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.data} · {item.horaInicio} às {item.horaFim}
                      </p>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-700">
                      Aprovado
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </AppShell>
  );
}
