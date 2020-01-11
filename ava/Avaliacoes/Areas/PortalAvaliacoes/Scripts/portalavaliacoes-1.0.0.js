$(document).ready(function () {
    $('[data-link="popup"]').each(function () {
        var link = $(this).attr('href');
        $(this).click(function (evt) {
            var setting = $(this).data('setting');
            var target = $(this).attr('target');
            window.open(link, target, setting.toString());
            evt.preventDefault();
        }).attr('href', 'javascript:void(0);');
    })
    
});
