import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {changeTitle} from '@/redux/actions'
import {defaultTitle} from '@/constants'
import {debounce} from '@core/utils'
import {ActiveRoute} from '@core/routes/ActiveRoute';

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    })
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle
    return `
      <input type="text" class="input" value="${title}" />

      <div>

        <div class="button" data-action="delete">
          <i class="material-icons" data-action="delete">delete</i>
        </div>

        <div class="button" data-action="exit">
          <i class="material-icons" data-action="exit">exit_to_app</i>
        </div>

      </div>
    `
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(changeTitle($target.text()))
  }

  onClick({target}) {
    const $target = $(target)
    const action = $target.data.action || null
    let desicion = false
    switch (action) {
      case 'delete':
        desicion = confirm('Вы уверены что хотите удалить данную таблицу?')
        if (desicion) {
          localStorage.removeItem('excel:' + ActiveRoute.param)
          ActiveRoute.navigate('dashboard')
        }
        // Удаляем таблицу
        break
      case 'exit':
        console.log('exit')
        ActiveRoute.navigate('dashboard')
        break
    }
    console.log($target.data.action)
  }
}
