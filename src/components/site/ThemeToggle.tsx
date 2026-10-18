import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export const THEME_KEY = "oficina-lume:theme";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(document.documentElement.classList.contains("dark")), []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem(THEME_KEY, next ? "dark" : "light");
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggle} aria-label={dark ? "Mudar para modo claro" : "Mudar para modo escuro"}>
      {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}
