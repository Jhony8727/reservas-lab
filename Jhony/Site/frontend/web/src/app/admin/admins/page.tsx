"use client";

import { useEffect, useState } from "react";
import { ShieldPlus, Trash2 } from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchUsuarios } from "@/lib/services";
import type { Usuario } from "@/lib/types";

export default function AdminsPage() {
  const [admins, setAdmins] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetchUsuarios()
      .then((data) => {
        if (active)
          setAdmins(data.filter((usuario) => usuario.tipo === "admin"));
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <AppShell role="admin" title="Administradores">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Lista de administradores</CardTitle>
          <div className="flex items-center gap-2">
            <Input placeholder="Adicionar usuário" className="w-52" />
            <Button>
              <ShieldPlus className="mr-2 h-4 w-4" /> Adicionar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">
              Carregando administradores...
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>Ação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {admins.map((admin) => (
                  <TableRow key={admin.id}>
                    <TableCell>{admin.nome}</TableCell>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell>
                      <Button variant="danger" size="sm">
                        <Trash2 className="mr-1 h-4 w-4" /> Remover
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
