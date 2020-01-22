export function handleSearchParams(searchParams) {
  let { page, size, ...otherParams } = searchParams;
  otherParams['page.pn'] = page;
  otherParams['page.size'] = size;
  return otherParams;
}

export function handlePageDataRes(reponse) {
  let { number = 0, totalElements = 0 } = reponse;
  reponse.total = totalElements;
  reponse.page = number + 1;
  return reponse;
}
