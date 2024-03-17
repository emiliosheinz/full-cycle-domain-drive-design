import { Address } from '../../domain/customer/value-object/address'
import { Customer } from '../../domain/customer/entity/customer'
import { CustomerRepositoryInterface } from '../../domain/customer/repository/customer-repository.interface'
import { CustomerModel } from '../db/sequelize/model/customer.model'

export class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      state: entity.address.state,
      number: entity.address.number,
      zipCode: entity.address.zip,
      city: entity.address.city,
      active: entity.isActive,
      rewardedPoints: entity.rewardedPoints,
    })
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        id: entity.id,
        name: entity.name,
        street: entity.address.street,
        state: entity.address.state,
        number: entity.address.number,
        zipCode: entity.address.zip,
        city: entity.address.city,
        active: entity.isActive,
        rewardedPoints: entity.rewardedPoints,
      },
      {
        where: {
          id: entity.id,
        },
      }
    )
  }

  async find(id: string): Promise<Customer> {
    let customerModel
    try {
      customerModel = await CustomerModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
      })
    } catch (error) {
      throw new Error('Customer not found')
    }

    const customer = new Customer(id, customerModel.name)
    const address = new Address(
      customerModel.street,
      customerModel.number,
      customerModel.city,
      customerModel.state,
      customerModel.zipCode
    )
    customer.changeAddress(address)
    return customer
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll()

    const customers = customerModels.map(customerModels => {
      let customer = new Customer(customerModels.id, customerModels.name)
      customer.addRewardPoints(customerModels.rewardedPoints)
      const address = new Address(
        customerModels.street,
        customerModels.number,
        customerModels.city,
        customerModels.state,
        customerModels.zipCode
      )
      customer.changeAddress(address)
      if (customerModels.active) {
        customer.activate()
      }
      return customer
    })

    return customers
  }
}
