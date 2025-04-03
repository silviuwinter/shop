export interface CreateProductDto {
    name: string;
    processor: string;
    ram: number;
    storage: number;
    webcam: boolean;
    microphone: boolean;
    price: number;
    imageUrl?: string;
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