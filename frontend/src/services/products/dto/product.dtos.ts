export interface CreateProductDto {
    imageUrl ?: string;
    name: string;
    processor: string;
    ram: number;
    storage: number;
    webcam: boolean;
    microphone: boolean;
    price: number;
}
export interface UpdateProduct {
    imageUrl ?: string;
    name?: string;
    processor?: string;
    ram?: number;
    storage?: number;
    webcam?: boolean;
    microphone?: boolean;
    price?: number;
}
export interface ProductDto {
  id: number;
  name: string;
  processor: string;
  ram: number;
  storage: number;
  webcam: boolean;
  microphone: boolean;
  price: number;
  imageUrl?: string;
}