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
src/
  app/
    layout.tsx              Layout raíz: envuelve la app en CartProvider y monta el Header
    page.tsx                Catálogo principal (Server Component, fetch a /products)
    globals.css             Estilos globales
    carrito/
      page.tsx              Vista del carrito + formulario de checkout
    productos/[id]/
      page.tsx              Vista de detalle (ruta dinámica, fetch a /products/{id})
      not-found.tsx         Vista para productos inexistentes
  components/
    Header.tsx              Barra superior persistente con contador del carrito (enlaza a /carrito)
    ProductCard.tsx         Tarjeta de producto del catálogo
    AddToCartButton.tsx     Botón reutilizable para agregar al carrito (client component)
    CheckoutForm.tsx        Formulario de checkout (React Hook Form + Zod)
  context/
    CartContext.tsx         React Context con el estado global del carrito
  schemas/
    checkout.ts             Esquema Zod del formulario de checkout (+ tipo inferido)
  types/
    product.ts               Contratos de TypeScript (Product, ProductDetail, CartItem)
```


