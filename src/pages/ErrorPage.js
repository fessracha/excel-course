import {Page} from '@core/Page';
import {$} from '@core/dom';

export class ErrorPage extends Page {
  getRoot() {
    return $.create('div', 'error-page').html(`
      <div class="error-page">
        <h1>Error!</h1>
      </div>
    `)
  }
}