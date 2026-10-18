export const SHOP_NAME: string = import.meta.env['VITE_SHOP_NAME'] || "Oficina Lume";
export const SHOP_PHONE: string = import.meta.env['VITE_SHOP_PHONE'] || "+351 218 123 456";
export const SHOP_ADDRESS = "Rua da Graça 112, 1170-168 Lisboa";
export const SHOP_EMAIL = "ola@oficinalume.pt";

export const HOURS = [
  { day: "Segunda a Sexta", time: "09:00 – 19:00" },
  { day: "Sábado", time: "10:00 – 14:00" },
  { day: "Domingo", time: "Encerrado" },
];

export const SERVICES = [
  { id: "revisao", name: "Revisão" },
  { id: "travoes", name: "Travões" },
  { id: "mudancas", name: "Mudanças" },
  { id: "rodas", name: "Rodas e pneus" },
] as const;

export const BIKE_TYPES = [
  { id: "estrada", name: "Estrada" },
  { id: "btt", name: "BTT" },
  { id: "urbana", name: "Urbana" },
  { id: "eletrica", name: "Elétrica" },
  { id: "gravel", name: "Gravel" },
] as const;
