"use client";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { ProductDetail } from "@/types/product";


interface FormularioProps {
  params: Promise<{ id: string }>;
}


export default async function FormularioPage({
  params,
}: FormularioProps) {
  const { id } = await params;


  return (
    <div className="product-detail">
      <Link href="/" className="back-link">
        ← Volver al catálogo
      </Link>

      <div className="formulario input">
        <div className="product-detail__image-wrapper">
            
        </div>

        </div>
      </div>
  );
}
