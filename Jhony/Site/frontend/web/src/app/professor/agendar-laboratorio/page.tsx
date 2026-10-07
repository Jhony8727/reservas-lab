"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { agendamentoProfessorSchema } from "@/lib/schemas";

export default function AgendarLaboratorioProfessorPage() {
  const form = useForm<z.infer<typeof agendamentoProfessorSchema>>({
    resolver: zodResolver(agendamentoProfessorSchema),
    defaultValues: {
      laboratorioId: "lab-info",
      data: "",
      periodo: "tarde",
      horaInicio: "13:00",
      horaFim: "16:00",
      finalidade: "Aula prática para turma.",
      precisaMonitor: true,
    },
    mode: "onChange",
  });

  return (
    <AppShell role="professor" title="Agendar laboratório">
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Calendário de reserva</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-7">
              {Array.from({ length: 7 }, (_, index) => (
                <div key={index} className="rounded-lg border border-border bg-muted/30 p-3 text-center text-sm">
                  {index + 1}
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
              Horários fixos bloqueados: aula de suporte e infraestrutura.
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nova reserva</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Laboratório</Label>
              <Select onValueChange={(value) => form.setValue("laboratorioId", value)} defaultValue={form.getValues("laboratorioId")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lab-redes">Lab. Redes</SelectItem>
                  <SelectItem value="lab-info">Lab. Informática</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Data</Label>
                <Input type="date" {...form.register("data")} />
              </div>
              <div className="space-y-2">
                <Label>Período</Label>
                <Select onValueChange={(value) => form.setValue("periodo", value as "manha" | "tarde" | "noite")} defaultValue={form.getValues("periodo")}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manha">Manhã</SelectItem>
                    <SelectItem value="tarde">Tarde</SelectItem>
                    <SelectItem value="noite">Noite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-2"><Label>Início</Label><Input type="time" {...form.register("horaInicio")} /></div>
              <div className="space-y-2"><Label>Fim</Label><Input type="time" {...form.register("horaFim")} /></div>
            </div>
            <div className="space-y-2"><Label>Finalidade</Label><Input {...form.register("finalidade")} /></div>
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/20 dark:text-amber-200">
              A aprovação depende do monitor responsável quando o intervalo for fora do expediente padrão.
            </div>
            <Button className="w-full" type="button">Enviar solicitação</Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
