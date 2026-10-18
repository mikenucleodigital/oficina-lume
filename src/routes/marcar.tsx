import { createFileRoute, Link } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { addBooking } from "@/lib/bookings";
import { pageMeta } from "@/lib/seo";
import { BIKE_TYPES, SERVICES } from "@/lib/shop";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/marcar")({
  head: () => ({ meta: pageMeta("Marcar serviço — Oficina Lume", "Marque online a revisão, afinação de travões ou mudanças da sua bicicleta em Lisboa.") }),
  component: Marcar,
});

const schema = z.object({
  name: z.string().trim().min(2, "Indique o seu nome").max(80, "Nome demasiado longo"),
  email: z.string().trim().email("Email inválido").max(120),
  phone: z.string().trim().regex(/^(\+351\s?)?9\d{2}\s?\d{3}\s?\d{3}$|^(\+351\s?)?2\d{2}\s?\d{3}\s?\d{3}$/, "Indique um telefone português válido"),
  bikeType: z.string().min(1, "Escolha o tipo de bicicleta"),
  service: z.string().min(1, "Escolha o serviço"),
  date: z.date({ required_error: "Escolha uma data" }),
  notes: z.string().max(500, "Máximo de 500 caracteres").optional(),
});
type FormValues = z.infer<typeof schema>;

function Marcar() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", bikeType: "", service: "", notes: "" },
  });

  const onSubmit = (v: FormValues) => {
    addBooking({ ...v, date: format(v.date, "yyyy-MM-dd") });
    toast.success("Marcação recebida!", { description: `Para ${format(v.date, "d 'de' MMMM", { locale: pt })}. Vamos ligar-lhe para confirmar.` });
    form.reset();
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="mx-auto max-w-2xl px-4 py-20">
      <h1 className="text-5xl font-semibold">Marcar serviço</h1>
      <p className="mt-3 text-muted-foreground">Preencha o formulário e confirmamos por telefone. Pode acompanhar na <Link to="/area-cliente" className="underline">Área do cliente</Link>.</p>
      <Card className="mt-10 shadow-card">
        <CardContent className="p-6 md:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5 md:grid-cols-2" noValidate>
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem className="md:col-span-2"><FormLabel>Nome</FormLabel><FormControl><Input autoComplete="name" placeholder="Maria Silva" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" autoComplete="email" placeholder="maria@exemplo.pt" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem><FormLabel>Telefone</FormLabel><FormControl><Input type="tel" autoComplete="tel" placeholder="912 345 678" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="bikeType" render={({ field }) => (
                <FormItem><FormLabel>Tipo de bicicleta</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Escolha…" /></SelectTrigger></FormControl>
                    <SelectContent>{BIKE_TYPES.map((b) => <SelectItem key={b.id} value={b.name}>{b.name}</SelectItem>)}</SelectContent>
                  </Select><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="service" render={({ field }) => (
                <FormItem><FormLabel>Serviço</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Escolha…" /></SelectTrigger></FormControl>
                    <SelectContent>{SERVICES.map((s) => <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>)}</SelectContent>
                  </Select><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="date" render={({ field }) => (
                <FormItem className="md:col-span-2 flex flex-col"><FormLabel>Data preferida</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline" className={cn("justify-start text-left font-normal", !field.value && "text-muted-foreground")}>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? format(field.value, "PPP", { locale: pt }) : "Escolha uma data"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" locale={pt} selected={field.value} onSelect={field.onChange} disabled={(d) => d < today || d.getDay() === 0} initialFocus className="pointer-events-auto p-3" />
                    </PopoverContent>
                  </Popover><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="notes" render={({ field }) => (
                <FormItem className="md:col-span-2"><FormLabel>Notas (opcional)</FormLabel><FormControl><Textarea rows={4} placeholder="Ex.: a mudança traseira salta na 3.ª e ouve-se um chiar no travão da frente." {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <Button type="submit" size="lg" className="md:col-span-2">Enviar marcação</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
