"use client";

import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CalendarioAdminPage() {
  return (
    <AppShell role="admin" title="Calendário administrativo">
      <Card>
        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <CardTitle>Calendário da semana</CardTitle>
          <Select defaultValue="lab-redes">
            <SelectTrigger className="w-full md:w-56">
              <SelectValue placeholder="Selecione laboratório" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lab-redes">LABORATÓRIO FAP — Redes</SelectItem>
              <SelectItem value="lab-info">LABORATÓRIO FAP — Informática</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-7">
            {Array.from({ length: 7 }, (_, index) => (
              <div key={index} className="rounded-lg border border-border bg-muted/40 p-3">
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">Dia {index + 1}</p>
                <div className="space-y-2">
                  <div className="rounded-md border border-emerald-300 bg-emerald-100 p-2 text-xs text-emerald-800">Livre</div>
                  <div className="rounded-md border border-red-300 bg-red-100 p-2 text-xs text-red-800">Reservado</div>
                  <div className="rounded-md border border-amber-300 bg-amber-100 p-2 text-xs text-amber-800">Aula fixa</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AppShell>
  );
}
