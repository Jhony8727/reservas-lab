"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, LogOut, Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Sidebar } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { clearAuthSession } from "@/lib/api";
import { cn } from "@/lib/utils";

export function AppShell({
  role,
  children,
  title,
}: {
  role: "aluno" | "professor" | "admin" | "monitor";
  children: React.ReactNode;
  title: string;
}) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const handleLogout = () => {
    clearAuthSession();
    document.cookie = "lab_session=; path=/; max-age=0; SameSite=Lax";
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar role={role} />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-20 items-center justify-between border-b border-border bg-card/75 px-4 shadow-[0_10px_25px_rgba(15,23,42,0.04)] backdrop-blur-xl lg:px-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Sistema
              </p>
              <h1 className="text-xl font-semibold tracking-tight text-foreground">
                {title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 md:flex dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Operação em tempo real
            </div>
            <button
              className="relative rounded-full border border-border bg-background p-2.5 text-foreground shadow-sm transition hover:bg-muted"
              aria-label="Notificações"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                3
              </span>
            </button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              Sair <LogOut className="h-4 w-4" />
            </button>
          </div>
        </header>

        <main className={cn("flex-1 p-4 lg:p-6")}>{children}</main>
      </div>
    </div>
  );
}
