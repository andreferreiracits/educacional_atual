(function ($) {
    $.fn.posiTabs = function (idContentContainer) {
        var tabIndex = $(this);
        var container = $(idContentContainer);
        //Ao carregar a página...
        container.find(".tab_content").css("position", "absolute").css("left", "-10000px"); //Esconde o conteúdo
        tabIndex.find("li:first").addClass("active").css("position", "relative").css("left", "0px"); //Activate first tab
        container.find(".tab_content:first").css("position", "relative").css("left", "0px"); //Show first tab content

        //Ao clicar
        tabIndex.find("li").click(function (e) {
            tabIndex.find("li").removeClass("active"); //Remove a classe "active" 
            $(this).addClass("active"); //Acrescenta a classe "active" na aba selecionada
            container.find(".tab_content").css("position", "absolute").css("left", "-10000px") //Esconde o conteúdo da aba

            var activeTab = $(this).find("a").attr("href"); //Encontra o atributo href para identificar a aba ativa + seu conteúdo
            $(activeTab).css("position", "relative").css("left", "0px"); //Mostra aba ativada
            e.preventDefault();
        });
    }

})(jQuery);
