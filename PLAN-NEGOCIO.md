# StackVerificado — Manual de operación

Tu primer frente de ingresos, en manos. El sitio está construido; esto es lo que queda para que facture.

## 1. Cómo funciona el sistema

- **Sitio público** (`/`): reseñas con veredictos, método y transparencia. La confianza es el producto; los enlaces son el canal.
- **Redirección** (`/go/:slug`): cada botón "Ver oferta" pasa por aquí. Registra el clic (producto + fecha) y manda al enlace de afiliado.
- **Panel** (`/panel`, token `aria2026`): clics totales, por día (14 días) y por producto, con estado de cada enlace.

## 2. Activar los enlaces (tu única tarea de código)

Abre `src/data/products.ts` y sustituye `affiliateUrl: null` por tu enlace de afiliado en cada producto:

```ts
affiliateUrl: "https://tu-enlace-de-afiliado.com/?ref=tucodigo",
```

Mientras esté en `null`, el visitante ve un aviso y va al home (nada se rompe).

## 3. Programas de afiliados donde aplicar (en orden)

| Programa | Para | Comisión típica | Nota |
|---|---|---|---|
| Cloudflare Afiliados | Dominios/CDN | Variable | Paga bien, pero exige volumen |
| Contabo / Vultr / Hetzner | VPS | 100% primer mes o recurrente | Contabo: aplica directo en su web |
| Mullvad / ProtonVPN | VPN | 30-40% | Mullvad no tiene programa: usa ProtonVPN como alternativa de VPN recomendada |
| ConvertKit/Kit, Framer, Railway | Herramientas dev | Recurrente 20-30% | Los SaaS dev pagan recurrente: mejor LTV |
| Amazon Afiliados | Cursos/libros físicos | 1-5% | Solo como relleno, margen bajo |

**Regla del mentor:** empieza con 3 programas máximo. Los SaaS dev recurrentes primero.

## 4. Desplegar a producción

1. Botón **Deploy** en Freebuff (primer deploy manual).
2. Después: `freebuff-deploy check` → `freebuff-deploy start`.
3. Conecta un dominio propio (`.com` corto; compra en Cloudflare, coste mínimo). El dominio propio es imprescindible: Google no posiciona subdominios de plataformas.

## 5. Limitación actual y siguiente paso

El tracking vive en localStorage (solo cuenta *tu* navegador). Cuando el sitio esté en producción y quieras métricas reales de todos los visitantes, se añade un endpoint de backend que registre cada clic de `/go/:slug`. Dímelo cuando toque — es media hora de trabajo.

## 6. Plan de tráfico (lo que decide si esto vive)

Un sitio de afiliados sin tráfico es un cartel en el sótano. Tu ventaja: **ya tienes audiencia** (@ariacodez en IG/TikTok/YouTube).

- **Semana 1-2:** 1 vídeo corto "probé 3 hostings VPS y uno es una estafa" → enlaza la reseña. Los veredictos negativos son tu imán de clics: nadie hace contenido honesto.
- **Continuo:** cada vídeo de tu nicho enlaza su reseña en la bio. Cambiar la bio toma 10 segundos; el tráfico queda.
- **Mes 2+:** artículos SEO de colas largas ("mejor VPS barato para devs 2026"). Yo los maqueto, tú decides el ángulo.

## 7. Métricas de éxito a 30 días

- ≥ 3 enlaces de afiliado activos
- ≥ 500 clics salientes (los ves en `/panel`)
- ≥ 1 conversión confirmada (la verás en el dashboard del programa de afiliados, no aquí)
- 2 piezas de contenido apuntando al sitio

Si a los 30 días no hay clics con contenido publicado: el problema es el contenido, no el sitio. Cambiamos ángulos, no el vehículo.
