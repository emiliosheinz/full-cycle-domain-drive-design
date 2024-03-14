import { Order } from '../../domain/entity/order'
import { OrderItem } from '../../domain/entity/order-item'
import { OrderRepositoryInterface } from '../../domain/repository/order-repository.interface'
import { OrderItemModel } from '../db/sequelize/model/order-item.model'
import { OrderModel } from '../db/sequelize/model/order.model'

export class OrderRepository implements OrderRepositoryInterface {
  private orderItemToDatabase(orderItem: OrderItem) {
    return {
      id: orderItem.id,
      name: orderItem.name,
      price: orderItem.price,
      product_id: orderItem.productId,
      quantity: orderItem.quantity,
    }
  }

  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map(this.orderItemToDatabase),
      },
      { include: [{ model: OrderItemModel }] }
    )
  }

  async update(entity: Order): Promise<void> {
    const items = entity.items.map(this.orderItemToDatabase)

    const storedItems = await OrderItemModel.findAll({
      where: { order_id: entity.id },
    })
    const itemsToUpdate = items.filter(item =>
      storedItems.some(storedItem => storedItem.id === item.id)
    )
    const itemsToCreate = items.filter(
      item => !storedItems.some(storedItem => storedItem.id === item.id)
    )
    const itemsToDelete = storedItems.filter(
      storedItem => !items.some(item => storedItem.id === item.id)
    )

    const createItems = itemsToCreate.map(item =>
      OrderItemModel.create({ ...item, order_id: entity.id })
    )

    const updateItems = itemsToUpdate.map(item =>
      OrderItemModel.update(item, { where: { id: item.id } })
    )

    const deleteItems = itemsToDelete.map(item =>
      OrderItemModel.destroy({ where: { id: item.id } })
    )

    await Promise.all([...createItems, ...updateItems, ...deleteItems])

    await OrderModel.update(
      { total: entity.total() },
      { where: { id: entity.id } }
    )
  }

  async find(id: string): Promise<Order> {
    throw new Error('Method not implemented.')
  }

  async findAll(): Promise<Order[]> {
    throw new Error('Method not implemented.')
  }
}
