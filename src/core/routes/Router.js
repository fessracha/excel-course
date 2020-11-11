import {$} from '@core/dom';
import {ErrorPage} from '@/pages/ErrorPage';
import ActiveRoute from '@core/routes/ActiveRoute';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in Router')
    }

    this.$placeholder = $(selector)
    this.routes = routes
    this.page = null

    this.changePageHandler = this.changePageHandler.bind(this)
    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }

  changePageHandler() {
    if (this.page) this.page.destroy()
    let Page = null
    if (ActiveRoute.path.includes('excel')) {
      Page = this.routes.excel
    } else if (ActiveRoute.path.includes('dashboard')) {
      Page = this.routes.dashboard
    } else {
      Page = ErrorPage
    }

    this.page = new Page()
    this.$placeholder.clear().append(this.page.getRoot())
    this.page.afterRender()
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }
}