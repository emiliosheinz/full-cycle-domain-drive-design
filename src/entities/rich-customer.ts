class RichCustomer {
  _id: string
  _name: string
  _address: string
  _isActive: boolean = true

  constructor(id: string, name: string, address: string) {
    this._id = id
    this._name = name
    this._address = address
  }

  changeName(name: string) {
    const isFullName = name.split(' ').length > 1
    if (!isFullName) {
      throw new Error('Name must be a full name')
    }
    this._name = name
  }

  activate() {
    this._isActive = true
  }

  deactivate() {
    this._isActive = false
  }
}
