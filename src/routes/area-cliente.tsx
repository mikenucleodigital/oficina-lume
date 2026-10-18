import { createFileRoute, Link } from "@tanstack/react-router";
import { format, parseISO } from "date-fns";
import { pt } from "date-fns/locale";
import { Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type Booking, type BookingStatus, STATUS_LABEL, bookingsPerMonth, loadBookings, saveBookings } from "@/lib/bookings";
import { pageMeta } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/area-cliente")({
  head: () => ({ meta: pageMeta("Área do cliente — Oficina Lume", "Consulte e gira as suas marcações na Oficina Lume.") }),
  component: AreaCliente,
});

const STATUS_STYLE: Record<BookingStatus, string> = {
  pendente: "bg-warning text-warning-foreground",
  confirmada: "bg-secondary text-secondary-foreground",
  concluida: "bg-success text-success-foreground",
};

function AreaCliente() {
  const [list, setList] = useState<Booking[]>([]);
  useEffect(() => setList(loadBookings()), []);

  const update = (next: Booking[]) => { setList(next); saveBookings(next); };
  const setStatus = (id: string, status: BookingStatus) => update(list.map((b) => (b.id === id ? { ...b, status } : b)));
  const remove = (id: string) => { update(list.filter((b) => b.id !== id)); toast("Marcação eliminada"); };

  const totals = useMemo(() => ({
    total: list.length,
    pendente: list.filter((b) => b.status === "pendente").length,
    confirmada: list.filter((b) => b.status === "confirmada").length,
    concluida: list.filter((b) => b.status === "concluida").length,
  }), [list]);
  const chart = useMemo(() => bookingsPerMonth(list), [list]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-20">
      <h1 className="text-5xl font-semibold">Área do cliente</h1>
      <p className="mt-3 text-muted-foreground">As suas marcações ficam guardadas neste navegador.</p>

      {list.length === 0 ? (
        <Card className="mt-10 shadow-card"><CardContent className="p-10 text-center">
          <p className="text-lg">Ainda não tem marcações.</p>
          <Button asChild className="mt-4"><Link to="/marcar">Marcar o primeiro serviço</Link></Button>
        </CardContent></Card>
      ) : (
        <>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <Card className="shadow-card">
              <CardHeader><CardTitle className="font-display">Resumo</CardTitle></CardHeader>
              <CardContent>
                <p className="font-display text-6xl font-semibold">{totals.total}</p>
                <p className="text-sm text-muted-foreground">marcações no total</p>
                <dl className="mt-6 space-y-2 text-sm">
                  {(Object.keys(STATUS_LABEL) as BookingStatus[]).map((s) => (
                    <div key={s} className="flex justify-between"><dt>{STATUS_LABEL[s]}</dt><dd className="font-semibold">{totals[s]}</dd></div>
                  ))}
                </dl>
              </CardContent>
            </Card>
            <Card className="shadow-card lg:col-span-2">
              <CardHeader><CardTitle className="font-display">Marcações por mês</CardTitle></CardHeader>
              <CardContent>
                <ChartContainer config={{ total: { label: "Marcações", color: "var(--chart-1)" } }} className="h-56 w-full">
                  <BarChart data={chart}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} />
                    <YAxis allowDecimals={false} tickLine={false} axisLine={false} width={28} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="total" fill="var(--color-total)" radius={6} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6 shadow-card">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead><TableHead>Serviço</TableHead><TableHead>Bicicleta</TableHead><TableHead>Data</TableHead><TableHead>Estado</TableHead><TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {list.map((b) => (
                    <TableRow key={b.id}>
                      <TableCell><div className="font-medium">{b.name}</div><div className="text-xs text-muted-foreground">{b.email}</div></TableCell>
                      <TableCell>{b.service}</TableCell>
                      <TableCell>{b.bikeType}</TableCell>
                      <TableCell>{format(parseISO(b.date), "d MMM yyyy", { locale: pt })}</TableCell>
                      <TableCell><Badge className={cn("border-transparent", STATUS_STYLE[b.status])}>{STATUS_LABEL[b.status]}</Badge></TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Select value={b.status} onValueChange={(v) => setStatus(b.id, v as BookingStatus)}>
                            <SelectTrigger className="w-36" aria-label={`Alterar estado da marcação de ${b.name}`}><SelectValue /></SelectTrigger>
                            <SelectContent>{(Object.keys(STATUS_LABEL) as BookingStatus[]).map((s) => <SelectItem key={s} value={s}>{STATUS_LABEL[s]}</SelectItem>)}</SelectContent>
                          </Select>
                          <Button variant="ghost" size="icon" onClick={() => remove(b.id)} aria-label={`Eliminar marcação de ${b.name}`}><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
