import { Link } from "@tanstack/react-router";
import { Menu, Phone } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SHOP_NAME, SHOP_PHONE } from "@/lib/shop";
import { ThemeToggle } from "./ThemeToggle";

const LINKS = [
  { to: "/", label: "Início" },
  { to: "/precos", label: "Preços" },
  { to: "/sobre", label: "Sobre" },
  { to: "/area-cliente", label: "Área do cliente" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
      <nav aria-label="Navegação principal" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-semibold">
          <img src="/favicon.png" alt="" width={28} height={28} />
          {SHOP_NAME}
        </Link>
        <ul className="hidden items-center gap-6 md:flex">
          {LINKS.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
                activeOptions={{ exact: true }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1">
          <a href={`tel:${SHOP_PHONE.replace(/\s/g, "")}`} className="mr-2 hidden items-center gap-1 text-sm text-muted-foreground lg:flex">
            <Phone className="h-4 w-4" /> {SHOP_PHONE}
          </a>
          <ThemeToggle />
          <Button asChild className="hidden md:inline-flex">
            <Link to="/marcar">Marcar serviço</Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle className="font-display">{SHOP_NAME}</SheetTitle>
              <ul className="mt-6 flex flex-col gap-4">
                {[...LINKS, { to: "/marcar", label: "Marcar serviço" } as const].map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} onClick={() => setOpen(false)} className="text-lg font-medium">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
