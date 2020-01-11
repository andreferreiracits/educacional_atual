    function getdivbyid(ordem, id) {
        for (i = 0; i < ordem.length; i++) {
            if (ordem[i].children[0].id === id) {
                return ordem[i];
            };
        }
    }

    function sizeOfThings() {
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;

        var mylist = $('#alldivserie').clone(true);
        var listitems = mylist.children('div').get();

        var ordem = [].map.call(listitems, function (element) {
            return element;
        });

        if (windowWidth < 768) {
            var newordem = ordem;
            $('#alldivserie').empty();
            $('#alldivserie').append(getdivbyid(newordem, "ckBolComentar_0_s"));
            $('#alldivserie').append(getdivbyid(newordem, "ckBolComentar_2_s"));
            $('#alldivserie').append(getdivbyid(newordem, "ckBolComentar_4_s"));
            $('#alldivserie').append(getdivbyid(newordem, "ckBolComentar_6_s"));
            $('#alldivserie').append(getdivbyid(newordem, "ckBolComentar_8_s"));
            $('#alldivserie').append(getdivbyid(newordem, "ckBolComentar_10_s"));
            $('#alldivserie').append(getdivbyid(newordem, "ckBolComentar_1_s"));
            $('#alldivserie').append(getdivbyid(newordem, "ckBolComentar_3_s"));
            $('#alldivserie').append(getdivbyid(newordem, "ckBolComentar_5_s"));
            $('#alldivserie').append(getdivbyid(newordem, "ckBolComentar_7_s"));
            $('#alldivserie').append(getdivbyid(newordem, "ckBolComentar_9_s"));
            $('#alldivserie').append(getdivbyid(newordem, "ckBolComentar_11_s"));
        }
        else if (windowWidth < 992) {
            var newordem = ordem;
            $('#alldivserie').empty();
            $('#alldivserie').append(getdivbyid(newordem, "ckBolComentar_0_s"));
            $('#alldivserie').append(getdivbyid(newordem, "ckBolComentar_6_s"));
            $('#alldivserie').append(getdivbyid(newordem, "ckBolComentar_1_s"));
            $('#alldivserie').append(getdivbyid(newordem, "ckBolComentar_7_s"));
            $('#alldivserie').append(getdivbyid(newordem, "ckBolComentar_2_s"));
            $('#alldivserie').append(getdivbyid(newordem, "ckBolComentar_8_s"));
            $('#alldivserie').append(getdivbyid(newordem, "ckBolComentar_3_s"));
            $('#alldivserie').append(getdivbyid(newordem, "ckBolComentar_9_s"));
            $('#alldivserie').append(getdivbyid(newordem, "ckBolComentar_4_s"));
            $('#alldivserie').append(getdivbyid(newordem, "ckBolComentar_10_s"));
            $('#alldivserie').append(getdivbyid(newordem, "ckBolComentar_5_s"));
            $('#alldivserie').append(getdivbyid(newordem, "ckBolComentar_11_s"));
        }
        else {
            var newordem = ordem;
            $('#alldivserie').empty();
            $('#alldivserie').append(getdivbyid(newordem, "ckBolComentar_0_s"));
            $('#alldivserie').append(getdivbyid(newordem, "ckBolComentar_1_s"));
            $('#alldivserie').append(getdivbyid(newordem, "ckBolComentar_2_s"));
            $('#alldivserie').append(getdivbyid(newordem, "ckBolComentar_3_s"));
            $('#alldivserie').append(getdivbyid(newordem, "ckBolComentar_4_s"));
            $('#alldivserie').append(getdivbyid(newordem, "ckBolComentar_5_s"));
            $('#alldivserie').append(getdivbyid(newordem, "ckBolComentar_6_s"));
            $('#alldivserie').append(getdivbyid(newordem, "ckBolComentar_7_s"));
            $('#alldivserie').append(getdivbyid(newordem, "ckBolComentar_8_s"));
            $('#alldivserie').append(getdivbyid(newordem, "ckBolComentar_9_s"));
            $('#alldivserie').append(getdivbyid(newordem, "ckBolComentar_10_s"));
            $('#alldivserie').append(getdivbyid(newordem, "ckBolComentar_11_s"));
        }
    };

    window.addEventListener('resize', function () {
        sizeOfThings();
    });

    function showAndDismissAlert(type, message) {
        var htmlAlert = '<div class="alert alert-' + type + '">' + message + '</div>';

        // Prepend so that alert is on top, could also append if we want new alerts to show below instead of on top.
        $(".alert-messages").empty();
        $(".alert-messages").prepend(htmlAlert);

        // Since we are prepending, take the first alert and tell it to fade in and then fade out.
        // Note: if we were appending, then should use last() instead of first()
        $(".alert-messages .alert").first().hide().fadeIn(200).delay(4000).fadeOut(1000, function () { $(this).remove(); });
    }