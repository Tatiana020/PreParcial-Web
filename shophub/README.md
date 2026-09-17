# ShopHub

Plataforma de e-commerce construida con **Next.js (App Router)**, **TypeScript**
y **React Context API**, que consume la API pública de [DummyJSON](https://dummyjson.com/).

## Requisitos

- Node.js 18.18 o superior
- npm

## Instalación y ejecución local

```bash
npm install
npm run dev
```

Abre http://localhost:3000 en el navegador.

Para generar el build de producción:

```bash
npm run build
npm start
```

## Estructura del proyecto

```
app/
  layout.tsx              Layout raíz: envuelve la app en CartProvider y monta el Header
  page.tsx                Catálogo principal (Server Component, fetch a /products)
  globals.css             Estilos globales
  productos/[id]/
    page.tsx              Vista de detalle (ruta dinámica, fetch a /products/{id})
    not-found.tsx         Vista para productos inexistentes
components/
  Header.tsx              Barra superior persistente con contador del carrito
  ProductCard.tsx         Tarjeta de producto del catálogo
  AddToCartButton.tsx     Botón reutilizable para agregar al carrito (client component)
context/
  CartContext.tsx         React Context con el estado global del carrito
types/
  product.ts              Contratos de TypeScript (Product, ProductDetail, CartItem)
```

## Decisiones de arquitectura

- **Server vs Client Components**: `app/page.tsx` y `app/productos/[id]/page.tsx` son
  Server Components (hacen `fetch` directo al montar la página). Solo se marcan como
  `"use client"` los componentes que necesitan estado, eventos o Context:
  `Header`, `AddToCartButton` y `CartContext`.
- **Estado global**: `CartContext` centraliza los productos del carrito y expone
  `addToCart`, `removeFromCart`, `clearCart`, `totalCount` y `totalPrice`. Al envolver
  toda la app en `CartProvider` desde el `layout.tsx`, el estado persiste al navegar
  entre el catálogo y el detalle sin recargar el navegador (SPA).
- **Inmutabilidad**: las actualizaciones del carrito siempre crean nuevos arreglos/objetos
  (`map`, spread) en vez de mutar el estado existente.
- **Tipado**: todos los datos de productos y props de componentes están tipados en
  `types/product.ts`.

## Notas de seguridad

El proyecto usa **Next.js 16.3.5** y **React 19** (versiones sin vulnerabilidades
conocidas al momento de esta entrega — `npm audit` reporta 0 vulnerabilidades).
Next.js 14.x fue evitado deliberadamente por tener una vulnerabilidad crítica de RCE
en la optimización de imágenes AVIF sin parche disponible en esa rama.

## Pendiente para la entrega (fuera del código)

1. Subir este proyecto a un repositorio público de GitHub.
2. Crear un GitHub Release con tag `v1.0.0` (o `preparcial-v1.0`).
3. Grabar el video demostrativo (4-7 min) mostrando el release, el commit local,
   la navegación SPA y la sincronización del carrito.
