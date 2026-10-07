"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
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
import { fetchLaboratorios } from "@/lib/services";
import type { Laboratorio } from "@/lib/types";

export default function LaboratoriosPage() {
  const [laboratorios, setLaboratorios] = useState<Laboratorio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetchLaboratorios()
      .then((data) => {
        if (active) setLaboratorios(data);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <AppShell role="admin" title="Laboratórios">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Gerenciar laboratórios</CardTitle>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Novo laboratório
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">
              Carregando laboratórios...
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Capacidade</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {laboratorios.map((laboratorio) => (
                  <TableRow key={laboratorio.id}>
                    <TableCell>{laboratorio.nome}</TableCell>
                    <TableCell>{laboratorio.tipo}</TableCell>
                    <TableCell>{laboratorio.capacidade}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="danger" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
