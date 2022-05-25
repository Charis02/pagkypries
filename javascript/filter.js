$('#filter-input-text').on( 'keyup', function (e) {
    this.value = this.value.replace(/[^0-9]/g,''); // only allow numbers
    if (e.keyCode == 13) {
        $('#filter-input-button').click();
    }
});

$('#filter-input-button').on( 'click', function () {
    let code = $('#filter-input-text').val();
    let year = localStorage.getItem('chosen_year');
    let elements = JSON.parse(localStorage.getItem('elements'))['data'];
    let field = localStorage.getItem('field');
    let filename = localStorage.getItem('filename');

    $('#table tbody').empty();
    window.ias.unbind();

    if (code.length == 0) {
        window.ias = new InfiniteAjaxScroll('#table tbody', {
            item: '.row',
            next: nextHandler(filename, elements,field),
            pagination: false,
            negativeMargin: 400,
            prefill: true,
        });
    }
    else {
        filterDataHandler(filename, elements, field,code);
    }
});