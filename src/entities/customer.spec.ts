import { Address } from './address'
import { Customer } from './customer'

describe('Customer', () => {
  it('should throw an error if id is empty', () => {
    expect(() => new Customer('', 'John Doe')).toThrow('Id is required')
  })

  it('should throw an error if name is empty', () => {
    expect(() => new Customer('1', '')).toThrow('Name is required')
  })

  it('should change name', () => {
    const customer = new Customer('1', 'John Doe')
    customer.changeName('Jane Doe')
    expect(customer.name).toBe('Jane Doe')
  })

  it('should active customer', () => {
    const customer = new Customer('1', 'John Doe')
    customer.address = new Address(
      'Main Street',
      1920,
      'New York',
      'New York',
      '10044'
    )
    customer.activate()
    expect(customer.isActive).toBe(true)
  })

  it('should deactivate customer', () => {
    const customer = new Customer('1', 'John Doe')
    customer.deactivate()
    expect(customer.isActive).toBe(false)
  })

  it('should throw an error if address is not set and activate is called', () => {
    const customer = new Customer('1', 'John Doe')
    expect(() => customer.activate()).toThrow(
      'Address is required to activate customer'
    )
  })
})
