import View from './View.js';
import icons from 'url:../../img/icons.svg';
import { RES_PER_PAGE } from '../config.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(this._data.results.length / RES_PER_PAGE);
    //On Page 1 and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupForwardBtn(curPage);
    }
    //Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupBackwardBtn(curPage);
    }
    //Any page other than first and last page
    if (curPage < numPages) {
      return this._generateMarkupBackwardBtn(curPage).concat(
        this._generateMarkupForwardBtn(curPage)
      );
    }

    //On Page 1, and there are no other pages
    return '';
  }

  _generateMarkupForwardBtn(curPage) {
    return `<button data-goto="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
    <span> Page ${curPage + 1}</span>
    <svg class="search__icon">
      <use href="${icons}svg#icon-arrow-right"></use>
    </svg>
  </button>`;
  }

  _generateMarkupBackwardBtn(curPage) {
    return `<button data-goto="${
      curPage - 1
    }" class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${curPage - 1}</span>
  </button>`;
  }
}

export default new PaginationView();
