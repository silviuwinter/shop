import { $api } from "../api";
import { StatsDto } from "./dto/orders.dto";

export class OrdersService {
  static async createOrder() {
    const response = await $api.put('/orders');

    return response.data;
  }

  static async getStatistics(): Promise<StatsDto> {
    const response = await $api.get<StatsDto>('/orders/stats');
    return response.data;
  }

  async getStats(): Promise<StatsDto> {
    const response = await $api.get<StatsDto>('/orders/stats');

    return response.data;
  }
}
