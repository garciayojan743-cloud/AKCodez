export type Verdict = "recomendado" | "segunda-opcion" | "evitar";

export type Product = {
  slug: string;
  name: string;
  category: "Hosting" | "Dominios" | "VPN" | "Aprendizaje";
  tagline: string;
  score: number; // 0-10
  verdict: Verdict;
  price: string;
  tested: string; // fecha de la última prueba real
  affiliateUrl: string | null; // null => enlace directo, sin comisión
  why: string[];
  cons: string[];
  bestFor: string;
};

export const products: Product[] = [
  {
    slug: "contabo-vps",
    name: "Contabo Cloud VPS",
    category: "Hosting",
    tagline: "Hardware brutal por el precio. Soporte, la asignatura pendiente.",
    score: 8.4,
    verdict: "recomendado",
    price: "desde ~5€/mes",
    tested: "2026-08",
    affiliateUrl: null,
    why: [
      "RAM y CPU que otros venden al triple de precio",
      "Ideal para proyectos de código: deploys, bots, side-projects",
      "Llevamos 14 meses de uptime sin sustos",
    ],
    cons: [
      "Soporte lento si necesitas mano humana",
      "Panel anticuado; configuras por SSH y ya",
    ],
    bestFor: "Desarrolladores que quieren potencia, no mimos",
  },
  {
    slug: "cloudflare-domains",
    name: "Cloudflare Registrar",
    category: "Dominios",
    tagline: "Dominios a precio de coste. Literalmente sin margen.",
    score: 9.5,
    verdict: "recomendado",
    price: "precio mayorista",
    tested: "2026-09",
    affiliateUrl: null,
    why: [
      "Cloudflare no gana dinero con el dominio, y se nota",
      "Renovación al mismo precio que la primera compra (raro en este sector)",
      "DNS ultrarrápido incluido sin límites de consultas",
    ],
    cons: [
      "No venden TLDs exóticos",
      "Requiere usar sus nameservers",
    ],
    bestFor: "Cualquiera que no quiera sorpresas en la renovación",
  },
  {
    slug: "mullvad-vpn",
    name: "Mullvad VPN",
    category: "VPN",
    tagline: "Anónimo de verdad: sin email, sin cuenta, sin rastro.",
    score: 9.0,
    verdict: "recomendado",
    price: "5€/mes fijo",
    tested: "2026-07",
    affiliateUrl: null,
    why: [
      "Te dan un número de cuenta, ni siquiera guardan tu email",
      "Auditorías independientes públicas",
      "Precio plano: un mes, un año, mismo coste mensual",
    ],
    cons: [
      "Sin ofertas ni descuentos promocionales",
      "Menos servidores que los gigantes comerciales",
    ],
    bestFor: "Privacidad seria, no streaming masivo",
  },
  {
    slug: "theodinproject",
    name: "The Odin Project",
    category: "Aprendizaje",
    tagline: "Gratis, exigente y honesto. El mejor camino al primer trabajo.",
    score: 9.2,
    verdict: "recomendado",
    price: "gratis",
    tested: "2026-09",
    affiliateUrl: null,
    why: [
      "Currículum completo de full-stack sin pagar un euro",
      "Te obliga a leer documentación: la habilidad que de verdad paga",
      "Comunidad activa que revisa tu código",
    ],
    cons: [
      "Exige disciplina: no hay nadie empujándote",
      "Menos pulido que las plataformas de pago",
    ],
    bestFor: "Autodidactas que quieren empleo, no certificados decorativos",
  },
  {
    slug: "hostgator-shared",
    name: "HostGator (Plan Shared)",
    category: "Hosting",
    tagline: "El clásico de las cuponeras. Nuestro veredicto es incómodo.",
    score: 4.1,
    verdict: "evitar",
    price: "~4€/mes (renueva al triple)",
    tested: "2026-06",
    affiliateUrl: null,
    why: [
      "Primera factura barata, renovaciones agresivas",
      "Los 'backups incluidos' tienen letra pequeña",
    ],
    cons: [
      "CPU compartida que se ahoga con un solo plugin",
      "Upsells constantes en cada pantalla",
    ],
    bestFor: "Nadie que nos conozca. Pagarías 2€ más por mucho mejor servicio",
  },
  {
    slug: "netlify-hosting",
    name: "Netlify",
    category: "Hosting",
    tagline: "Deploy con git push. El front-end vive feliz aquí.",
    score: 8.8,
    verdict: "segunda-opcion",
    price: "gratis + escalable",
    tested: "2026-09",
    affiliateUrl: null,
    why: [
      "Preview deployments por rama: trabajo en equipo real",
      "Free tier generoso para proyectos personales",
      "HTTPS y CDN automáticos, cero configuración",
    ],
    cons: [
      "El free tier se queda corto con tráfico serio",
      "No es un VPS: no controlas el runtime",
    ],
    bestFor: "Sitios estáticos, JAMstack y portfolios",
  },
];

export const verdictMeta: Record<
  Verdict,
  { label: string; className: string }
> = {
  recomendado: {
    label: "Recomendado",
    className: "bg-acid-dim text-acid border-acid/40",
  },
  "segunda-opcion": {
    label: "2ª opción",
    className: "bg-amber-500/10 text-amber-400 border-amber-500/40",
  },
  evitar: {
    label: "Evitar",
    className: "bg-red-500/10 text-red-400 border-red-500/40",
  },
};
