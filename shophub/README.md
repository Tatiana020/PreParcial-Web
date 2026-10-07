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
    product.ts               Contratos de TypeScript (Product, ProductDetail, CartItem)
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

Punto 1 (Evolución del Contexto): A Cart context se le agrego para manejar clearCart, removeFromCart y totalPrice, agregandolos a cartContextValue y sus funciones pertinentes, estos en conjunto y usando memo ,que ya estaba antes, permitian llevar las cuentas apropiadamente

Punto 2 (Cálculo de Totales): Se uso totalPrice creado en el punto anterior que es ir sumando la multiplicacion de los precios por la cantidad de cada item en cartContext. UseMemo se uso de la misma forma que se hizo con quantity

Punto 3 (Arquitectura del Formulario): El formulario de checkout se estructuró como un componente funcional de React llamado CheckoutForm, utilizando TypeScript para definir los tipos de los datos y de los eventos.
Se implementó un flujo completo de formulario de checkout:
Captura de datos del usuario.
Manejo del estado con React.
Validación de los campos.
Mensajes de error según la interacción del usuario.
Selección del método de pago.
Aceptación de términos y condiciones.
Estado de carga mientras se procesa el pedido.
Bloqueo del botón durante el procesamiento.
Limpieza del carrito después de completar el pedido.
Reinicio del formulario y notificación al componente padre.

Las tecnologías utilizadas fueron:
React: para construir el componente y manejar su estado y eventos.
TypeScript: para definir interfaces y tipar estados y eventos.
React Hooks (useState): para manejar el estado interno del formulario.
Context API mediante useCart: para comunicarse con el estado global del carrito y ejecutar clearCart.
Programación asíncrona (Promise, async/await): para simular el procesamiento del pedido.
Next.js: el "use client" indica que este componente se ejecuta del lado del cliente dentro de una aplicación Next.js.
