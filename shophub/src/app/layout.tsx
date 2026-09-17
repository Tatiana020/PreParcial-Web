import type { Metadata } from "next";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "ShopHub",
  description: "Plataforma de e-commerce construida con Next.js App Router",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        {/* CartProvider envuelve toda la app: el estado del carrito
            persiste al navegar entre rutas sin recargar el navegador. */}
        <CartProvider>
          <Header />
          <main className="app-main">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
