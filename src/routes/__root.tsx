import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";

const THEME_SCRIPT = `try{var t=localStorage.getItem("oficina-lume:theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`;

function NotFoundComponent() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-8xl font-semibold text-primary">404</p>
      <h1 className="mt-4 text-2xl font-semibold">Saiu da estrada</h1>
      <p className="mt-2 text-muted-foreground">Esta página não existe ou mudou de sítio. Vamos pô-lo de volta no caminho certo.</p>
      <Button asChild className="mt-6"><Link to="/">Voltar ao início</Link></Button>
    </section>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-semibold">Esta página não carregou</h1>
      <p className="mt-2 text-muted-foreground">Algo correu mal. Tente novamente.</p>
      <Button className="mt-6" onClick={() => { router.invalidate(); reset(); }}>Tentar novamente</Button>
    </section>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Oficina Lume — Reparação de bicicletas em Lisboa" },
      { name: "description", content: "Oficina de reparação de bicicletas na Graça, Lisboa." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_PT" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Manrope:wght@400;500;600;700&display=swap" },
    ],
    scripts: [{ children: THEME_SCRIPT }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-PT" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">Saltar para o conteúdo</a>
      <Navbar />
      <main id="conteudo">
        <Outlet />
      </main>
      <Footer />
      <Toaster richColors position="top-center" />
    </QueryClientProvider>
  );
}
