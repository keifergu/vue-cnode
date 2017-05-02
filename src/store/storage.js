class Storage {
  constructor() {
    this.store = localStorage
  }

  set(item, value) {
    return this.store.setItem(item , value)
  }

  get(item) {
    return this.store.getItem(item)
  }
}

var _store = new Storage()

export default _store
