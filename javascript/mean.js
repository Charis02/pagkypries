
function mean()
{
  let year = localStorage.getItem('chosen_year');
  let filename = 'data/' + year + '/means_data.json';

  localStorage.setItem('elements', JSON.stringify({'data':['code','rank','grade']}));
  localStorage.setItem('field', 'data');
  localStorage.setItem('filename', filename);

  $('#table tbody').empty();

  window.ias = new InfiniteAjaxScroll('#table tbody', {
    item: '.row',
    next: nextHandler(filename, ['code','rank','grade'],'data'),
    pagination: false,
    negativeMargin: 400,
    prefill: true,
  });
}
