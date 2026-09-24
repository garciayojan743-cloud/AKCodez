import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Minus, ShieldCheck, X } from "lucide-react";
import { Link } from "react-router-dom";
import { products, verdictMeta, type Product } from "../data/products";

const categories = ["Todos", "Hosting", "Dominios", "VPN", "Aprendizaje"] as const;

function VerdictIcon({ verdict }: { verdict: Product["verdict"] }) {
  if (verdict === "recomendado") return <Check className="h-3.5 w-3.5" />;
  if (verdict === "evitar") return <X className="h-3.5 w-3.5" />;
  return <Minus className="h-3.5 w-3.5" />;
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const meta = verdictMeta[product.verdict];
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.06 }}
      className="group flex flex-col rounded-xl border border-line bg-panel p-6 transition-colors hover:border-acid/40"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
            {product.category}
          </p>
          <h3 className="mt-1 text-lg font-bold text-white">{product.name}</h3>
        </div>
        <div className="text-right">
          <p className="font-mono text-3xl font-bold leading-none text-acid">
            {product.score.toFixed(1)}
          </p>
          <p className="font-mono text-[10px] text-muted">/ 10</p>
        </div>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted">{product.tagline}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-mono text-[11px] ${meta.className}`}
        >
          <VerdictIcon verdict={product.verdict} />
          {meta.label}
        </span>
        <span className="font-mono text-[11px] text-muted">
          probado {product.tested}
        </span>
      </div>

      <ul className="mt-4 space-y-1.5">
        {product.why.slice(0, 2).map((reason) => (
          <li key={reason} className="flex items-start gap-2 text-sm text-white/85">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-acid" />
            {reason}
          </li>
        ))}
        {product.cons.slice(0, 1).map((con) => (
          <li key={con} className="flex items-start gap-2 text-sm text-muted">
            <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400/80" />
            {con}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-5">
        <div className="flex items-center justify-between">
          <p className="font-mono text-xs text-muted">{product.price}</p>
          <Link
            to={`/go/${product.slug}`}
            className="inline-flex items-center gap-1.5 rounded-md border border-line bg-paper px-3 py-1.5 font-mono text-xs text-white transition-colors group-hover:border-acid/50 group-hover:text-acid"
          >
            Ver oferta
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function Home() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("Todos");

  const visible = useMemo(
    () =>
      filter === "Todos"
        ? products
        : products.filter((p) => p.category === filter),
    [filter]
  );

  const recommended = products.filter((p) => p.verdict === "recomendado").length;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-md border border-acid/40 bg-acid-dim font-mono text-sm font-bold text-acid">
              SV
            </span>
            <span className="font-mono text-sm font-bold tracking-tight text-white">
              stack<span className="text-acid">verificado</span>
            </span>
          </a>
          <nav className="flex items-center gap-6 font-mono text-xs text-muted">
            <a href="#veredictos" className="transition-colors hover:text-acid">
              veredictos
            </a>
            <a href="#metodo" className="hidden transition-colors hover:text-acid sm:block">
              método
            </a>
            <Link
              to="/panel"
              className="rounded-md border border-line px-3 py-1.5 transition-colors hover:border-acid/50 hover:text-acid"
            >
              panel
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-grid relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-paper to-transparent" />
        <div className="mx-auto max-w-6xl px-5 pb-20 pt-16 sm:pt-24">
          <p className="font-mono text-xs text-muted">
            ~$ ./probar --todo --publicar <span className="text-acid">[ok]</span>
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-6xl">
            Reseñas que dejan ganar al{" "}
            <span className="text-acid">mejor producto</span>, no al que más
            paga<span className="cursor-blink" />
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Probamos hosting, dominios, VPN y herramientas de desarrollo durante
            semanas antes de escribir una sola palabra. Si es bueno, te lo
            decimos. Si es malo, también — aunque nos cueste la comisión.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#veredictos"
              className="inline-flex items-center gap-2 rounded-lg bg-acid px-5 py-3 text-sm font-semibold text-paper transition-transform hover:scale-[1.03]"
            >
              Ver los veredictos
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#metodo"
              className="rounded-lg border border-line px-5 py-3 font-mono text-sm text-muted transition-colors hover:border-acid/50 hover:text-acid"
            >
              cómo probamos
            </a>
          </div>
          <p className="mt-10 font-mono text-[11px] uppercase tracking-widest text-muted">
            {products.length} herramientas probadas · {recommended} recomendadas ·
            0 patrocinios encubiertos
          </p>
        </div>
      </section>

      {/* Método */}
      <section id="metodo" className="border-t border-line/60">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <h2 className="font-mono text-xs uppercase tracking-widest text-acid">
            // método
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              {
                n: "01",
                t: "Compramos y usamos",
                d: "Nada de reseñas basadas en la página de ventas. Pagamos el plan, montamos el proyecto real y vivimos con la herramienta.",
              },
              {
                n: "02",
                t: "Medimos 30 días",
                d: "Uptime, soporte, renovaciones ocultas, rendimiento bajo carga. Datos, no impresiones.",
              },
              {
                n: "03",
                t: "Publicamos sin filtro",
                d: "Si el veredicto es 'evitar', lo publicamos aunque el programa de afiliados pague bien. Nuestro activo es tu confianza.",
              },
            ].map((step) => (
              <div
                key={step.n}
                className="rounded-xl border border-line bg-panel p-6"
              >
                <p className="font-mono text-2xl font-bold text-acid/70">{step.n}</p>
                <h3 className="mt-3 font-semibold text-white">{step.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Veredictos */}
      <section id="veredictos" className="border-t border-line/60 bg-panel/40">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="font-mono text-xs uppercase tracking-widest text-acid">
                // veredictos
              </h2>
              <p className="mt-3 text-2xl font-bold text-white">
                Lo que usaríamos nosotros
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`rounded-md px-3 py-1.5 font-mono text-xs transition-colors ${
                    filter === cat
                      ? "bg-acid text-paper"
                      : "border border-line text-muted hover:border-acid/40 hover:text-acid"
                  }`}
                >
                  {cat.toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((product, i) => (
              <ProductCard key={product.slug} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Transparencia */}
      <section className="border-t border-line/60">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl rounded-xl border border-acid/30 bg-acid-dim/40 p-8">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-acid" />
              <h2 className="font-semibold text-white">Cómo ganamos dinero</h2>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/80">
              Algunos enlaces de esta web son enlaces de afiliado: si compras a
              través de ellos, recibimos una comisión sin coste adicional para
              ti. Esa comisión <strong>nunca</strong> compra un veredicto — los
              productos que marcamos como <span className="text-red-400">evitar</span>{" "}
              podrían pagarnos más que los recomendados, y siguen en la lista
              negra. Cuando un producto no tiene enlace de afiliado, enlazamos
              directo y sin comisión.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-line/60 bg-panel/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-10 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-md border border-acid/40 bg-acid-dim font-mono text-xs font-bold text-acid">
              SV
            </span>
            <p className="font-mono text-xs text-muted">
              © 2026 stackverificado — construido por{" "}
              <span className="text-white/80">@ariacodez</span>
            </p>
          </div>
          <div className="flex gap-5 font-mono text-xs text-muted">
            <a
              href="https://www.instagram.com/ariacodez/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-acid"
            >
              instagram
            </a>
            <a
              href="https://www.tiktok.com/@ariacodez"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-acid"
            >
              tiktok
            </a>
            <a
              href="https://www.youtube.com/@AriaCodez"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-acid"
            >
              youtube
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
