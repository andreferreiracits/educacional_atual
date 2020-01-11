<%@ Control Language="C#"    Inherits="System.Web.Mvc.ViewUserControl<UsuarioAVA.Models.Perseguicao>"  %>



<%
var idUsuarioLogado = (int)System.Web.HttpContext.Current.GetIdentity().IdUsuario;
    var bolAdmin = Convert.ToBoolean( ViewData["bolAdmin"] );
    var bolVisitanteEducador = Convert.ToBoolean( ViewData["bolVisitanteEducador"] );
    var bolSuspenso = Convert.ToBoolean( ViewData["bolSuspenso"] );
    
    var idSuspensaoUsuario = Convert.ToInt32( ViewData["idSuspensaoUsuario"]);

    var bolPodeTrocar = Convert.ToInt32( ViewData["bolPodeTrocar"] );
    
    var nome =  ViewData["nome_completo"];
    var nomeEscola = ViewData["nome_escola"]  ;
    var email = ViewData["email"]  ;
    var apelido = ViewData["perfil_apelido"]  ;

    var serie = ViewData["perfil_serie"]  ;
    var turma = ViewData["perfil_turma"]  ;


                var strLogin =     ViewData["strLogin"] ;
                var id =   Convert.ToInt32(  ViewData["id"] );
                var strFoto =     ViewData["strFoto"] ;
                var idSeguidor =    Convert.ToInt32( ViewData["idSeguidor"] ) ;
                var intTipoPerfil =   Convert.ToInt32( ViewData["intTipoPerfil"] );
                var bolAluno =   Convert.ToBoolean( ViewData["bolAluno"] ) ;
                var bolSigoAuto =  Convert.ToBoolean(  ViewData["bolSigoAuto"] ) ;
                var bolEducador =  Convert.ToBoolean(  ViewData["bolEducador"] ) ;
                var bolPossoSeguir =  Convert.ToBoolean(  ViewData["bolPossoSeguir"] ) ;
                var bolEstouSeguindo =   Convert.ToBoolean(  ViewData["bolEstouSeguindo"] ) ;
    


    string msg = "";
    int totalTurmas = 0 ;

    try{
        
    }
    catch(Exception e ){
        msg = e.Message;
    }



    
 %>
 

            <%
          
            
            %>

    <section id="dadosPaginaPerfil">
          <header>
     

      

         <a href="#" id="ava_editar_perfil_usuario" style="display:none;"></a>
         <input type="hidden" value="<%=strLogin %>" id="strLoginPerfil" />
         <input type="hidden" value="<%=id %>" id="idLoginPerfil" />


        <span class="ava_clips"></span>
        
        <% if ( idUsuarioLogado == id )
           {%>  
            
            <% if (bolPodeTrocar == 1 )
            {%>  
            
                <a class="alteraFoto"  onclick="AlteraFotoPerfil(<%=id%>)"  >
                    <img height="170" id="altfoto"  width="170" src="<%=strFoto%>">
                </a>

            <%}else{%>

                <a class="alteraFoto"   >
                    <img height="170" id="altfoto"  width="170" src="<%=strFoto%>">
                </a>

            <%}%>
               

        <%}%>

        <% if ( idUsuarioLogado != id )
           {%>  
        
        <% if (bolPodeTrocar == 1 )
            {%>  
            
                <a class="alteraFoto"  onclick="AlteraFotoPerfil(<%=id%>)"  >
                    <img height="170" id="altfoto"  width="170" src="<%=strFoto%>">
                </a>

            <%}else{%>

                <a class="alteraFoto"   >
                    <img height="170" id="altfoto"  width="170" src="<%=strFoto%>">
                </a>

            <%}%>


        <%}%>


        <div id="previewUpload" class="preview_upload_post preview_anx_post"  style="display:none;">
                <iframe name="UploadFoto" id="UploadFoto" style="width: 100%; height: 100%; border:0;">
                </iframe>
            </div>
                
        </header>

    </section>



         <section id="dadosPaginaPerfil_geral">

              <%if ((idSeguidor == id || Convert.ToBoolean(bolAdmin)) && intTipoPerfil != -2)
          {
          %>
            <div class="ae_tf editar_Perfil_Publico"><a href="/AVA/Mural/Home/BuscarPerfilPublico/<%=strLogin %>" class="trocafoto edit_perfil">Editar Perfil</a></div> 
            
           
          <%
          }%>


             <p>Nome Completo</p>
             <h3> <%= nome %> </h3>
             
             <p>Apelido</p>
             <h3> <%= apelido %> </h3>

            <% if (idSeguidor == id){%>
                <p>E-mail</p>
                <h4> <%= email %> </h4>
            <% } %>

              <p>Escola</p>
             <h4> <%= nomeEscola %> </h4>


             <%
             if(bolAluno){
             %>
             <p>Turma</p>
             <h4>  Série: <%= serie %> - Turma <%= turma %> </h4>


             <%}%>

            <%
            
        
        
         %>
                
        </section>
           

    <% 
    if (intTipoPerfil != -2)
    {    
    %>

       
<section id="menuCardPerfil">
    <ul>
        <%
        
        if (idUsuarioLogado == id)
        {
            %>
            <li class=""><a href="/ava/mural"><div class="icon_li mural"></div> Início</a></li>
            
            <li id="meu_perfil" class="current"><a href="/ava/Perfil/MeuPerfil"><div class="icon_li perfi"></div> Perfil</a></li>
            <%
        }
        if (bolAluno)
        {
            if (bolPossoSeguir || bolSigoAuto)
            {
            %>
            <!-- li class=""><a href="/AVA/Portfolio/Home/ListaMateriaisPublico/<%= strLogin %>"><div class="icon_li port_"></div>Portfólio</a></li> -->
            <%}
        }%>

        <% 
            if (Convert.ToInt32(ViewData["bolAVAPuro"]) == 0)
           { %>
            
        <% if (bolEducador && intTipoPerfil != -2  )
           {%>       

        <% if ( idUsuarioLogado == id )
           {%>       

            <li id="meus_arquivos">
                <a href="#"><div class="icon_li myfiles" id="btnMyFiles"></div>Meus Arquivos</a>
            </li>

        <%}%>

        <!--
            <li id="meus_blogs_ava">
                <a href="#"><div class="icon_li blog_"></div> Blog</a>
                    
            </li>
        -->
        
         <%}
           }
        if (bolVisitanteEducador && bolAluno)
        { %>
            <!--   <li><a href="/AVA/Portfolio/Home/ListaMateriaisPublico/<%=strLogin %>" class="port_"><div class="icon_li port_"></div>Portfólio</a></li> -->
            <%}
        else
        {
            if (bolAluno )
            {%>   
                <!--    <li><a href="/AVA/Portfolio/Home/ListaMateriaisPublico/<%=strLogin %>" class="port_"><div class="icon_li port_"></div>Portfólio</a></li> -->
              <%}
        }%>
        
        <li class="seguirSeguindo">
        <%
        if(id != idSeguidor){
            if(bolSigoAuto){
            %>
                <a class="s_IdoForever" href="javascript: void(0);" title="Você segue automaticamente colegas de turma e professores.">
                    <div class="fontello icoSeguindoBloqueado"></div>
                    <span class="txtSeguindoBloqueado">Seguindo</span>
                </a>
            <%
            }
            else if(bolPossoSeguir && !bolEstouSeguindo)
            {
            %>
                <a id="btseguir_perfil_<%= id %>" href="javascript: seguir(<%= idSeguidor %>, <%= id %>)">
                    <div class="fontello icoSeguir"></div>
                    seguir
                </a>
            <%            
            }
            else if(!bolPossoSeguir)
            {
            %>
                
            <%
            }
            else
            {
            %>
                <a class="segue_seguenot" id="btseguir_perfil_<%= id %>" href="javascript: parardeseguir(<%= idSeguidor %>, <%= id %>)">
                    <span class="segue_span">
                        <div class="fontello icoSeguindo"></div>
                        Seguindo
                    </span>
                    <span class="seguenot_span">
                        <div class="fontello icoPararSeguir"></div>
                        Parar de seguir
                    </span>
                </a>
            <%
            }
      

            /*
            Response.Write("bolVisitanteEducador: " + Convert.ToBoolean(bolVisitanteEducador) + "<br>");
            Response.Write("bolAdmin: " + Convert.ToBoolean(bolAdmin) + "<br>");
            Response.Write("bolSuspenso: " + Convert.ToBoolean(bolSuspenso) + "<br>");
            */
            %>
            </li>
            <li>
            <%
            
            if (Convert.ToBoolean(bolVisitanteEducador) && Convert.ToBoolean(bolAdmin))
            {
                if (Convert.ToBoolean(bolSuspenso))
                {
                %>
                    <a class="suspender_suspendernot" id="btsuspender_perfil" href="javascript:void(0)">
                        <span class="suspender_span">
                            <div class="icon_li suspender"></div>
                            Suspenso
                        </span>
                        <span class="suspendernot_span" style="display:none;" onclick="RemoverSuspensao(<%= id %>)">
                            <div class="icon_li suspendernot"></div>
                            Remover suspensão
                        </span>
                    </a>
                <%
                }
                else
                {
                %>
                    <a id="btsuspender_perfil" class="suspender_usuario" href="/AVA/Barras/Suspensao/SuspenderUsuario/<%= id %>">
                        <div class="icon_li suspender"></div>
                        suspender
                    </a>
                <%
                }
                %>
                    <input type="hidden" id="idSuspensaoUsuario" value="<%=idSuspensaoUsuario%>" />
                <%
            }
        }                        
        %>




        </li>


        <li>
            <span class="mi_actions">
        
        <%  
            if (Convert.ToBoolean(bolVisitanteEducador) == true || Convert.ToBoolean(bolAdmin) == true  )
            {
                 
                %>
                
                <a alt="Denunciar Perfil" id="ava_denunciar" href="/rede/conteudo_denuncia.asp" class="btn_cinza denunciar_perfil"><span class="denunciar_icone"></span>Denunciar</a>

                <%
                
            }
         %>
        
                
        </span>

        </li>
        
        
    </ul>





        


 <div id="previewArquivosDigaLa" class="preview_upload_post preview_anx_post"  style="display:none;">
        <iframe name="Upload" id="Upload_frame" style="width: 100%; height: 100%; border:0;">                   
        </iframe>
    </div>

</section>

   


    <input type="hidden" name="id_usuario_blog" id="id_usuario_blog" value="<%:id%>">

    <input type="hidden" name="podeVisualizarBtnCurtir" id="podeVisualizarBtnCurtir">
    


    <script>

        var cont = 0;
        var srt = '';
        var Materias = null;
        var disciplinaSelecionada = 0;
        var arraySelecionados = new Array();
        var arraySelecionadosHtml = new Array();
        var globalSelecionados = false;
        var selecionarTodosArquivos = 0;
        var ajaxGaleriaTurma = null;

       


        function callBackSuspenderUsuario() {

            if ($('#idSuspensaoUsuario').val() == "" || $('#idSuspensaoUsuario').val() == null) {
                $('#idSuspensaoUsuario').val("0");
            }

            $('form[name=frmSuspensao]').find('h2').css({ 'position': 'absolute', 'top': '-10px' });
            $('#salvar_suspensao').one("click", function () {
                if ($('#txtJustificativa').val() != "") {

                    $.ajax({
                        data: { 'strJustificativa': $('#txtJustificativa').val(), 'idUsuario': $('#idUsuarioSuspensao').val(), 'intDias': $('#intDias').val() },
                        type: "POST",
                        url: "/AVA/Barras/Suspensao/SuspenderUsuarioGravar",
                        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
                        success: function (data) {

                            $("#idSuspensaoUsuario").val(data);

                            alert("Usuário suspenso por " + $('#intDias').val() + " dias da rede social!");

                            parent.$.fancybox.close();
                            
                            var pai = $("#btsuspender_perfil").parent();
                            $("#btsuspender_perfil").remove();
                            var novoFilho = $("<div />").attr("id", "btsuspender_perfil");

                            $linkhref = "javascript: RemoverSuspensao(" + $('#idUsuarioSuspensao').val() + ")";
                            novoFilho.attr("onclick", $linkhref);
                            //$("#btseg_" + data).attr("href", $linkhref);

                            //$("#btsuspender_perfil_" + data).removeClass("suspender_usuario");
                            //$("#btsuspender_perfil_" + data).addClass("suspendernot_usuario");
                            novoFilho.addClass("suspendernot_usuario");
                            // $("#btseg_" + data).html('<span class="ava_suspenso">suspender</span>');
                            //$("#btsuspender_perfil_" + data).attr("href", $linkhref);
                            novoFilho.empty().html("<span><div class=\"icon_li suspender\"></div>Suspenso</span><span><div class=\"icon_li suspendernot\"></div>Remover suspensão</span>")
                            .children("span:first")
                            .addClass("suspender_span")
                            .css("display", "block")
                            .next()
                            .addClass("suspendernot_span")
                            .css("cursor", "pointer")
                            .css("display", "none");
                            /* $("#btsuspender_perfil_" + data).html("<span><div class=\"icon_li suspender\"></div>Suspenso</span><span><div class=\"icon_li suspendernot\"></div>Remover suspensão</span>")
                            .children("span:first")
                            .addClass("suspender_span")
                            .css("display", "block")
                            .next()
                            .addClass("suspendernot_span")
                            .css("display", "none");*/
                            //alert(novoFilho.text());
                            pai.append(novoFilho);


                        }
                    });

                } else {
                    alert("Favor preencher a justificativa!");
                    return false;
                }
            });
        }

        jQuery(function ($) {
            lightBoxAVA($('.suspender_usuario'), {
                afterShow: callBackSuspenderUsuario,
                type: "ajax" ,
                helpers: {
                    overlay: {
                        locked: false
                    }
                }
            });
        });

        jQuery(function ($) {
            $("#dadosPerfil").delegate('[id^=btsuspender_perfil]', 'mouseover', function () {
                $("[id^=btsuspender_perfil]").children("span:first").css("display", "none").next().css("display", "block");                
            });
            $("#dadosPerfil").delegate('[id^=btsuspender_perfil]', 'mouseout', function () {
                $("[id^=btsuspender_perfil]").children("span:first").css("display", "block").next().css("display", "none");                
            });
        });

        function RemoverSuspensao(idUsuario) {

            if ($('#idSuspensaoUsuario').val() == "" || $('#idSuspensaoUsuario').val() == null) {
                $('#idSuspensaoUsuario').val("0");
            }

            if (confirm('Deseja realmente remover a suspensão?')) {
                var $idSuspensaoUsuario = $('#idSuspensaoUsuario').val();
                $.ajax({
                    data: { 
                        'id': $idSuspensaoUsuario,
                        'idUsuario': idUsuario 
                    },
                    type: "POST",
                    url: "/AVA/Barras/Suspensao/RemoverSuspensao/",
                    contentType: "application/x-www-form-urlencoded;charset=ISO-8859-1",
                    async: false,
                    success: function (data) {
                        alert("Suspensão removida");


                        var pai = $("#btsuspender_perfil").parent();
                        $("#btsuspender_perfil").remove();
                        var novoFilho = $("<a />").attr("id", "btsuspender_perfil");

                        $linkhref = "/AVA/Barras/Suspensao/SuspenderUsuario/" + data;
                        novoFilho.attr("href", $linkhref);
                        //$("#btseg_" + data).attr("href", $linkhref);

                        //$("#btsuspender_perfil_" + data).removeClass("suspender_usuario");
                        //$("#btsuspender_perfil_" + data).addClass("suspendernot_usuario");
                        novoFilho.addClass("suspender_usuario");
                        // $("#btseg_" + data).html('<span class="ava_suspenso">suspender</span>');
                        //$("#btsuspender_perfil_" + data).attr("href", $linkhref);
                        novoFilho.empty().html("<div class=\"icon_li suspender\"></div>Suspender");
                        /* $("#btsuspender_perfil_" + data).html("<span><div class=\"icon_li suspender\"></div>Suspenso</span><span><div class=\"icon_li suspendernot\"></div>Remover suspensão</span>")
                        .children("span:first")
                        .addClass("suspender_span")
                        .css("display", "block")
                        .next()
                        .addClass("suspendernot_span")
                        .css("display", "none");*/
                        //alert(novoFilho.text());
                        pai.append(novoFilho);


                        lightBoxAVA($('.suspender_usuario'), {
                            afterShow: callBackSuspenderUsuario,
                            type: "ajax" ,
                            helpers: {
                                overlay: {
                                    locked: false
                                }
                            }
                        });

                        //lightBoxAVA($('.suspender_usuario'), { 'onComplete': callBackSuspenderUsuario });

                    }
                });
            }
            

        }





//IList<UsuarioAVA.Models.Turma> listaTurmas =  (IList<UsuarioAVA.Models.Turma>)ViewData["turmas"] ;
        //totalTurmas = listaTurmas.Count();


        // $("#btnMyFiles").click(function(){
        //         alert('Meus Arquivos');
        //     });


        $(document).ready(function(){


            $(".btnEditar").click(function(){
                console.log("btnEditar");
                $("#nomeEdicao").show();
                $("#nome").hide();
            });
                
            $('.bcs1').hide();

            var aluno = '<%=bolAluno%>';

            if(  aluno.indexOf("False") >= 0 ){

                $('#perfilContentPag').width('100%');
            }


            setTimeout(  function()
            { 
                $('#meus_arquivos').click(function () {
                    console.log("entrou no meus_arquivos DadosPerfilPublico.ascx");
                    escondeCaixas();
                    openTeacherFiles(1);
                    $('#meus_arquivos').addClass("current");                    
                    $('#meu_perfil').removeClass();
                    
                    var url_atual = window.location.href;
                    if(url_atual.match("Perfil/MeuPerfil#")){
                        $("#dadosPerfil").find('#podeVisualizarBtnCurtir').val(true);
                    }
                    else {
                        $("#dadosPerfil").find('#podeVisualizarBtnCurtir').val(false);
                    }

                    console.log("============url_atual======================" + url_atual);                  
                    $('#btnCurtir').hide();
                    $('.btnCurtir').hide();

                });

                $("#galeria_rodape").hide();

                $('#meu_perfil').click( function(){
                    $('.hs1').show();
                    $('.barraEsquerda').show();
                    $('.galeria_da_turma').hide();
                    $('.barraDireita').show();
                    $('#meu_perfil').addClass("current");                   
                    $('#meus_arquivos').removeClass();
                });

            }, 3000);
               $( "#previewArquivosDigaLa" ).dialog({

                        autoOpen: false,
                        height: 680,
                        width: 900,
                        modal: true,
                        resizable: false,
                        draggable: false,
                        open: function(event, ui) {
                            $(this).parent().find(".ui-dialog-titlebar").hide();
                            $(this).parent().find(".ui-dialog-buttonpane").hide();
                        },       

                    });
            $('.bcs1').hide();

        });


        function escondeCaixas(){

            $('.hs1').hide();
            $('.barraEsquerda').hide();
            $('.galeria_da_turma').show();
            $('.barraDireita').hide();

        }


        function abreAgenda(){
            setTimeout(function(){
                $('.bcs1').show();
                $("#boxAgendaReduzida").addClass("agendaReduzidaCalendario");
                }, 2000);



                  
                  // document.getElementById("MyElement").classList.add('MyClass');


                    // $("boxAgendaReduzida").removeAttr('class');

                    // document.getElementById("boxAgendaReduzida").addClass('agendaReduzidaCalendario');

                    

// if ( document.getElementById("MyElement").classList.contains('MyClass') )

// document.getElementById("MyElement").classList.toggle('MyClass');

                  // agendaReduzidaCalendario

                  // boxAgendaReduzida
            }


        function openTeacherFiles(a){
            console.log("==================openTeacherFiles =====================");
            a = parseInt(1), null != ajaxGaleriaTurma && ajaxGaleriaTurma.abort();
            var o = $("#hGaleriaMidiaTipo").val(),
            e = $("#hMesGaleriaTurmaFiltrado").val(),
            i = $("#hAssuntoGaleriaTurmaFiltrado").val(),
            r = '<div id="loader_galeria" style="padding: 20px 47%;"><img border="0" alt="carregando..." src="/AVA/StaticContent/Common/img/perfil/carregando.gif" /></div>';
             a > 1 ? $("#lista_item_galeria").append(r) : (a = 1, $("#lista_item_galeria").html(r)), ajaxGaleriaTurma = $.ajax({
            type: "POST",
            url: "/AVA/Turma/Home/GaleriaProfessor",
            data: {
                idGrupo: 0,
                idAssunto: i,
                intPaginacao: a,
                intMes: e,
                intTipoMidia: o,
                idMateria: disciplinaSelecionada,
                intAno: 0,
                visualizarBtnCurtir: false
            },
            async: !0,
            success: function (o) {
                $("#galeria_rodape").hide();

                // ListarDisciplinas("id_materia_galeria");
                //

                if ("0" != o && "-1" != o && 0 != o && -1 != o) {
                    var e = $(o);
                    $("#hPaginacaoGaleriaTurma").val(a), 1 == a ? $("#lista_item_galeria").html(e) : ($("#loader_galeria").remove(), $("#lista_item_galeria").append(e));
                    try {
                        $(".imagens_mural").addClass("select");
                        $(".imagens_mural").prepend('<span class="ava_clips_galeria_off"></span>');

                        // $('#SelecionarTodos').hide();
                        globalSelecionados = false;
                        
                    } catch (i) {
                        console.log("erro ao chamara galeria ava")
                    }
                    //:::comentei 
                    //$(".iframeVideoVimeo", e).on("load", paginaEducacional_TratamentoVimeo), $(".item_galeria_arquivos", e).mCustomScrollbar()
                } else 1 == a && $("#lista_item_galeria").html("-1" == o || -1 == o ? '<div class="feed_fitro"><p>N�o h� resultados para o filtro aplicado.</p></div>' : '<div class="feed_fitro"><p>Nenhuma mensagem encontrada.</p></div>');
                $("#loader_galeria").remove();
                $("#galeria_rodape").hide();

                //
                $(".btnGava").click(function(){
                    var bolAplicouFancy = false;
                    var bolJaVerificouAjax = true;
                    var component = $(this).parent().parent().find(".fake_galeria");                    
                    var div = $('<div class="principal" id="principal"></div>');  
                    var tipoArquivo = component.attr("data-strExtensao");               
                    $(div).append('<div class="message"><h2>Editar nome do arquivo</h2></div>'); 

                    var img = $('<img style="display:none; max-width: 630px; max-heigth: 210px;" id="JPEG" class="JPEG">'); 
                    img.attr('src', component.attr("data-path"));
                    $(div).append(img);
                    
                    $(div).append('<div style="display:none;" class="tipo_arquivo" id="tipo_arquivo"><p>.pdf</p></div>');                   

                    $(div).append('<p style="display:none;" class="erroNomeArquivo" id="erroNomeArquivo">O nome do arquivo é obrigatório</p>');

                    $(div).append('<p class="nomeImagem" id="nomeImagem">'+component.attr("data-nomearquivo")+'</p>');
                    $(div).append('<a class="btnEditarNome btn_cinza" id="btnEditarNome" class="btn_cinza" style="" href="javascript:void(0);">Editar</a>');  

                    $(div).append('<input style="display:none;" type="text" class="idarquivo" id="idarquivo" value="'+component.attr("data-idarquivo")+'">');

                    $(div).append('<input style="display:none;" type="text" class="nomeEdicao" id="nomeEdicao" value="'+component.attr("data-nomearquivo")+'">');
                    $(div).append('<br><a style="display:none;" class="btnSalvar btn_laranja" id="btnSalvar" class="btn_cor" style="" href="javascript:void(0);">Salvar</a>');

                    $.fancybox.open($(div).html());    

                    if(tipoArquivo == "JPEG"){
                        $("div.tipo_arquivo").hide();
                        $("img.JPEG").show();
                    } else{
                         $("div.tipo_arquivo").show();
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
                });

                $(document).ready(function() {
                    var component = $(".fancybox-button");
                    console.log(component);
                    $(".fancybox-button").fancybox({
                        prevEffect		: 'none',
                        nextEffect		: 'none',
                        closeBtn		: false,
                        helpers		: {
                            title	: { type : 'inside' },
                            buttons	: {}
                        }
                    });
                });

                $(".imagens_mural").click(function(){
                    //clicar na imagem
                    var idPost = $(this).attr('data-idPost');
                    var f = $(this).attr("idArquivo");
                    var b = false;
                    var arrayIdsArquivos = [];
                    var arrayArquivosDownload = [];
                    $(this).find("a").each(function(index, value){
                        arrayIdsArquivos.push($(this).attr("data-idarquivo"));
                        arrayArquivosDownload.push($(this).attr("data-path"));
                    });

                    if (arraySelecionados.length > 0) {
                        for (var c = 0; c < arraySelecionados.length; c++) {
                            if (idPost == arraySelecionados[c].IdPost) {
                                $(this).removeClass("select");
                                $(this).children("span").remove();
                                removeItem(arraySelecionados, idPost);
                                arraySelecionadosHtml.splice(c, 1);
                                b = true
                            }
                        }
                        if (!b) {
                            arraySelecionados.push({
                                "IdPost" : idPost,
                                "IdArquivos" : arrayIdsArquivos,
                                "pathArquivos" : arrayArquivosDownload
                            });

                            $(this).removeClass("select");
                            $(this).children("span").remove();
                            //--
                            $(this).find("span").remove();
    
                            $(this).addClass("select");
                            $(this).prepend('<span class="ava_clips_galeria"></span>');
                            $('#SelecionarTodos').show();
                            arraySelecionadosHtml.push($(this)[0].outerHTML)
                        }
                        else {
                            $(this).removeClass("select");
                            $(this).children("span").remove();
                            //--
                            $(this).find("span").remove();
                            $(this).addClass("select");
                            $(this).prepend('<span class="ava_clips_galeria_off"></span>');

                            if(  arraySelecionados.length == 0 ){
                                $('#SelecionarTodos').hide();
                            }
                        }
                        
                    } else {
                        arraySelecionados.push({
                            "IdPost" : idPost,
                            "IdArquivos" : arrayIdsArquivos,
                            "pathArquivos" : arrayArquivosDownload
                        });
                        $(this).removeClass("select");
                        $(this).children("span").remove();
                        $(this).find("span").remove();
    
                        $(this).addClass("select");
                        $(this).prepend('<span class="ava_clips_galeria"></span>');

                        $('#SelecionarTodos').show();

                        arraySelecionadosHtml.push($(this)[0].outerHTML)
                    }

                    if (arraySelecionados.length > 0) {
                        $(".arquivoSelecionado").slideDown()
                    }
                    if (arraySelecionados.length > 0 && globalSelecionados) {
                        VisualizaSelecionados()
                    }
                    if (arraySelecionados.length == 0) {
                        $(".arquivoSelecionado").slideUp();
                        $("#galeria_rodape").hide();
                        if (globalSelecionados) {
                            ListaArquivosBiblioteca(a, 0)
                        }
                        $(".menu_arquivos").removeClass("active");
                        $(".count_total").addClass("active")
                    } else {
                        $(".arquivoSelecionado p").html(
                            "<strong>" + arraySelecionados.length + "</strong> arquivo(s) selecionado(s)"
                        );
                        $("#galeria_rodape").show();
                    }
                });
                
                $("#galeria_rodape").hide();
                AtualizaContador();

            },
            error: function () {
                console.log("Ocorreu um erro ao galeria #################### "), $("#loader_galeria").remove()
            }
        });
    }

    

                    function aplicarExpander(campoInner, idarquivo, nomeArquivo, descricao, elemento, bolFuncTitulo) {
                        if (descricao != "") {
                            $(campoInner).find(".descricao p:last").expander({
                                expandText: "Abrir descrição",
                                userCollapseText: "Fechar descrição",
                                slicePoint: 0,
                                widow: 0,
                                expandPrefix: "",
                                beforeExpand: function (thisEl) {
                                    campoInner.find(".descricao").addClass("aberto");
                                    //console.log(thisEl);
                                },
                                onCollapse: function () {
                                    var altura = $(".descricao").height() + 20;
                                    $(".descricao").css("height", altura + "px");
                                    $(".descricao").animate({ height: "77px" }, 500, function () {
                                        $(this).css("height", "");
                                    });
                                    campoInner.find(".descricao").removeClass("aberto");
                                    $(".descricao .read-more").show();
                                }

                            });
                        }
                        $(".descricao .read-more a").append("<span class=\"FontAwesome\"></span>");
                        $(".descricao .read-less a").append("<span class=\"FontAwesome\"></span>");
                        $(".descricao p:first").after($(".descricao .read-more"));
                        if (bolFuncTitulo) {
                            funcoesTituloDescricao(campoInner, idarquivo, elemento);
                        }
                    }


    function abreUploadFileTimeLine() {
                
                var flagContinua = true;
                var objetoArquivos = {
                    arquivos: []
                };

                var objHelp = null;

                // var idArquivoMultimidia = parseInt($("#previewImagemDigaLaNovo").data("idarquivomultimidia"));
                // alert("2"+idArquivoMultimidia);
                $.fancybox.showLoading();
                // if (idArquivoMultimidia === undefined || idArquivoMultimidia == null || idArquivoMultimidia == 0) {
                    $.ajax({
                        url: "/ava/mural/home/VerificaArquivoMultimidiaTimeline",
                        dataType: "json",
                        async: false,
                        success: function (data) {


                            var erro = parseInt(data.error);
                            if (erro == 0) {
                                idArquivoMultimidia = parseInt(data.arquivomultimidia.idArquivoMultimidia);

                                objHelp = data.arquivomultimidia ;



                            } else {
                                console.log(data.msg);
                                flagContinua = false;
                                $.fancybox.hideLoading();
                            }
                        },
                        error: function (data) {
                            $.fancybox.hideLoading();
                            flagContinua = false;
                        }
                    });
                // }
                if (flagContinua) {
                    // alert("3");
                    var idsArquivosPreSelecionados = new Array();
                    if (objetoArquivos.arquivos.length > 0) {
                        for (var oi in objetoArquivos.arquivos) {

                            idsArquivosPreSelecionados.push(objetoArquivos.arquivos[oi].idArquivo);
                        }
                    }

                    // alert("Aqui");
                    
                    var param = {
                        "idFerramenta": objHelp.idArquivoMultimidia,
                        "idFerramentaTipo": objHelp.idFerramentaTipo,
                        "idsArquivosSelecionados": ""
                    };



                    var mForm;

                    // alert(" Passou Aqui");

                    try {
                        mForm = document.createElement("form");


                    } catch (ex) {
                        mForm = document.createElement("form");
                        mForm.name = "upload";
                        

                    }

                    for (var i in param) {
                        
                        if (param.hasOwnProperty(i)) {
                            var input = document.createElement('input');
                            input.type = 'hidden';
                            input.name = i;
                            input.value = param[i];
                            mForm.appendChild(input);
                        }
                    }

                    try{
                        mForm.target = "Upload";
                        mForm.method = "POST";
                        mForm.action = "/AVA/Upload";

                        document.body.appendChild(mForm);
                        $('#previewArquivosDigaLa iframe').append(mForm);

                        mForm.submit();
                        $("#previewArquivosDigaLa").dialog("open");       
                        $.fancybox.hideLoading();
                    }
                    catch(err){
                        alert(err);
                    }


                    // alert(mForm.html());

                    // document.body.appendChild(mForm);

                    // var parametros = "directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no,width=880,height=660";
                    // document.body.appendChild(mForm);
                    
                    // var parametros = "directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no,width=880,height=660";
                    
                            
                    // try{
                    //     $("#previewArquivosDigaLa iframe").append(mForm);     
                    //     // mForm.submit();     
                    //     $("#previewArquivosDigaLa").dialog("open");       
                    //     $.fancybox.hideLoading();
                    // }
                    // catch(err){
                    //     alert(err);
                    // }

                 


                }
        }

    function removeItem(b, c) {
        var a = 0;
        while (a < b.length) {
            if (b[a].IdPost == c) {
                b.splice(a, 1)
            } else {
                a++
            }
        }
        return b
    };

    function ExcluirArquivoTodos() {
            arraySelecionadosTemp = arraySelecionados.slice();
            if (arraySelecionadosTemp.length > 0) {
                for (var c = 0; c < arraySelecionadosTemp.length; c++) {             
                    var IdArquivos = arraySelecionadosTemp[c].IdArquivos;  
                    for (var x = 0; x < IdArquivos.length; x++) {
                        var idArquivo = IdArquivos[x];
                        console.log("idArquivo " + idArquivo);
                        ExcluirArquivo(idArquivo);
                    }
                    var div = "#itemGaleriea_"+arraySelecionadosTemp[c].IdPost;
                    $(div).remove();
                    arraySelecionados = new Array();
                    AtualizaContador();
                }
            }
}




     function ExcluirArrayArquivos() {
    $.fancybox({
        type: "ajax",
        href: "/ava/perfil/Home/ExcluirArrayArquivos/",
        closeBtn: false,
        padding: 0,
        helpers: {
            overlay: {
                closeClick: false,
                locked: false
            }
        },
        afterShow: function() {
            $(".fancybox-wrap .fancybox-inner").addClass("excluirPostMural");
            $("#btnExcluidMensagem").click(function(){
                ExcluirArquivoTodos();
                $.fancybox.close();
            });
            $("#btnCancelarExclusaoMensagem").click(function() {
                $.fancybox.close()
            })
        }
    })
}
    
 function ExcluirArquivoInvidual(d) {
    var b = d;
    var c = this;
    $.fancybox({
        type: "ajax",
        href: "/ava/perfil/Home/ExcluirArquivoInvidual/" + d,
        closeBtn: false,
        padding: 0,
        helpers: {
            overlay: {
                closeClick: false,
                locked: false
            }
        },
        afterShow: function() {
            $(".fancybox-wrap .fancybox-inner").addClass("excluirPostMural");
            $("#btnExcluidMensagem").click(function(){
                ExcluirArquivo(d);
                $.fancybox.close();
            });
            $("#btnCancelarExclusaoMensagem").click(function() {
                $.fancybox.close()
            })
        }
    })
}
    /* function ExcluirArquivoInvidual(d) {   
        var a = confirm("Tem certeza que deseja excluir os arquivos selecionados?");
        if(a){
 				ExcluirArquivo(d);
        }     

    };*/
        function ExcluirArquivo(d) {        
        var b = ".idArq_" + d;
        if (arraySelecionados.length > 0) {
            for (var c = 0; c < arraySelecionados.length; c++) {
                if (d == arraySelecionados[c]) {
                    removeItem(arraySelecionados, d);
                    arraySelecionadosHtml.splice(c, 1); 
                    auxArq = true
                }
            }
        }
        $.ajax({
            data   : {
                id: d
            },
            error  : function (e) {
                console.debug(e.status)
            },
            success: function (g) {
                $(b).hide(500, function () {
                    $(b).remove();                    
                });
                // ExcluirMensagemSemArquivo(d);
                
                openTeacherFiles(1);
                
                var e = $("#idFerramentaTipo").val();
                var f = {
                    idArquivo       : d,
                    idFerramentaTipo: e
                }; 
                //if (window.opener.CallbackUploadExcluidos) {window.opener.CallbackUploadExcluidos(f)}
            },
            type   : "POST",
            url    : "/AVA/Upload/Home/Excluir"
        })
    };


    function ExcluirMensagemSemArquivo(idArquivo) {
        $.ajax({
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            data       : {
                idArquivo   : idArquivo
            },
            error      : function (c) {
                console.debug(c.status)
            },
            success    : function (c) {
                console.log(c.status);
            },
            type       : "POST",
            url        : "/AVA/Turma/Home/ExcluirMensagemSemArquivo"
        })
    }

    function AtualizaContador() {        
        if (arraySelecionados.length > 0) {
            $(".arquivoSelecionado").slideDown()
            console.log("1");
        }
        if (arraySelecionados.length > 0 && globalSelecionados) {
            VisualizaSelecionados()
            console.log("2");
        }
        if (arraySelecionados.length == 0) {
            $(".arquivoSelecionado").slideUp();
            $("#galeria_rodape").hide();
            if (globalSelecionados) {
                ListaArquivosBiblioteca(a, 0)
            }
            $(".menu_arquivos").removeClass("active");
            $(".count_total").addClass("active")
            console.log("3");
        } else {
            $(".arquivoSelecionado p").html(
                "<strong>" + arraySelecionados.length + "</strong> arquivo(s) selecionado(s)"
            );
            $("#galeria_rodape").show();
            console.log("4");
        }

        console.log("arraySelecionados.length  "+ arraySelecionados.length );
    }

    function SelectAll(){
        arraySelecionados = new Array();         
        $("#lista_item_galeria div.item_galeria").find("span").remove();

        if(selecionarTodosArquivos == 0) {
            selecionarTodosArquivos = 1;
            $("#SelecionarTodos").removeClass("inactive");
            $("#SelecionarTodos").addClass("active");
            
        }
        else {
            selecionarTodosArquivos = 0;
            $("#SelecionarTodos").removeClass("active");
            $("#SelecionarTodos").addClass("inactive");
        }

        if(selecionarTodosArquivos == 1) {   
            $("#lista_item_galeria div.item_galeria div.item_imagem_galeria").prepend('<span class="ava_clips_galeria"></span>');
            // $('#SelecionarTodos').show();
            $("#lista_item_galeria div.item_galeria").each(function(index, x){
                var arrayIdsArquivos = []; 
                var arrayArquivosDownload = [];
                var idArquivo = $(this).find("div").find("a").attr("data-idarquivo");
                var pathArquivo = $(this).find("div").find("a").attr("data-path");

                if (typeof idArquivo != "undefined") 
                    arrayIdsArquivos.push(idArquivo);

                if (typeof pathArquivo != "undefined") 
                    arrayArquivosDownload.push(pathArquivo);

                var idPost = $(this).find('.item_imagem_galeria').attr('data-idpost');
                arraySelecionados.push({
                    "IdPost" : idPost,
                    "IdArquivos" : arrayIdsArquivos,
                    "pathArquivos" : arrayArquivosDownload
                });
            });
        }else{
            $("#lista_item_galeria div.item_galeria div.item_imagem_galeria").prepend('<span class="ava_clips_galeria_off"></span>');
            // $('#SelecionarTodos').hide();            
        }
        console.log("arraySelecionados.length " + arraySelecionados.length);
        if (arraySelecionados.length == 0) {
            $(".arquivoSelecionado").slideUp();
            $("#galeria_rodape").hide();            
            $(".menu_arquivos").removeClass("active");
            $(".count_total").addClass("active")
        } else {
            $(".arquivoSelecionado").slideDown()
            $("#galeria_rodape").show();
        }
        $(".arquivoSelecionado p").html("<strong>" + arraySelecionados.length + "</strong> arquivo(s) selecionado(s)");
    }    

    function VisualizarAll(){
        console.log(" entrou no VisualizarAll claudemir ");       
		    // Open customized confirmation dialog window
		    $.fancybox.open('<div class="message"><h2>Hello!</h2><img src="https://cdn4.buysellads.net/uu/1/4823/1532467799-Sentry1.png" alt="" /></div>');

        console.log(" ok openccc");
    }

    function DownloadAll(){        
        var arrayBase64 = [];
        for (var c = 0; c < arraySelecionados.length; c++) {
            var IdPost = arraySelecionados[c].IdPost;

            for (var x = 0; x < arraySelecionados[c].pathArquivos.length; x++) {
                var pathArquivo = "/AVA/Upload/Home/ForceDownload?strSrcArquivo="+arraySelecionados[c].pathArquivos[x];
                var url = arraySelecionados[c].pathArquivos[x];
                var temp = url.substring(url.indexOf('/'), url.length);
                var extensaoArquivo = temp.substring(temp.lastIndexOf('.'), temp.length);
                var nameFile = temp.substring(temp.lastIndexOf('/') + 1, temp.length);
                console.log(temp);

                toDataURL({"url": pathArquivo, "namefile":nameFile, "extensao": extensaoArquivo, "dataUrl":""}, function(data){
                    var arquivoBase64 = data.dataUrl.split(',');
                    arrayBase64.push({
                        "Name": data.namefile,
                        "Type": arquivoBase64[0],
                        "Data": arquivoBase64[1]
                    });

                    download(arraySelecionados, arrayBase64);
                });
            }
        }
    }

    function download(arraySelecionados, arrayBase64){
        var count = 0;
        for (var c = 0; c < arraySelecionados.length; c++) {
            for (var x = 0; x < arraySelecionados[c].pathArquivos.length; x++) {
                count++
            }
        }
        if(count == arrayBase64.length){
            var zip = new JSZip();
            
            for (var index = 0; index < arrayBase64.length; index++) {
                var element = arrayBase64[index];
                zip.file(element.Name, element.Data, { base64: true });    

                console.log(element.Name);

                if(index ==(arrayBase64.length-1 ) ){
                    zip.generateAsync({
                        type: 'blob'
                    }).then(function(content) {
                        saveAs(content, "Arquivos_"+(new Date()).getTime()+".zip");
                    });
                }
            }

        }
        
    }


    function toDataURL(object, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            var reader = new FileReader();
            reader.onloadend = function() {
                object.dataUrl = reader.result;
                callback(object);
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', object.url);
        xhr.responseType = 'blob';
        xhr.send();
    }

    function b64EncodeUnicode(str) {
        // first we use encodeURIComponent to get percent-encoded UTF-8,
        // then we convert the percent encodings into raw bytes which
        // can be fed into btoa.
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
        }));
    }

    



    </script>

    <% 
    }    
    %>

