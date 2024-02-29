import { Order } from '../entities/order'
import { OrderItem } from '../entities/order-item'
import { OrderService } from './order.service'

describe('Order service', () => {
  it('should calculate the total price of all orders', () => {
    const orderItem = new OrderItem('P1', 'Product 1', 100, '001', 2)
    const orderItem2 = new OrderItem('P2', 'Product 2', 200, '001', 1)

    const order = new Order('O1', 'C1', [orderItem])
    const order2 = new Order('O2', 'C2', [orderItem, orderItem2])

    const total = OrderService.calculateTotal([order, order2])

    expect(total).toBe(600)
  })
})
