"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MonitorPlay, MonitorSmartphone } from "lucide-react";
import { z } from "zod";

import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { agendamentoAlunoSchema } from "@/lib/schemas";

const computadores = Array.from({ length: 12 }, (_, index) => `PC-${index + 1}`);

export default function AgendarComputadorPage() {
  const form = useForm<z.infer<typeof agendamentoAlunoSchema>>({
    resolver: zodResolver(agendamentoAlunoSchema),
    defaultValues: {
      laboratorioId: "lab-info",
      data: "",
      periodo: "manha",
      horaInicio: "09:00",
      horaFim: "11:00",
      finalidade: "",
      computadorId: "PC-03",
    },
    mode: "onChange",
  });

  return (
    <AppShell role="aluno" title="Agendar computador">
      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Seleção de computador</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-3">
              {computadores.map((pc) => (
                <button
                  key={pc}
                  type="button"
                  className={`rounded-lg border p-3 text-center text-sm ${form.watch("computadorId") === pc ? "border-primary bg-primary/10" : "border-border bg-card"}`}
                  onClick={() => form.setValue("computadorId", pc)}
                >
                  <MonitorSmartphone className="mx-auto mb-2 h-5 w-5" />
                  {pc}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detalhes da solicitação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Laboratório</Label>
              <Select onValueChange={(value) => form.setValue("laboratorioId", value)} defaultValue={form.getValues("laboratorioId")}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lab-info">LABORATÓRIO FAP — Informática</SelectItem>
                  <SelectItem value="lab-redes">LABORATÓRIO FAP — Redes</SelectItem>
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
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manha">Manhã</SelectItem>
                    <SelectItem value="tarde">Tarde</SelectItem>
                    <SelectItem value="noite">Noite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Início</Label>
                <Input type="time" {...form.register("horaInicio")} />
              </div>
              <div className="space-y-2">
                <Label>Fim</Label>
                <Input type="time" {...form.register("horaFim")} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Finalidade</Label>
              <Input {...form.register("finalidade")} placeholder="Descreva o motivo do uso" />
            </div>

            <div className="rounded-lg border border-dashed border-border bg-muted/30 p-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 font-medium text-foreground"><MonitorPlay className="h-4 w-4" /> Necessidade de monitor</div>
              <p className="mt-2">Se o horário estiver fora do expediente (08:00–22:00), a solicitação depende de aprovação do monitor.</p>
            </div>

            <Button className="w-full" type="button">Enviar agendamento</Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
