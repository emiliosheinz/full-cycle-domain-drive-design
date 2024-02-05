import { Address } from './address'

class RichCustomer {
  _id: string
  _name: string
  _address?: Address
  _isActive: boolean = false

  constructor(id: string, name: string) {
    this._id = id
    this._name = name
    this.validate()
  }

  validate() {
    if (!this._id) {
      throw new Error('Id is required')
    }
    if (!this._name) {
      throw new Error('Name is required')
    }
  }

  changeName(name: string) {
    const isFullName = name.split(' ').length > 1
    if (!isFullName) {
      throw new Error('Name must be a full name')
    }
    this._name = name
  }

  activate() {
    if (!this._address) {
      throw new Error('Address is required to activate customer')
    }
    this._isActive = true
  }

  deactivate() {
    this._isActive = false
  }

  set address(address: Address) {
    this._address = address
  }
}
