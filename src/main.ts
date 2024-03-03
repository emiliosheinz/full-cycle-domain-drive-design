import { Address } from './domain/entity/address'
import { Customer } from './domain/entity/customer'
import { Order } from './domain/entity/order'
import { OrderItem } from './domain/entity/order-item'

const customer = new Customer('1', 'John Doe')
const address = new Address(
  'Main Street',
  1920,
  'New York',
  'New York',
  '10044'
)
customer.address = address
customer.activate()

const items = Array.from(
  { length: 10 },
  (_, i) => new OrderItem(String(i), `Item ${i}`, i * 10, '1', i + 1)
)

const order = new Order('1', '1', items)
