<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<List<Upload.Models.Arquivo>>" %>


<script type="text/javascript" src="http://stuk.github.io/jszip-utils/dist/jszip-utils.js"></script>
<script type="text/javascript" src="<%=Url.CDNLink("/Common/Scripts/jszip_2.0.0.js") %><%=Url.TimeStampLink() %>"></script>
<script type="text/javascript" src="<%=Url.CDNLink("/Common/Scripts/FileSaver.js") %><%=Url.TimeStampLink() %>"></script>

<%
    if (Model != null)
    {
        foreach (var item in Model)
            Html.RenderPartial("Partials/GaleriaMeusArquivos", item, ViewData);
    }


%>

<script>
    $(document).ready(function(){        
                $(".editar").on("click",function(){
                    console.log("btnGava");
                    var bolAplicouFancy = false;
                    var bolJaVerificouAjax = true;
                    var component = $(this).parent().parent().parent().find(".fake_galeria");    
                    console.log(component);                
                    var div = $('<div class="principal" id="principal"></div>');  
                    var tipoArquivo = component.attr("data-strextensao"); 
                      


                    var img = $('<img style="display:none; max-width: 410px; max-heigth: 170px;" id="JPEG" class="JPEG">'); 
                    img.attr('src', component.attr("data-path"));
                    $(div).append(img);
                    
                    $(div).append('<div style="display:none;" class="tipo_arquivo" id="tipo_arquivo"><p>.pdf</p></div>');                   

        

                    $(div).append('<p class="nomeImagem" id="nomeImagem">'+component.attr("data-strExtensaoReal")+'</p>');
                   

                    $(div).append('<input style="display:none;" type="text" class="idarquivo" id="idarquivo" value="'+component.attr("data-idarquivo")+'">');

                    $(div).append('<input style="display:none;" type="text" class="nomeEdicao" id="nomeEdicao" value="'+component.attr("data-nomearquivo")+'">');
                    
                    $.fancybox.open($(div).html());   

                    if(tipoArquivo == "JPEG" ){
                        $("img.JPEG").show();
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
                });
    });

</script>
<div id="galeria_rodape">
    <div class="container">
        <div class="arquivoSelecionado" id="galeria_rodape_contador">
            <p style="color: #fffaf4"></p>
        </div>
        <div id="galeria_rodape_botoes" >
            <div class="arq_menu_links" > 

                <a href="javascript:void(0);" class="FontAwesome excluir up_tooltip" onclick="ExcluirArrayArquivos()" id="excluir_file" style=" color:  #fffaf4"> Excluir</a>
                <div class="tool_turma_preview tooltip tooltip_up_left" >Excluir</div>
                
                <a class="FontAwesome download up_tooltip" style=" color:  #fffaf4" onclick="DownloadAll()"> Download</a>
                <div class="tool_turma_preview tooltip tooltip_up_left" style="display: none;" onclick="DownloaAll()"> Download</div>
                
            </div>
        </div>
    </div>
</div>