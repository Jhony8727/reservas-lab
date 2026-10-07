"use client";

import { useEffect, useState } from "react";
import { Check, Clock3, X } from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchAgendamentos } from "@/lib/services";
import type { Agendamento } from "@/lib/types";

export default function AprovacoesPage() {
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
    <AppShell role="admin" title="Aprovações">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock3 className="h-5 w-5" /> Fila de solicitações
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">
              Carregando aprovações...
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agendamentos
                  .filter((item) => item.status === "pendente")
                  .map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.usuarioId}</TableCell>
                      <TableCell>{item.data}</TableCell>
                      <TableCell>{item.ehEad ? "EAD" : "Normal"}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            item.ehEad
                              ? "bg-violet-100 text-violet-800"
                              : "bg-amber-100 text-amber-800"
                          }
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="success" size="sm">
                            <Check className="mr-1 h-4 w-4" /> Aprovar
                          </Button>
                          <Button variant="danger" size="sm">
                            <X className="mr-1 h-4 w-4" /> Recusar
                          </Button>
                        </div>
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
