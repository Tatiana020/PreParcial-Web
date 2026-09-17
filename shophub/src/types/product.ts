// Modelo base usado en el listado del catálogo (endpoint /products con `select`)
export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
  stock: number;
}

// Respuesta del endpoint de listado: GET /products?limit=8&select=...
export interface ProductListResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

// Modelo extendido usado en la vista de detalle: GET /products/{id}
export interface ProductDetail extends Product {
  description: string;
  brand?: string;
  images: string[];
}

// Item almacenado en el carrito global
export interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}
