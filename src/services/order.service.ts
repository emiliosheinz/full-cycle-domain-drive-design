import { Order } from '../entities/order'

export class OrderService {
  static calculateTotal(orders: Order[]): number {
    return orders.reduce((acc, order) => {
      return acc + order.total
    }, 0)
  }
}
