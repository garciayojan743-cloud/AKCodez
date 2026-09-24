import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  BarChart3,
  Link2,
  Lock,
  LockOpen,
  MousePointerClick,
  Trophy,
} from "lucide-react";
import { products } from "../data/products";
import { PANEL_TOKEN } from "../config";

const STORAGE_KEY = "sv_clicks";
const SESSION_KEY = "sv_panel_unlocked";

type ClickMap = Record<string, number>;

function readClicks(): ClickMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ClickMap) : {};
  } catch {
    return {};
  }
}

function lastDays(n: number): string[] {
  const days: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

function Gate({ onUnlock }: { onUnlock: () => void }) {
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);

  const submit = () => {
    if (token === PANEL_TOKEN) {
      sessionStorage.setItem(SESSION_KEY, "1");
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 600);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div
        className={`w-full max-w-sm rounded-xl border bg-panel p-8 ${
          error ? "border-red-500/60" : "border-line"
        }`}
      >
        <div className="flex items-center justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-acid/40 bg-acid-dim">
            <Lock className="h-5 w-5 text-acid" />
          </span>
        </div>
        <h1 className="mt-5 text-center font-mono text-sm font-bold text-white">
          acceso restringido
        </h1>
        <p className="mt-2 text-center font-mono text-[11px] text-muted">
          métricas del sitio · solo propietario
        </p>
        <input
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="token"
          autoFocus
          className={`mt-6 w-full rounded-md border bg-paper px-4 py-2.5 font-mono text-sm text-white outline-none transition-colors placeholder:text-muted/50 ${
            error ? "border-red-500/60" : "border-line focus:border-acid/60"
          }`}
        />
        <button
          onClick={submit}
          className="mt-3 w-full rounded-md bg-acid py-2.5 font-mono text-sm font-semibold text-paper transition-transform hover:scale-[1.02]"
        >
          entrar
        </button>
        <Link
          to="/"
          className="mt-5 block text-center font-mono text-[11px] text-muted transition-colors hover:text-acid"
        >
          ← volver al sitio
        </Link>
      </div>
    </div>
  );
}

export default function Panel() {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === "1"
  );
  const [clicks] = useState<ClickMap>(readClicks);

  const stats = useMemo(() => {
    const perProduct: Record<string, number> = {};
    const perDay: Record<string, number> = {};
    let total = 0;
    for (const [key, count] of Object.entries(clicks)) {
      const [slug, day] = key.split("::");
      perProduct[slug] = (perProduct[slug] || 0) + count;
      perDay[day] = (perDay[day] || 0) + count;
      total += count;
    }
    const best = Object.entries(perProduct).sort((a, b) => b[1] - a[1])[0];
    const bestProduct = best ? products.find((p) => p.slug === best[0]) : null;
    const today = lastDays(1)[0];
    return { perProduct, perDay, total, bestProduct, today };
  }, [clicks]);

  const days = useMemo(() => lastDays(14), []);
  const maxDay = Math.max(1, ...days.map((d) => stats.perDay[d] || 0));

  if (!unlocked) {
    return <Gate onUnlock={() => setUnlocked(true)} />;
  }

  const linkedCount = products.filter((p) => p.affiliateUrl).length;

  return (
    <div className="min-h-screen">
      <header className="border-b border-line/70 bg-panel/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-md border border-acid/40 bg-acid-dim font-mono text-sm font-bold text-acid">
              SV
            </span>
            <span className="font-mono text-sm text-white">
              panel <span className="text-acid">/ métricas</span>
            </span>
          </div>
          <div className="flex items-center gap-3 font-mono text-xs">
            <Link
              to="/"
              className="text-muted transition-colors hover:text-acid"
            >
              sitio
            </Link>
            <button
              onClick={() => {
                sessionStorage.removeItem(SESSION_KEY);
                setUnlocked(false);
              }}
              className="flex items-center gap-1.5 rounded-md border border-line px-3 py-1.5 text-muted transition-colors hover:border-red-500/50 hover:text-red-400"
            >
              <LockOpen className="h-3.5 w-3.5" />
              salir
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10">
        {/* KPIs */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: MousePointerClick,
              label: "clics totales",
              value: String(stats.total),
            },
            {
              icon: Activity,
              label: "clics hoy",
              value: String(stats.perDay[stats.today] || 0),
            },
            {
              icon: Trophy,
              label: "top producto",
              value: stats.bestProduct
                ? stats.bestProduct.name.split(" ")[0]
                : "—",
            },
            {
              icon: Link2,
              label: "enlaces activos",
              value: `${linkedCount}/${products.length}`,
            },
          ].map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-xl border border-line bg-panel p-5"
            >
              <kpi.icon className="h-4 w-4 text-acid" />
              <p className="mt-3 font-mono text-3xl font-bold text-white">
                {kpi.value}
              </p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted">
                {kpi.label}
              </p>
            </div>
          ))}
        </div>

        {/* Gráfico últimos 14 días */}
        <section className="mt-8 rounded-xl border border-line bg-panel p-6">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-acid" />
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
              clics · últimos 14 días
            </h2>
          </div>
          {stats.total === 0 ? (
            <p className="mt-6 font-mono text-xs text-muted">
              aún no hay clics registrados. abre el sitio, pulsa "ver oferta" en
              cualquier producto y vuelve aquí.
            </p>
          ) : (
            <div className="mt-6 flex h-40 items-end gap-1.5">
              {days.map((day) => {
                const count = stats.perDay[day] || 0;
                const h = (count / maxDay) * 100;
                return (
                  <div
                    key={day}
                    className="group relative flex-1"
                    title={`${day}: ${count}`}
                  >
                    <div
                      className={`w-full rounded-t transition-colors ${
                        count > 0
                          ? "bg-acid/70 group-hover:bg-acid"
                          : "bg-line"
                      }`}
                      style={{ height: `${Math.max(count > 0 ? 8 : 3, h)}%` }}
                    />
                  </div>
                );
              })}
            </div>
          )}
          <div className="mt-2 flex justify-between font-mono text-[10px] text-muted">
            <span>{days[0]}</span>
            <span>hoy</span>
          </div>
        </section>

        {/* Desglose por producto */}
        <section className="mt-8 rounded-xl border border-line bg-panel p-6">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
            desglose por producto
          </h2>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[560px] text-left">
              <thead>
                <tr className="border-b border-line font-mono text-[11px] uppercase tracking-wider text-muted">
                  <th className="pb-3 pr-4">producto</th>
                  <th className="pb-3 pr-4">clics</th>
                  <th className="pb-3 pr-4">participación</th>
                  <th className="pb-3">enlace</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => {
                  const c = stats.perProduct[p.slug] || 0;
                  const share = stats.total > 0 ? (c / stats.total) * 100 : 0;
                  return (
                    <tr key={p.slug} className="border-b border-line/50">
                      <td className="py-3 pr-4 text-sm text-white">{p.name}</td>
                      <td className="py-3 pr-4 font-mono text-sm text-acid">
                        {c}
                      </td>
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-28 overflow-hidden rounded-full bg-line">
                            <div
                              className="h-full rounded-full bg-acid"
                              style={{ width: `${share}%` }}
                            />
                          </div>
                          <span className="font-mono text-[11px] text-muted">
                            {share.toFixed(0)}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 font-mono text-[11px]">
                        {p.affiliateUrl ? (
                          <span className="text-acid">activo</span>
                        ) : (
                          <span className="text-amber-400">pendiente</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-5 rounded-lg border border-line bg-paper p-4 font-mono text-[11px] leading-relaxed text-muted">
            nota: el tracking vive en este navegador (localStorage) mientras el
            sitio no tenga backend. al desplegar, se migra a eventos del lado
            servidor para contar todos los visitantes. sustituye{" "}
            <span className="text-white/80">affiliateUrl</span> en{" "}
            <span className="text-acid">src/data/products.ts</span> para activar
            cada enlace.
          </p>
        </section>
      </main>
    </div>
  );
}
