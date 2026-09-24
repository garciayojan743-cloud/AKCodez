import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { products } from "../data/products";

export default function GoRedirect() {
  const { slug } = useParams();
  const [status, setStatus] = useState<"sending" | "no-link" | "not-found">(
    "sending"
  );

  useEffect(() => {
    if (!slug) return;

    const product = products.find((p) => p.slug === slug);
    if (!product) {
      setStatus("not-found");
      return;
    }

    // Registro local del clic (fecha + producto)
    try {
      const key = "sv_clicks";
      const raw = localStorage.getItem(key);
      const clicks: Record<string, number> = raw ? JSON.parse(raw) : {};
      clicks[`${slug}::${new Date().toISOString().slice(0, 10)}`] =
        (clicks[`${slug}::${new Date().toISOString().slice(0, 10)}`] || 0) + 1;
      localStorage.setItem(key, JSON.stringify(clicks));
    } catch {
      // localStorage bloqueado: seguimos, el clic no se pierde
    }

    if (product.affiliateUrl) {
      window.location.replace(product.affiliateUrl);
    } else {
      setStatus("no-link");
    }
  }, [slug]);

  if (status === "not-found") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="font-mono text-sm text-muted">404 · producto no encontrado</p>
        <Link to="/" className="text-acid underline-offset-4 hover:underline">
          ← volver al inicio
        </Link>
      </div>
    );
  }

  if (status === "no-link") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="font-mono text-sm text-muted">
          enlace de afiliado aún no configurado para <span className="text-acid">{slug}</span>
        </p>
        <Link to="/" className="text-acid underline-offset-4 hover:underline">
          ← volver al inicio
        </Link>
      </div>
      );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-acid" />
      <p className="font-mono text-xs text-muted">redirigiendo…</p>
    </div>
  );
}
