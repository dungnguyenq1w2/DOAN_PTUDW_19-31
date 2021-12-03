const { ITEM_PER_PAGE, PAGE_PER_PAGINATION } = require('../bin/const');

const calcPagination = (numObjects, page) => {
  const numPages = Math.ceil(numObjects / ITEM_PER_PAGE);
  const orderPage = Math.ceil(page / PAGE_PER_PAGINATION);
  const maxPage = orderPage * PAGE_PER_PAGINATION;
  const unitPage = maxPage - PAGE_PER_PAGINATION;
  const endPage = (numPages < maxPage) ? numPages % PAGE_PER_PAGINATION : (maxPage - unitPage);

  const pagination = {
    order: orderPage,
    curr: parseInt(page),
    num: numPages,
    unit: unitPage,
    max: maxPage,
    end: endPage,
  };

  return pagination;
}

module.exports = calcPagination;