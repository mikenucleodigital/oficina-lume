import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { yearlyPrice } from "@/lib/bookings";
import { pageMeta } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/precos")({
  head: () => ({ meta: pageMeta("Preços — Oficina Lume", "Planos de manutenção para bicicletas a partir de 29 € por mês, com 15% de desconto no pagamento anual.") }),
  component: Precos,
});

const PLANS = [
  { name: "Básica", price: 29, desc: "Para quem pedala ao fim de semana.", features: ["1 revisão por trimestre", "Verificação de travões", "Calibragem de pneus", "Lubrificação da corrente"] },
  { name: "Completa", price: 59, desc: "O favorito de quem vai de bicicleta para o trabalho.", featured: true, features: ["1 revisão por mês", "Afinação de travões e mudanças", "Mão de obra de furos incluída", "10% de desconto em peças", "Prioridade na marcação"] },
  { name: "Pro", price: 99, desc: "Para treino a sério e bicicletas elétricas.", features: ["Revisões ilimitadas", "Purga de travões hidráulicos", "Centragem de rodas", "20% de desconto em peças", "Bicicleta de substituição"] },
];

const FAQ = [
  ["Posso cancelar o plano a qualquer momento?", "Sim. Os planos mensais podem ser cancelados com aviso de 30 dias. Os anuais são reembolsados proporcionalmente aos meses não usados."],
  ["As peças estão incluídas no preço?", "A mão de obra está incluída. As peças são cobradas à parte, com o desconto do seu plano, e sempre com orçamento aprovado antes."],
  ["Quanto tempo demora uma revisão?", "A maioria das revisões fica pronta em 24 a 48 horas. Reparações com peças encomendadas podem demorar até 5 dias úteis."],
  ["Reparam bicicletas elétricas?", "Sim, trabalhamos com motores Bosch, Shimano Steps e Bafang. Diagnóstico eletrónico incluído no plano Pro."],
  ["Preciso de marcar ou posso aparecer?", "Recomendamos marcar online para garantir vaga, mas pequenos arranjos como furos fazemos na hora sempre que possível."],
  ["Que formas de pagamento aceitam?", "Multibanco, MB WAY, cartão de crédito e numerário. Os planos são cobrados por débito direto."],
];

function Precos() {
  const [yearly, setYearly] = useState(false);
  return (
    <div className="mx-auto max-w-6xl px-4 py-20">
      <header className="text-center">
        <h1 className="text-5xl font-semibold">Preços simples, sem surpresas</h1>
        <p className="mt-3 text-muted-foreground">Escolha o plano que acompanha o seu ritmo.</p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Label htmlFor="billing" className={cn(!yearly && "text-foreground", yearly && "text-muted-foreground")}>Mensal</Label>
          <Switch id="billing" checked={yearly} onCheckedChange={setYearly} aria-label="Faturação anual" />
          <Label htmlFor="billing" className={cn(yearly ? "text-foreground" : "text-muted-foreground")}>Anual</Label>
          <Badge variant="secondary">-15%</Badge>
        </div>
      </header>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {PLANS.map((p) => (
          <Card key={p.name} className={cn("relative flex flex-col shadow-card", p.featured && "border-2 border-primary md:-translate-y-3")}>
            {p.featured && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Mais popular</Badge>}
            <CardHeader>
              <h2 className="text-2xl font-semibold">{p.name}</h2>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
              <p className="mt-4">
                <span className="font-display text-5xl font-semibold">{yearly ? yearlyPrice(p.price) : p.price} €</span>
                <span className="text-muted-foreground"> /{yearly ? "ano" : "mês"}</span>
              </p>
              {yearly && <p className="text-xs text-muted-foreground">Em vez de {p.price * 12} €</p>}
            </CardHeader>
            <CardContent className="flex flex-1 flex-col">
              <ul className="flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2 text-sm"><Check className="h-4 w-4 shrink-0 text-primary" aria-hidden />{f}</li>
                ))}
              </ul>
              <Button asChild className="mt-8" variant={p.featured ? "default" : "outline"}><Link to="/marcar">Escolher {p.name}</Link></Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="mx-auto mt-24 max-w-3xl" aria-labelledby="faq">
        <h2 id="faq" className="text-3xl font-semibold">Perguntas frequentes</h2>
        <Accordion type="single" collapsible className="mt-6">
          {FAQ.map(([q, a], i) => (
            <AccordionItem key={q} value={`q${i}`}>
              <AccordionTrigger className="text-left">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
