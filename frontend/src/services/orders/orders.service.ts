import { $api } from "../api";
import { StatsDto } from "./dto/orders.dto";

export class OrdersService {
  // makes a new order
  static async createOrder() {
    const response = await $api.put('/orders'); // sends a request to create an order
    return response.data; // gives back the result
  }

  // gets stats about orders (like totals or trends maybe)
  static async getStatistics(): Promise<StatsDto> {
    const response = await $api.get<StatsDto>('/orders/stats'); // asks for stats from the server
    return response.data; // gives back the stats
  }

  // same as above but not static, so an instance of the class is needed to use it
  async getStats(): Promise<StatsDto> {
    const response = await $api.get<StatsDto>('/orders/stats'); // asks for stats from the server
    return response.data; // gives back the stats
  }
}
