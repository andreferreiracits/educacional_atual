//aqui fazer as formatações para o adm do tyne
//seria com um exemplo assim
/*
formatEnunciadoQuestao = $.extend({},formatEnunciadoQuestao,
{ 
    plugins: "cao,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,advlist,htmlcharcount",
});
*/

formatAlternativaQuestao = $.extend({}, formatDefault,
{
    encoding: "html",
    plugins: "simuladoravaliacoesnova, banco_imagens,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,advlist,htmlcharcount",
    theme_advanced_buttons3: formatDefault.theme_advanced_buttons3 + ",|, code",
    file_browser_callback: "carregarPopupImagemTiny",
    extended_valid_elements: "iframe[*]"

});
formatEnunciadoQuestao = $.extend({}, formatDefault,
{
    plugins: "simuladoravaliacoesnova,banco_imagens,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,advlist,htmlcharcount",
    theme_advanced_buttons3: formatDefault.theme_advanced_buttons3 + ",|, code",
    file_browser_callback: "carregarPopupImagemTiny",
    extended_valid_elements: "iframe[src|style|width|height|scrolling|marginwidth|marginheight|frameborder]"
});
