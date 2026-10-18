import { createFileRoute } from "@tanstack/react-router";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import map from "@/assets/map.jpg";
import { pageMeta } from "@/lib/seo";
import { HOURS, SHOP_ADDRESS, SHOP_NAME } from "@/lib/shop";

export const Route = createFileRoute("/sobre")({
  head: () => ({ meta: pageMeta("Sobre nós — Oficina Lume", "Conheça a equipa da Oficina Lume, onde estamos na Graça e o nosso horário.") }),
  component: Sobre,
});

const TEAM = [
  { name: "Miguel Antunes", role: "Fundador e mecânico-chefe", bio: "Ex-ciclista de estrada, abriu a oficina em 2014 depois de dez anos a reparar bicicletas na garagem de casa.", initials: "MA" },
  { name: "Carla Nogueira", role: "Especialista em elétricas", bio: "Certificada Bosch e Shimano Steps. Resolve qualquer problema de motor, bateria ou cablagem.", initials: "CN" },
  { name: "Duarte Pires", role: "Rodas e suspensões", bio: "Monta rodas à mão e faz manutenção de suspensões Fox e RockShox. Pedala no Monsanto todos os domingos.", initials: "DP" },
];

function Sobre() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20">
      <h1 className="max-w-3xl text-5xl font-semibold">Uma pequena oficina com grande paixão por bicicletas.</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">A {SHOP_NAME} nasceu numa antiga loja de ferragens da Graça. Hoje somos três mecânicos a manter Lisboa a pedalar, uma colina de cada vez.</p>

      <section className="mt-16" aria-labelledby="equipa">
        <h2 id="equipa" className="text-3xl font-semibold">A equipa</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {TEAM.map((m) => (
            <Card key={m.name} className="shadow-card"><CardContent className="p-7">
              <Avatar className="h-16 w-16"><AvatarFallback className="bg-primary font-display text-xl text-primary-foreground">{m.initials}</AvatarFallback></Avatar>
              <h3 className="mt-5 text-xl font-semibold">{m.name}</h3>
              <p className="text-sm font-medium text-primary">{m.role}</p>
              <p className="mt-3 text-sm text-muted-foreground">{m.bio}</p>
            </CardContent></Card>
          ))}
        </div>
      </section>

      <section className="mt-20 grid gap-8 md:grid-cols-5" aria-labelledby="onde">
        <img src={map} alt={`Mapa ilustrado da Graça com a localização da oficina em ${SHOP_ADDRESS}`} width={1200} height={800} loading="lazy" className="rounded-2xl shadow-card md:col-span-3" />
        <div className="md:col-span-2">
          <h2 id="onde" className="text-3xl font-semibold">Onde estamos</h2>
          <p className="mt-3 text-muted-foreground">{SHOP_ADDRESS}. A dois passos da paragem do elétrico 28.</p>
          <h3 className="mt-8 text-xl font-semibold">Horário</h3>
          <dl className="mt-3 divide-y">
            {HOURS.map((h) => (
              <div key={h.day} className="flex justify-between py-2"><dt>{h.day}</dt><dd className="font-medium">{h.time}</dd></div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}
