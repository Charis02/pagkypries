
function minmax()
{
  let year = localStorage.getItem('chosen_year');
  let filename = 'data/' + year + '/minmax_data.json';

  localStorage.setItem('elements', JSON.stringify({'data':['lesson','min','max','avg']}));
  localStorage.setItem('field', 'data');
  localStorage.setItem('filename', filename);

  $('#table tbody').empty();

  window.ias = new InfiniteAjaxScroll('#table tbody', {
    item: '.row',
    next: nextHandler(filename, ['lesson','min','max','avg'],'data'),
    pagination: false,
    negativeMargin: 400,
    prefill: true,
  });
}
