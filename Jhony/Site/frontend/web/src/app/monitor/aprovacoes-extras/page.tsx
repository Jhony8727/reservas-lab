"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Check, X } from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchAgendamentos } from "@/lib/services";
import type { Agendamento } from "@/lib/types";

export default function MonitorAprovacoesPage() {
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

  const fila = agendamentos.filter(
    (item) => item.foraDoExpediente && item.status === "pendente",
  );

  return (
    <AppShell role="monitor" title="Aprovações extras">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" /> Solicitações
            fora do expediente
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">
              Carregando aprovações extras...
            </p>
          ) : (
            <div className="space-y-3">
              {fila.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-3 rounded-lg border border-border p-3 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <p className="font-medium">{item.finalidade}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.data} · {item.horaInicio} até {item.horaFim}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-amber-100 text-amber-800">
                      Pendente
                    </Badge>
                    <Button variant="success" size="sm">
                      <Check className="mr-1 h-4 w-4" /> Aprovar
                    </Button>
                    <Button variant="danger" size="sm">
                      <X className="mr-1 h-4 w-4" /> Recusar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </AppShell>
  );
}
