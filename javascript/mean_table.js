
function mean()
{
  let year = localStorage.getItem('chosen_year');
  let filename = 'data/' + year + '/means_data.json';
  $('#table tbody').empty();

  window.ias = new InfiniteAjaxScroll('#table tbody', {
    item: '.row',
    next: nextHandler(filename, ['code','rank','grade']),
    pagination: false,
    negativeMargin: 400,
    prefill: true,
  });
}
