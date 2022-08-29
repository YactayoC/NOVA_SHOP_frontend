const formSearch = document.getElementById('form-search');

function eventSearch() {
  const ulDatas = document.querySelectorAll('.data__items');
  const inputSearch = document.getElementById('input-search');
  const inputValue = inputSearch.value;
  formSearch.reset();

  ulDatas.forEach((data) => {
    data.style.display = 'grid';
    if (!data.children[1].textContent.includes(inputValue)) {
      data.style.display = 'none';
    }
  });
}

export default eventSearch;
