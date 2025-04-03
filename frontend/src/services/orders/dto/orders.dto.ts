import { ProductDto } from "../../products/dto/product.dtos";

export interface StatProductDto  extends ProductDto { 
    totalSold: number;
}

export interface StatsDto {
    mostBoughtProducts: StatProductDto[];
    leastBoughtProducts: StatProductDto[];
    timeRelatedProducts: StatProductDto[];
}
