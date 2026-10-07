"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppShell } from "@/components/layout/app-shell";
import { fetchAgendamentos } from "@/lib/services";
import type { Agendamento } from "@/lib/types";

export default function MinhasSolicitacoesAlunoPage() {
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

  return (
    <AppShell role="aluno" title="Minhas solicitações">
      <Card>
        <CardHeader>
          <CardTitle>Histórico</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">
              Carregando solicitações...
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Laboratório</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Finalidade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agendamentos.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.data}</TableCell>
                    <TableCell>{item.laboratorioId}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          item.status === "pendente"
                            ? "bg-amber-100 text-amber-800"
                            : item.status === "aprovado"
                              ? "bg-emerald-100 text-emerald-800"
                              : item.status === "cancelado"
                                ? "bg-slate-200 text-slate-800"
                                : "bg-red-100 text-red-800"
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      {item.finalidade}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </AppShell>
  );
}
