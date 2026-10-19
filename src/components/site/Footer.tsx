import { Facebook, Instagram, MapPin, Phone, Youtube } from "lucide-react";
import { HOURS, SHOP_ADDRESS, SHOP_EMAIL, SHOP_NAME, SHOP_PHONE } from "@/lib/shop";

export function Footer() {
  return (
    <footer className="mt-24 bg-secondary text-secondary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-semibold">{SHOP_NAME}</p>
          <p className="mt-3 text-sm opacity-80">Reparamos bicicletas na Graça desde 2014. Peças honestas, prazos cumpridos.</p>
          <div className="mt-5 flex gap-3">
            <a href="https://instagram.com" aria-label="Instagram" className="opacity-80 hover:opacity-100"><Instagram className="h-5 w-5" /></a>
            <a href="https://facebook.com" aria-label="Facebook" className="opacity-80 hover:opacity-100"><Facebook className="h-5 w-5" /></a>
            <a href="https://youtube.com" aria-label="YouTube" className="opacity-80 hover:opacity-100"><Youtube className="h-5 w-5" /></a>
          </div>
        </div>
        <address className="not-italic text-sm">
          <p className="mb-3 font-semibold">Contactos</p>
          <p className="flex gap-2 opacity-80"><MapPin className="h-4 w-4 shrink-0" />{SHOP_ADDRESS}</p>
          <p className="mt-2 flex gap-2 opacity-80"><Phone className="h-4 w-4" /><a href={`tel:${SHOP_PHONE.replace(/\s/g, "")}`}>{SHOP_PHONE}</a></p>
          <p className="mt-2 opacity-80"><a href={`mailto:${SHOP_EMAIL}`}>{SHOP_EMAIL}</a></p>
        </address>
        <div className="text-sm">
          <p className="mb-3 font-semibold">Horário</p>
          <dl className="space-y-1">
            {HOURS.map((h) => (
              <div key={h.day} className="flex justify-between gap-4 opacity-80"><dt>{h.day}</dt><dd>{h.time}</dd></div>
            ))}
          </dl>
        </div>
      </div>
      <div className="border-t border-current/15 py-5 text-center text-xs opacity-70">
        <p>© {new Date().getFullYear()} {SHOP_NAME}. Todos os direitos reservados.</p>
        <p className="mt-1">Build de teste 2 · Hosterix</p>
      </div>
    </footer>
  );
}
