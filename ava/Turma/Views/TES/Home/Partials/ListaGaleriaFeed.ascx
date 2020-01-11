<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<List<Turma.Models.MensagemRapida>>" %>


<script type="text/javascript" src="http://stuk.github.io/jszip-utils/dist/jszip-utils.js"></script>
<script type="text/javascript" src="<%=Url.CDNLink("/Common/Scripts/jszip_2.0.0.js") %><%=Url.TimeStampLink() %>"></script>
<script type="text/javascript" src="<%=Url.CDNLink("/Common/Scripts/FileSaver.js") %><%=Url.TimeStampLink() %>"></script>

<%
    if (Model != null)
    {
        foreach (var ms in Model)
            Html.RenderPartial("Partials/GaleriaFeed", ms, ViewData);
    }

    bool bolPossuiVerMais = ViewData["bolPossuiVerMais"] != null ? ((bool)ViewData["bolPossuiVerMais"]) : false;
    bool bolSemMensagemNoFiltroAtual = ViewData["SemMensagemNoFiltroAtual"] != null ? ((bool)ViewData["SemMensagemNoFiltroAtual"]) : false;

    var isEducador = (bool) ViewData["papel"];

%>
<% if(bolPossuiVerMais) { %>
    <div class="clearfix"></div>
    <a href="javascript:void();" class="veja_mais_botao">Veja mais</a>
<% } %>
<script>
    $(document).ready(function(){        


        var arrayImagens = [];

        $(".btnGava").click(function(){
            
            arrayImagens = [];
            console.log("file -> ListaGaleriaFeed.ascx  | action -> btnGava ");

            var bolAplicouFancy = false;
            var bolJaVerificouAjax = true;
            var component = $(this).parent().parent().find(".fake_galeria");
            var listaImgs = $(this).parent().parent().find("a.galeria_mural");

            listaImgs.each(function(index, value){
                
                var objImagem = {
                    pos : index,
                    src : $(this).attr('data-path'),
                    id : $(this).attr('data-idarquivo'),
                    name : $(this).attr('data-nomearquivo'),
                    rel : $(this).attr('rel'),
                    type : $(this).attr('data-strExtensao')
                };

                arrayImagens.push(objImagem);
            });

            var div = $('<div class="principal" id="principal"></div>');  
            var tipoArquivo = component.attr("data-strExtensao");               
            
            $(div).append('<div class="message"><h2>Editar nome do arquivo</h2></div>'); 

            var img = $('<img style="display:none; max-width: 410px; max-heigth: 170px;" id="JPEG" class="JPEG">'); 
            img.attr('src', component.attr("data-path"));
            $(div).append(img);
            
            $(div).append('<div style="display:none;" class="tipo_arquivo modaleditar" id="tipo_arquivo"><p>'+component.attr("data-strExtensao")+'</p></div>');                   

            $(div).append('<p style="display:none;" class="erroNomeArquivo" id="erroNomeArquivo">O nome do arquivo é obrigatório</p>');

            $(div).append('<p class="nomeImagem" id="nomeImagem">'+component.attr("data-nomearquivo")+'</p>');

            $(div).append('<a class="btnEditarNome btn_cinza" id="btnEditarNome" class="btn_cinza" style="" href="javascript:void(0);">Editar</a>');  
            
            $(div).append('<input style="display:none;" type="text" class="idarquivo" id="idarquivo" value="'+component.attr("data-idarquivo")+'">');

            $(div).append('<input style="display:none;" type="hidden" id="posicao" value="0">');

            $(div).append('<input style="display:none;" type="text" class="nomeEdicao" id="nomeEdicao" value="'+component.attr("data-nomearquivo")+'">');
            $(div).append('<br><a style="display:none;" class="btnSalvar btn_laranja" id="btnSalvar" class="btn_cor" style="" href="javascript:void(0);">Salvar</a>');

            var strNav = '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'+
                        '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>';
            
            $.fancybox.open($(div).html());
            
            if(arrayImagens.length > 1){
                $('.fancybox-skin ').append(strNav);
            }
            
            if(isImage(component.attr("data-strExtensao"))){
                $("div.tipo_arquivo.modaleditar").hide();
                $("img.JPEG").show();
            } else{
                    $("div.tipo_arquivo.modaleditar").show();
                    $("img.JPEG").hide();
            }

            $("#btnEditarNome").click(function(){
                $("p.nomeImagem").hide();
                $("a.btnEditarNome").hide();

                $("a.btnSalvar").show();
                $("input.nomeEdicao").show();
                
            });    

            $("#btnSalvar").click(function(){                       
                var id = $("input.idarquivo").val();
                var strNome = $("#nomeEdicao").val();
                if(strNome.length > 0 && strNome.trim()) {
                    var j = {
                        id: id,
                        strNome: strNome,
                        strDescricao: ""
                    };
                    $.ajax({
                        url: "/ava/upload/home/AlteraArquivo",
                        type: "POST",
                        dataType: "json",
                        data: {
                            json: JSON.stringify(j)
                        },
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        success: function (data) {
                            var erro = parseInt(data.error);
                            if (erro == 0) {
                                $("p.nomeImagem").text(strNome);
                                $("p.nomeImagem").show();
                                $("a.btnEditarNome").show();
                                
                                $("p.erroNomeArquivo").hide();
                                $("a.btnSalvar").hide();
                                $("input.nomeEdicao").hide();
                                component.attr("data-nomearquivo",strNome);
                                //
                                if ($.jStorage) {
                                    $.jStorage.flush();
                                }
                            }
                        },
                        error: function (data) {
                            console.log(data.responseText);
                            alert("Erro no upload ao editar arquivo");
                        }
                    });
                
                }
                else {
                    $("p.erroNomeArquivo").show();                        
                }                    
            });

            $(".fancybox-prev").unbind('click');
            $(".fancybox-prev").click(function(){
                var pos = parseInt($('#posicao').val());
                if(pos == 0){
                    pos = arrayImagens.length -1;
                }
                else{
                    pos--;
                }

                var imagem = arrayImagens[pos];

                $('#JPEG').attr('src', imagem.src);
                $('#nomeImagem').text(imagem.name);
                $('#tipo_arquivo').text(imagem.type);
                $('#idarquivo').val(imagem.id);
                $('#posicao').val(pos);
                $('#nomeEdicao').val(imagem.name);

                if(isImage(imagem.type)){
                    $("div.tipo_arquivo.modaleditar").hide();
                    $("img.JPEG").show();
                } 
                else{
                    $("div.tipo_arquivo.modaleditar").show();
                    $("img.JPEG").hide();
                }

            });

            $(".fancybox-next").unbind('click');
            $(".fancybox-next").click(function(){
                var pos = parseInt($('#posicao').val());
                if(pos == arrayImagens.length -1){
                    pos = 0;
                }
                else{
                    pos++;
                }

                var imagem = arrayImagens[pos];
                $('#JPEG').attr('src', imagem.src);
                $('#nomeImagem').text(imagem.name);
                $('#tipo_arquivo').text(imagem.type);
                $('#idarquivo').val(imagem.id);
                $('#posicao').val(pos);
                $('#nomeEdicao').val(imagem.name);

                if(isImage(imagem.type)){
                    $("div.tipo_arquivo.modaleditar").hide();
                    $("img.JPEG").show();
                } 
                else{
                    $("div.tipo_arquivo.modaleditar").show();
                    $("img.JPEG").hide();
                }

            });
        });
    });

    function isImage(extension){
        switch (extension) {
            case ".jpeg":
            case ".jpg":
            case ".png":
            case ".gif":
            case ".bmp":
            case ".xwd":
            case ".xpm":
            case ".xbm":
            case ".rgb":
            case ".ppm":
            case ".pgm":
            case ".pbm":
            case ".pnm":
            case ".ico":
            case ".cmx":
            case ".ras":
            case ".tiff":
            case ".tif":
            case ".svg":
            case ".jfif":
            case ".jpe":
            case ".ief":
            case ".cod":
                return true;
                break;
        }
        return false;
    }

</script>
<div id="galeria_rodape">
    <div class="container">
        <div class="arquivoSelecionado" id="galeria_rodape_contador">
            <p style="color: #fffaf4"></p>
        </div>
        <div id="galeria_rodape_botoes" >
            <div class="arq_menu_links" >
                
                <%if(isEducador){%>
                <a href="javascript:void(0);" class="FontAwesome excluir up_tooltip" onclick="ExcluirArquivoTodos()" id="excluir_file" style=" color:  #fffaf4"> Excluir</a>
                <div class="tool_turma_preview tooltip tooltip_up_left" >Excluir</div>

                <%}%>
                <a class="FontAwesome download up_tooltip" style=" color:  #fffaf4" onclick="DownloadAll()"> Download</a>
                <div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;" onclick="DownloaAll()"> Download</div>
                
            </div>
        </div>
    </div>
</div>