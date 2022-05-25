$('#filter-input-text').on( 'keyup', function () {
    this.value = this.value.replace(/[^0-9]/g,''); // only allow numbers
});

$('#filter-input-button').on( 'click', function () {
    let code = $('#filter-input-text').val();
    let year = localStorage.getItem('chosen_year');
    let filename = 'data/' + year + '/means_data.json';

    $('#table tbody').empty();

    if (code.length == 0) {
        window.ias = new InfiniteAjaxScroll('#table tbody', {
            item: '.row',
            next: nextHandler(filename, ['code','rank','grade']),
            pagination: false,
            negativeMargin: 400,
            prefill: true,
        });
    }
    else {
        window.ias = new InfiniteAjaxScroll('#table tbody', {
            item: '.row',
            next: nextHandler(filename, ['code','rank','grade'],code),
            pagination: false,
            negativeMargin: 400,
            prefill: true,
        });
    }
});