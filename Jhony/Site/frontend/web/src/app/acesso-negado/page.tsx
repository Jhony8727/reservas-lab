import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AcessoNegadoPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <p className="text-xs uppercase tracking-[0.2em] text-red-500">Acesso negado</p>
          <CardTitle>Você não tem permissão para acessar esta área.</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">A rota solicitada não corresponde ao seu papel dentro do sistema.</p>
          <Link href="/login">
            <Button className="w-full">Voltar ao login</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
