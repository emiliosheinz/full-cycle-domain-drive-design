import { faker } from '@faker-js/faker'
import { Sequelize } from 'sequelize-typescript'
import { CustomerModel } from '../db/sequelize/model/customer.model'
import { OrderModel } from '../db/sequelize/model/order.model'
import { OrderItemModel } from '../db/sequelize/model/order-item.model'
import { ProductModel } from '../db/sequelize/model/product.model'
import { Customer } from '../../domain/entity/customer'
import { Address } from '../../domain/entity/address'
import { CustomerRepository } from './customer.repository'
import { ProductRepository } from './product.repository'
import { Product } from '../../domain/entity/product'
import { OrderItem } from '../../domain/entity/order-item'
import { Order } from '../../domain/entity/order'
import { OrderRepository } from './order.repository'

async function makeOrder({ shouldCreateOnDb = true } = {}) {
  const customer = new Customer(faker.string.uuid(), faker.person.fullName())
  const address = new Address(
    faker.location.street(),
    Number(faker.location.buildingNumber()),
    faker.location.city(),
    faker.location.state(),
    faker.location.zipCode()
  )
  customer.changeAddress(address)

  const product = new Product(
    faker.string.uuid(),
    faker.commerce.product(),
    Number(faker.commerce.price({ min: 10, max: 100, dec: 2 }))
  )

  const orderItem = new OrderItem(
    faker.string.uuid(),
    product.name,
    product.price,
    product.id,
    faker.number.int({ min: 1, max: 10 })
  )
  const order = new Order(faker.string.uuid(), customer.id, [orderItem])

  if (shouldCreateOnDb) {
    const customerRepository = new CustomerRepository()
    await customerRepository.create(customer)
    const productRepository = new ProductRepository()
    await productRepository.create(product)
    const orderRepository = new OrderRepository()
    await orderRepository.create(order)
  }

  return order
}

describe('Order repository test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create an order', async () => {
    const order = await makeOrder()

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    })

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: order.customerId,
      total: order.total,
      items: order.items.map(orderItem => ({
        id: orderItem.id,
        name: orderItem.name,
        price: orderItem.price,
        quantity: orderItem.quantity,
        order_id: order.id,
        product_id: orderItem.productId,
      })),
    })
  })
})
