import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarCheck, Cog, Disc3, Quote, Wrench, Bike, PackageCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import hero from "@/assets/hero.jpg";
import { pageMeta } from "@/lib/seo";
import { SHOP_NAME } from "@/lib/shop";

export const Route = createFileRoute("/")({
  head: () => ({ meta: pageMeta("Oficina Lume — Reparação de bicicletas em Lisboa", "Revisões, travões e mudanças afinadas na Graça, Lisboa. Marque online e levante a bicicleta pronta a rolar.") }),
  component: Index,
});

const SERVICES = [
  { icon: Wrench, title: "Revisão", text: "Limpeza, lubrificação, aperto de componentes e verificação de 30 pontos. Sai como nova." },
  { icon: Disc3, title: "Travões", text: "Pastilhas, calços, purga de hidráulicos e afinação de cabos. Travar a direito nas descidas de Lisboa." },
  { icon: Cog, title: "Mudanças", text: "Afinação de desviadores, troca de cabos e corrente. Passagens suaves, sem saltos nem ruídos." },
];

const STEPS = [
  { icon: CalendarCheck, title: "Marque online", text: "Escolha o serviço e o dia que lhe dá jeito. Confirmamos por telefone em poucas horas." },
  { icon: Bike, title: "Traga a bicicleta", text: "Deixe-a na oficina na Rua da Graça. Fazemos um diagnóstico e enviamos o orçamento antes de começar." },
  { icon: PackageCheck, title: "Levante pronta", text: "Avisamos assim que estiver pronta. A maioria das revisões fica feita em 48 horas." },
];

const TESTIMONIALS = [
  { name: "Joana Ribeiro", bike: "Urbana · Arroios", text: "Levei a bicicleta com as mudanças a saltar e no dia seguinte estava perfeita. Explicaram tudo sem pressas." },
  { name: "Ricardo Matos", bike: "Estrada · Alcântara", text: "A melhor oficina de Lisboa para bicicletas de estrada. Rodas centradas ao milímetro." },
  { name: "Inês Carvalho", bike: "Elétrica · Penha de França", text: "Subo à Graça todos os dias e os travões estavam a falhar. Resolveram no próprio dia e a um preço justo." },
  { name: "Tiago Fonseca", bike: "BTT · Benfica", text: "Atendimento impecável e orçamento cumprido. O plano Pro compensa para quem anda no Monsanto todas as semanas." },
];

function Index() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img src={hero} alt="Interior da oficina com uma bicicleta no suporte de reparação" width={1600} height={1008} className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-hero-overlay" />
        <div className="mx-auto max-w-6xl px-4 py-28 md:py-40">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Graça · Lisboa</p>
          <h1 className="mt-4 max-w-2xl text-5xl font-semibold leading-[1.05] text-primary-foreground md:text-7xl">A sua bicicleta, afinada como deve ser.</h1>
          <p className="mt-6 max-w-lg text-lg text-primary-foreground/85">Na {SHOP_NAME} tratamos de revisões, travões e mudanças com peças de qualidade e prazos que se cumprem.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg"><Link to="/marcar">Marcar serviço</Link></Button>
            <Button asChild size="lg" variant="secondary"><Link to="/precos">Ver preços</Link></Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-24" aria-labelledby="servicos">
        <h2 id="servicos" className="text-4xl font-semibold">Serviços</h2>
        <p className="mt-2 text-muted-foreground">O essencial para rolar em segurança pelas colinas da cidade.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {SERVICES.map((s) => (
            <Card key={s.title} className="shadow-card transition-transform hover:-translate-y-1">
              <CardContent className="p-7">
                <s.icon className="h-9 w-9 text-primary" aria-hidden />
                <h3 className="mt-5 text-2xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-muted-foreground">{s.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-muted py-24" aria-labelledby="como-funciona">
        <div className="mx-auto max-w-6xl px-4">
          <h2 id="como-funciona" className="text-4xl font-semibold">Como funciona</h2>
          <ol className="mt-10 grid gap-10 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <div className="flex items-center gap-3">
                  <span className="font-display text-5xl font-semibold text-primary">{i + 1}</span>
                  <s.icon className="h-6 w-6 text-secondary" aria-hidden />
                </div>
                <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-muted-foreground">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-24" aria-labelledby="testemunhos">
        <h2 id="testemunhos" className="text-center text-4xl font-semibold">O que dizem os clientes</h2>
        <Carousel opts={{ loop: true }} className="mx-auto mt-10 max-w-2xl">
          <CarouselContent>
            {TESTIMONIALS.map((t) => (
              <CarouselItem key={t.name}>
                <figure className="rounded-2xl bg-card p-10 text-center shadow-card">
                  <Quote className="mx-auto h-8 w-8 text-primary" aria-hidden />
                  <blockquote className="mt-4 font-display text-xl leading-relaxed">“{t.text}”</blockquote>
                  <figcaption className="mt-6 text-sm"><span className="font-semibold">{t.name}</span> <span className="text-muted-foreground">· {t.bike}</span></figcaption>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious aria-label="Testemunho anterior" />
          <CarouselNext aria-label="Testemunho seguinte" />
        </Carousel>
      </section>
    </>
  );
}
