import {capitalize} from '@core/utils';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener`)
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      const method = this.getMethodName(listener)
      if (typeof this[method] !== 'function') {
        throw new Error(
            `Method ${method} is not implemented in ${this.name} component`
        )
      }
      this.$root.on(listener, this[method].bind(this))
    })
  }

  removeDOMListeners() {
  }

  getMethodName(eventName) {
    return `on${capitalize(eventName)}`
  }
}