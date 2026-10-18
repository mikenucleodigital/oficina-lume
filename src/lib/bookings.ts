export type BookingStatus = "pendente" | "confirmada" | "concluida";

export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  bikeType: string;
  service: string;
  date: string; // ISO yyyy-mm-dd
  notes?: string;
  status: BookingStatus;
  createdAt: string;
}

const KEY = "oficina-lume:bookings";

export const STATUS_LABEL: Record<BookingStatus, string> = {
  pendente: "Pendente",
  confirmada: "Confirmada",
  concluida: "Concluída",
};

export function loadBookings(): Booking[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Booking[]) : [];
  } catch {
    return [];
  }
}

export function saveBookings(list: Booking[]) {
  window.localStorage.setItem(KEY, JSON.stringify(list));
}

export function addBooking(b: Omit<Booking, "id" | "status" | "createdAt">): Booking {
  const booking: Booking = {
    ...b,
    id: crypto.randomUUID(),
    status: "pendente",
    createdAt: new Date().toISOString(),
  };
  saveBookings([booking, ...loadBookings()]);
  return booking;
}

const MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

export function bookingsPerMonth(list: Booking[]) {
  const map = new Map<string, number>();
  for (const b of list) {
    const k = b.date.slice(0, 7);
    map.set(k, (map.get(k) ?? 0) + 1);
  }
  return [...map.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, total]) => ({ month: `${MONTHS[Number(k.slice(5, 7)) - 1]} ${k.slice(2, 4)}`, total }));
}

export function yearlyPrice(monthly: number) {
  return Math.round(monthly * 12 * 0.85);
}
