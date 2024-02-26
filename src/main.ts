import { Address } from './entities/address'
import { Customer } from './entities/customer'
import { Order } from './entities/order'
import { OrderItem } from './entities/order-item'

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
