<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<UsuarioAVA.Models.Usuario>" %>
<%@ OutputCache VaryByParam="None" Duration="1"%>
<% 
    string strURL = ViewData["URL"].ToString();
    string strURLEscola = ViewData["URLEscola"].ToString();
    int escolaID = (int)ViewData["EscolaID"];
    string loginID = ViewData["LoginID"].ToString();
    string link;
    int intTipoPortal;
    int bolModular;
    int bolAVAPuro;
    int bolCP;
    bool bolCPPuro;
    int bolAvaliacoes;
    int intSerie = Convert.ToInt32(ViewData["intSerie"].ToString());
    bool bolResponsavel = (bool)ViewData["bolResponsavel"];
    bool responsavelVeLip = (bool) ViewData["responsavelVeLip"];
    if (ViewData["intTipoPortal"].ToString() == null || ViewData["intTipoPortal"].ToString() == "")
    {
        intTipoPortal = 999999;
    }
    else
    {
        intTipoPortal = Convert.ToInt32(ViewData["intTipoPortal"].ToString());  
    }
    
    bool lip = false;
    /*string tema = ViewData["strTemplate"].ToString();
    string css;
    if (tema == "AVA_laranja")
    {
        css = tema;
        tema = "laranja";
        
    }
    else if (tema == "AVA_azul")
    {
        css = tema;
        tema = "azul";
    }
    else
    {
        css = tema;
        tema = "laranja";
    }*/
    //Response.Write(bolResponsavel.ToString() + " " + responsavelVeLip.ToString());
    //if (((intTipoPortal.Equals(8) || intTipoPortal.Equals(16)) && intSerie.Equals(0) && !bolResponsavel) || ((intTipoPortal.Equals(8) || intTipoPortal.Equals(16)) && intSerie >= 6) || ((intTipoPortal.Equals(8) || intTipoPortal.Equals(16)) && bolResponsavel && responsavelVeLip))
    //if (((intTipoPortal.Equals(8) || intTipoPortal.Equals(16)) && intSerie.Equals(0) && !bolResponsavel) || ((intTipoPortal.Equals(8) || intTipoPortal.Equals(16)) && intSerie >= 5) || (escolaID.Equals(20010) && (intSerie.Equals(1) || intSerie.Equals(2) || intSerie.Equals(10))))
    //{
    lip = Convert.ToBoolean(ViewData["bolAcessoLIP"]);
    //}

    bolModular      = Convert.ToInt32(ViewData["bolModular"]);
    bolAVAPuro      = Convert.ToInt32(ViewData["bolAVAPuro"]);
    bolCP           = Convert.ToInt32(ViewData["bolCP"]);
    bolCPPuro       = (bool)Session["bolCPPuro"];
    bolAvaliacoes   = Convert.ToInt32(ViewData["bolAvaliacoes"]);

    //Response.Write("bolModular: " + bolModular);
%>

<style>
    .botao_jcrop
    {
        position: absolute;
        text-align: center;
        padding: 5px;
        background-color: white;
        font-family: arial;
        bottom: -32px;
        z-index: 9999;
        font-size: 11px;
        font-weight: bold;
        border: solid 2px #FAA000;
        cursor: pointer;
    }
    .botao_jcrop.botao_jcrop_cancelar
    {
        right: 62px;
    }
    .botao_jcrop.botao_jcrop_recortar
    {
        right: 0;
    }
</style>


<script type="text/javascript" src="/edhtml/upload.js?v1"></script>
<script type="text/javascript">
    jQuery(function ($) {
        $("#ava_pic_n_user").click(function () {
            $("#ava_menu_usuario").slideToggle('slow');
        });

        $(".troca_conteudo").click(function () {
            var $id = $(this).attr("id");

            if ($id == "fund") {
                $(".ensinoMedio").hide();
                $(".ensinoFundamental").show();
            } else {
                $(".ensinoFundamental").hide();
                $(".ensinoMedio").show();
            }
        });


        fncActionsPerfil = function () {

            $('#frmPerfil').find('h2').css({ 'position': 'absolute', 'top': 0 });


            $('.mp_edt_perfil span').click(function () {
                enviarfoto($('#strPastaDestino').val(), $('#strNomeFoto').val());
            }).css('cursor', 'pointer');
            // pra cada tecla pressionada ele executa os codigos abaixo
            $('#txtSobreMim').keyup(function () {
                // crio uma variavel que seleciona os caracteres dentro do
                var num = $('#txtSobreMim').val().length;
                //se os caracteres for maior ou igual a 10
                // entao atingiu o número maximo de caracteres pemitido
                if (num > 300) {
                    //trava o textarea
                    $('#txtSobreMim').val($('#txtSobreMim').val().substring(0, 300));
                }
            });

            $('#salvar_perfil').bind('click', salvarPerfil);


            if ($('#nova_foto').val() != '') {
                $('#frmPerfil img').attr('src', $('#nova_foto').val());
                $("#strFoto").val($('#nova_foto').val());
            }

            if ($('#strApelido').val() != $('#novo_apelido').val() && $('#novo_apelido').val() != '')
                $('#strApelido').val($('#novo_apelido').val());
            if ($('#txtSobreMim').val() != $('#novo_sobremim').val() && $('#novo_sobremim').val() != '')
                $('#txtSobreMim').val($('#novo_sobremim').val());
        }

        /*$(function () {

        t = $('#ava_editar_perfil_usuario');
        o = { 'autoDimensions': false, 'width': 600, 'height': 260, 'onComplete': fncActionsPerfil }

        t.click(function () { $("#ava_menu_usuario").slideUp('fast'); });

        lightBoxAVA(t, o);
        /*var linkCSS = "/AVA/StaticContent/Content/TES/css/";
        $("#cssAVA").attr("href", linkCSS + "<=tema %>.css");*/

        /*});*/
    });
    function salvarPerfil() {
        $('#salvar_perfil').unbind('click', salvarPerfil);
        //alert('oi');

        $.post("/AVA/Mural/Home/SalvarPerfil", { 'ts': new Date().getDate(), 'idUsuarioRequest': '<%:Model.id%>', 'idPerfil': $("#idPerfil").val(), 'strApelido': $("#strApelido").val(), 'strEmail': $("#strEmail").val(), 'strTexto': $("#txtSobreMim").val(), 'strFoto': $("#strFoto").val(), 'charSexo': $("#charSexo").val(), 'strSeries': $("#strSeries").val() }, function (data) {
            if ($("#txtSobreMim").val() != '') {
                $('#texto_sobre_mim').hide().html('<strong>Sobre mim</strong><br>' + $("#txtSobreMim").val()).fadeIn();
            } else {
                $('#texto_sobre_mim').hide().html('').fadeIn();
            }
            if ($('#strApelido').val() != '') {
                $('#meu_nome_rs').text($('#strApelido').val());
            } else {
                $('#meu_nome_rs').text($('#strNomeInicial').val());
            }

            //$('#fancybox-close').click();
            $.fancybox.close();
            //muda minithumb
            $('#ava_user').find('img').attr('src', $('#strFoto').val().substring(0, $('#strFoto').val().lastIndexOf('/')) + '/minithumb' + $('#strFoto').val().substring($('#strFoto').val().lastIndexOf('/'))).hide().fadeIn();
            $('#dadosPerfil').find('img').attr('src', $('#strFoto').val()).hide().fadeIn();

        });

    }

    function enviarfoto(strCaminho, strArquivo) {
        UploadUmArquivo('strFoto', 'frmPerfil', strCaminho, strArquivo, 'gif,bmp,jpg,jpeg,png', 'muda');
    }

    function muda() {
        var a_foto = $('#strFoto').val();
        $('#novo_apelido').val($('#strApelido').val());
        $('#novo_sobremim').val($('#txtSobreMim').val());

        fncActionsCrop = function () {
            $('.fancybox-inner').after('<div id="meu_cancela" class="botao_jcrop botao_jcrop_cancelar">cancelar</div><div id="meu_recorte" class="botao_jcrop botao_jcrop_recortar">recortar</div>');

            var imgPreloader = new Image();
            imgPreloader.onload = function () {

                $('#fancybox-img').Jcrop({
                    onSelect: 'showCoords',
                    bgColor: '#0099CC',
                    bgOpacity: .8,
                    aspectRatio: 13 / 13,
                    onSelect: showCoords,
                    trueSize: [imgPreloader.width, imgPreloader.height]
                });

                $('#meu_recorte').click(function () {
                    recorta(a_foto);
                });
                $('#meu_cancela').click(function () {
                    cancelaCrop(a_foto);
                });
            }
            imgPreloader.src = a_foto;
        }

        var t = $('#ava_editar_perfil_usuario');
        var o = {
            afterShow: fncActionsCrop,
            type: "ajax",
            helpers: {
                overlay: {
                    locked: false
                }
            }
        };

        t.attr('href', a_foto);
        lightBoxAVA(t, o);
        t.click();
    }

    x = 0;
    y = 0;
    w = 0;
    h = 0;
    function showCoords(c) {
        x = c.x;
        y = c.y;
        w = c.w;
        h = c.h;
    }

    function recorta(foto) {

        if (w == '' || w < 1 || h == '' || h < 1) {
            alert('Selecione uma Área da imagem para recorte.');
            return false;
        }

        $('.botao_jcrop').remove();
        $.post("/rede/recorte.asp", { 'strFoto': foto, 'x': x, 'y': y, 'w': w, 'h': h, 'crop': 1 }, function (data) {

            t = $('#ava_editar_perfil_usuario');
            o = {
                autoSize: false,
                type: "ajax",
                width: 600,
                height: 260,
                afterShow: fncActionsPerfil,
                helpers: {
                    overlay: {
                        locked: false
                    }
                }
            };

            t.attr('href', '/rede/conteudo_perfil.asp');
            $('#nova_foto').val(data);
            lightBoxAVA(t, o);
            t.click();

            //$('#strApelido').val($_clone_strApelido);
            //$('#txtSobreMim').val($_clone_txtSobreMim);

        });
    }

    function cancelaCrop(foto) {
        $('.botao_jcrop').remove();
        $.post("/rede/recorte.asp", { 'strFoto': foto, 'crop': 0 }, function (data) {
            t = $('#ava_editar_perfil_usuario');
            o = {
                autoSize: false,
                type: "ajax",
                width: 600,
                height: 260,
                afterShow: fncActionsPerfil,
                helpers: {
                    overlay: {
                        locked: false
                    }
                }
            };

            t.attr('href', '/rede/conteudo_perfil.asp');
            $('#nova_foto').val(data);
            lightBoxAVA(t, o);
            t.click();
        });
    }

    //notificacoes
    $(function () {
        //TOTAL DE NOTIFICACOES
        //        _total = 0
        //        $.get('/AVA/Mural/Home/ContaNotificacoes/' + $('#ava_user').attr('ident'), { "ts": new Date().getTime() }, function (data) {
        //            if (Number(data) > 0) {
        //                $('#vw_notif').removeClass('span_vazio').text(data);
        //                _total = Number(data);
        //            }
        //        });

        //        _notif_click = null;
        //        $('#vw_notif').mouseenter(function () {
        //            //LISTA AS NOTIFICACOES

        //            $.get('/AVA/Mural/Home/NotificacoesTop/' + $('#ava_user').attr('ident'), { "ts": new Date().getTime() }, function (data) {
        //                $('#ava_user').find('.noti_li').append(data);
        //                //MARCA QUE O USUARIO JA SABE DAS NOTIFICACOES

        //                $.get('/AVA/Mural/Home/Notifica/' + $('#ava_user').attr('ident'), { "ts": new Date().getTime() }, function (data) {
        //                    if (_total > 0) {
        //                        $('#vw_notif').fadeOut('fast').text('').addClass('span_vazio').fadeIn('fast');
        //                        _total = 0;
        //                    }
        //                });
        //            });
        //        });


        //        $('ul.drop_notif').mouseleave(function (e) {
        //            $(this).fadeOut("fast", function () {
        //                $(this).remove();
        //            });
        //            e.preventDefault();
        //        });
    });


    
</script>

<nav class="centralizaclass">
        <ul id="ava_home-menu" class="menunav">
        <!-- /AVA/StaticContent/Common/img/perfil/avatar.jpg -->
            <li class="first">
                <a class="ava_logoEduca" title="Início" href="/ava/mural"></a>                   
            </li>

            <%if (bolAVAPuro == 0)
              { %>
            <li class="last">
                <a href="javascript:void(0);" id="ava_acessorapido">&#9660; Menu</a>
                 <div id="ava_dropdown" style="display:none;">
                        <div class="cenario_menu">&#9660; MENU</div>
                 <div id="dropdown_header" class="clearfix">
                                        <a href="#" class="bt_normal"  title="veja tudo" alt="veja mais">veja tudo</a>
                    
                        <form target="_top" onsubmit="return pesquisa_valida(this)" method="post" action="http://www.educacional.com.br/pesquisa/respostapalavra.asp?pg=1&amp;tp=nova" name="fBusca">  
                            <input type="text" onblur="blurPesquisa()" onfocus="focoPesquisa()" class="campo" value="Pesquisar" id="strpc_topo" name="strpc_topo">
                            <div class="bt_geral"><input type="submit" class="okP" value="Buscar" id="go_button" name="go_button"></div>             
               
                
                            <input type="hidden" value="1" name="IdAssunto">
                            <input type="hidden" value="" name="IdPapel">
                            <input type="hidden" value="" name="IdSerie">
                            <input type="hidden" value="1" name="intRadTipo">
                            <input type="hidden" value="30" name="sintTop">
                            <input type="hidden" value="x" name="bEncEnciclopedia">
                            <input type="hidden" value="x" name="bArtigo">
                            <input type="hidden" value="x" name="bEntrevista">
                            <input type="hidden" value="x" name="bReportagem">
                            <input type="hidden" value="x" name="bForum">
                            <input type="hidden" value="x" name="bClassico">
                            <input type="hidden" value="x" name="bClassicoAutor">
                            <input type="hidden" value="x" name="bClassicoGeral">
                            <input type="hidden" value="x" name="bEducacionalRecomenda">
                            <input type="hidden" value="x" name="bAtlas">
                            <input type="hidden" value="x" name="bConteudoMultimidia">		
                            <input type="hidden" value="x" name="bBancoImagem">
                            <input type="hidden" value="x" name="bEncBancoImagens">
                            <input type="hidden" value="x" name="bEncaminhamento">
                            <input type="hidden" value="x" name="bEncVerbos">
                            <input type="hidden" value="x" name="bEncMunicipios">
                            <input type="hidden" value="x" name="bEncBancoVoz">
                            <input type="hidden" value="x" name="bLegislacao">
                            <input type="hidden" value="x" name="bSaibaMais">
                            <input type="hidden" value="x" name="bSite">
                            <input type="hidden" value="x" name="bSiteGeral">
                            <input type="hidden" value="x" name="bPEServicos">
                            <input type="hidden" value="x" name="bEnciclopedia">
                            <input type="hidden" value="x" name="bMundoDaCrianca">
                            <input type="hidden" value="x" name="bLinhaDoTempo">
                            <input type="hidden" value="x" name="bDicAurelio">
                            <input type="hidden" value="x" name="bMuseuVirtual">
                            <input type="hidden" value="x" name="bLinguaEstrangeira">
                            <input type="hidden" value="x" name="bBlog">
                            <input type="hidden" value="x" name="bInterpretando">

           	            </form>
                    
                        </div>
             
                        <div id="dropdown_filtrado" class="clearfix">
                    

                        <ul>
                            <lh>para educadores</lh>
                            <li>Aulas para telão</li>
                            <li>Avaliações</li>
                            <li>Blog</li>
                            <li>Canal direto</li>
                            <li>Criador de fóruns</li>
                            <li>Criador de olimpíadas</li>
                        </ul>
                    
                        <ul>
                            <lh>para autoria</lh>
                            <li>Arte</li>
                            <li>Avaliações</li>
                            <li>Construtor de páginas</li>
                            <li>Eleições virtuais</li>
                            <li>Fabrica de textos</li>
                            <li>Livro do ano</li>
                        </ul>
                    
                        <ul>
                            <lh>conteúdo e referência</lh>
                            <li>banco de imagens</li>
                            <li>Avaliações</li>
                            <li>Construtor de páginas</li>
                            <li>Eleições virtuais</li>
                            <li>Fabrica de textos</li>
                            <li>Livro do ano</li>
                        </ul>
                    
                        <ul>
                            <lh>central de projetos</lh>
                            <li>eixos</li>
                            <li>inscrições e gerenciamento</li>
                            <li>tipos de projeto</li>
                            <li>certificados</li>
                            <li>anos anteriores</li>
                            <li>ajuda</li>
                        </ul>

                        </div>
                        <div id="dropdown_dinamico" class="clearfix">
                                <ul>
                            <lh>em alta</lh>
                            <li>asdfasdf</li>
                            <li>asdfasdfasdf</li>
                            <li>asdfasdfasdf</li>
                            <li>asdfasdfasdf</li>
                        </ul>
                            <ul>
                            <lh>últimos acessados</lh>
                            <li>asdfasdf</li>
                            <li>asdfasdf</li>
                            <li>asdfasdf</li>
                            <li>asdfsadf</li>
                        </ul>
                        </div>
                </div>
            </li>
            <%} %>
            <!--<li><a href="javascript: void(0);"><img src="<%: Model.strMiniFoto %>" width="33" height="33" /> &#9660; <%: Model.strNome %></a></li>-->
        </ul>
        <ul class="menunav" id="ava_logout">
            <li><a href="javascript: logoutAVA();">Sair</a></li>
        </ul>
        <!--<ul id="ava_notifica" class="menunav">
            <li>
                <a href="#">
                    <span class="alo">2</span>
                </a>
            </li>
        </ul>-->
                
        <!--<ul id="ava_servicos" class="menunav">
            <li class="first"><a href="#">&#9660; Atividades</a></li>
            <li><a href="#">&#9660; Disciplinas</a></li>
            <li><a href="#">&#9660; Central de Projetos</a></li>
            <li class="last"><a href="#">Livro Integrado Positivo</a></li>
        </ul>-->
        <ul class="menunav" id="ava_servicos">
            <li class="first ava_ativ">
                <a href="javascript:void(0);">&#9660; Atividades</a>
                <ul class="sub_menunav">
                    <div class="cenario_menu">&#9660; Atividades</div>
                    <%
                        /*if (Model.papelUsuario.bolPai)
                        {
                            link = "javascript:atualizaVersaoUsuarioAVA();";
                        }
                        else
                        {
                            link = "/avaliacoesonline";
                        }*/
                        link = "/avaliacoesonline";
                        
                        if ( (bolAVAPuro == 1 && bolAvaliacoes == 1) || (bolAVAPuro == 0) )
                        {
                            %>
                                <li><a href="<%=link %>">Avaliações</a></li>
                            <% 
                        }
                                       
                    if (Model.papelUsuario.bolEducador || Model.papelUsuario.bolAluno)
                    {
                        %>
                        <li><a href="/ava/caminhos/home/index/2">Caminhos de aprendizagem</a></li>
                        <li><a href="/ava/caminhos/home/index/1">Tarefas</a></li>
                        <%    
                    }    
                    %> 
                </ul>
                    
            </li>

            <%if (bolAVAPuro == 0) { %>
            <li class="ava_cont">
                <a href="javascript:void(0);">&#9660; Conteúdos</a>
                <ul class="sub_menunav sub_menuconteudos ensinoMedio">
                    <div class="cenario_menu">&#9660; Conteúdos</div>
                    <!--<li class="mega_header clearfix">                                 
                        
                        <a href="javascript:void(0);" id="fund" class="troca_conteudo troca_ensFund">Fundamental II</a>
                        <a href="javascript:void(0);" id="ensMed" class="troca_conteudo atual troca_ensMed">Ensino Médio</a>
                    </li>-->
                    

                    <%
                  //Fundamental 1
                  List<int> arrSerieFundamental = new List<int>();
                  arrSerieFundamental.Add(1);
                  arrSerieFundamental.Add(2);
                  arrSerieFundamental.Add(3);
                  arrSerieFundamental.Add(4);
                  arrSerieFundamental.Add(9);
                  arrSerieFundamental.Add(12);
                  arrSerieFundamental.Add(13);
                  arrSerieFundamental.Add(14);
                  arrSerieFundamental.Add(15);
                  arrSerieFundamental.Add(16);
                                   
                  if (arrSerieFundamental.Contains(intSerie))
                  {
                  %>
                    <!-- Fundamental 1 -->
                    <li class="mega_menunav clearfix">
                        <div class="mega_containers">
                            <a href="/ava/Conteudos/Home/Index/Arte">Arte</a>
                            <a href="/ava/Conteudos/Home/Index/Ciencias">Ciências</a>
                            <a href="/ava/Conteudos/Home/Index/EducacaoFisica">Educação Física</a>
                            <a href="/ava/Conteudos/Home/Index/Geografia">Geografia</a>
                        </div>
                        <div class="mega_containers">
                            <a href="/ava/Conteudos/Home/Index/Historia">História</a>
                            <a href="/ava/Conteudos/Home/Index/LinguaInglesa">Língua Inglesa</a>
                            <a href="/ava/Conteudos/Home/Index/LinguaPortuguesa">Língua Portuguesa</a>
                            <a href="/ava/Conteudos/Home/Index/Matematica">Matemática</a>
                        </div>
                    </li>
                    <%  
                  }
                  //Fundamental 2
                  else if (intSerie >= 5 && intSerie <= 8)
                  {
                  %>
                    <!-- Fundamental 2 -->
                    <li class="mega_menunav clearfix">
                        <div class="mega_containers">
                            <a href="/ava/Conteudos/Home/Index/Arte">Arte</a>
                            <a href="/ava/Conteudos/Home/Index/Ciencias">Ciências</a>
                            <a href="/ava/Conteudos/Home/Index/EducacaoFisica">Educação Física</a>
                            <a href="/ava/Conteudos/Home/Index/Fisica">Física</a>
                            <a href="/ava/Conteudos/Home/Index/Geografia">Geografia</a>

                        </div>
                        <div class="mega_containers">
                            <a href="/ava/Conteudos/Home/Index/História">História</a>
                            <a href="/ava/Conteudos/Home/Index/LinguaInglesa">Lingua Inglesa</a>
                            <a href="/ava/Conteudos/Home/Index/LinguaPortuguesa">Lingua Portuguesa</a>
                            <a href="/ava/Conteudos/Home/Index/Matematica">Matemática</a>
                            <a href="/ava/Conteudos/Home/Index/Quimica">Química</a>

                        </div>
                    </li>
                  <%
                  }
                  //Ensino medio, responsável e educador
                  else
                  {
                  %>
                        <li class="mega_menunav clearfix">
                            <div class="mega_containers">
                                <p><span class="aConhe ac_1"> Matemática e suas tecnologias</span></p>
                                <a href="/ava/Conteudos/Home/Index/Matematica">Matemática</a>
                                <p><span class="aConhe ac_4">Linguagem e códigos</span></p>
                                <a href="/ava/Conteudos/Home/Index/Arte">Arte</a>
                                <a href="/ava/Conteudos/Home/Index/EducacaoFisica">Educação Física</a>
                                <a href="/ava/Conteudos/Home/Index/LinguaInglesa">Língua Inglesa </a>
                                <a href="/ava/Conteudos/Home/Index/LinguaPortuguesa">Língua Portuguesa</a>
                                

                            </div>
                           
                            <div class="mega_containers">
                                
                                <p><span class="aConhe ac_2">Ciências da Natureza</span></p>
                                <a href="/ava/Conteudos/Home/Index/Biologia">Biologia</a>
                                <a href="/ava/Conteudos/Home/Index/Fisica">Física</a>
                                <a href="/ava/Conteudos/Home/Index/Quimica">Química</a>
                                <p> <span class="aConhe ac_3">Ciências Humanas </span></p>
                                <a href="/ava/Conteudos/Home/Index/Filosofia">Filosofia</a>
                                <a href="/ava/Conteudos/Home/Index/Geografia">Geografia</a>
                                <a href="/ava/Conteudos/Home/Index/Historia">História</a>
                                <a href="/ava/Conteudos/Home/Index/Sociologia">Sociologia</a>
                            </div>
                           

                               


                        </li>
                  <%
                  }
            
                    %>  
                        	
                </ul>

                <ul class="sub_menunav sub_menuconteudos ensinoFundamental" style="display:none;">
                    		
                    <li class="mega_header clearfix">                                 
                        
                        <a href="javascript:void(0);" id="A1" class="troca_conteudo atual troca_ensFund">Fundamental II</a>
                        <a href="javascript:void(0);" id="A2" class="troca_conteudo troca_ensMed">Ensino Médio</a>
                    </li>
                    <li class="mega_menunav clearfix">
                    
                    <a href="/ava/Conteudos/Home/Index/Arte">Arte</a>                    
                    <a href="/ava/Conteudos/Home/Index/Filosofia">Filosofia</a>
                    <a href="/ava/Conteudos/Home/Index/Fisica">Física</a>
                    <a href="/ava/Conteudos/Home/Index/Geografia">Geografia</a>
                    <a href="/ava/Conteudos/Home/Index/Historia">História</a>
                    <a href="/ava/Conteudos/Home/Index/LinguaEspanhola">Língua Espanhola </a>
                    <a href="/ava/Conteudos/Home/Index/LinguaInglesa">Língua Inglesa </a>
                    <a href="/ava/Conteudos/Home/Index/LinguaPortuguesa">Língua Portuguesa</a>
                    <a href="/ava/Conteudos/Home/Index/Matematica">Matemática</a>   
                    <a href="/ava/Conteudos/Home/Index/Quimica">Química</a>          
                    <a href="/ava/Conteudos/Home/Index/Sociologia">Sociologia</a>          
                    
                    </li>                    	
                </ul>                  
            </li>
            <%} %>
            
            <%
                if ((bolAVAPuro == 0 && bolModular == 0) || (bolCP == 1 && bolAVAPuro == 1)) 
                //  if (bolAVAPuro == 0 && bolModular == 0)
                { %>
                <li class="ava_cp <%= lip == false ? "last" : "" %>">
                    <a href="javascript:void(0);">&#9660; Central de Projetos</a>
                    <ul class="sub_menunav">
                        <div class="cenario_menu">&#9660; Central de Projetos</div>
                        <li><a href="/cp"><span class="pagina_inicial_icon"></span>Página Inicial</a></li>
				        <li><a href="/cp/eixos">Eixos</a></li>
				        <li><a href="/cp/gerenciador">Inscrições e gerenciamento</a></li>
				        <li><a href="/cp/tiposdeprojeto">Tipos de projeto</a></li>
				        <li><a href="/cp/certificados">Certificados</a></li>
				        <li><a href="/cp/anosanteriores">Anos anteriores</a></li>
                        <li><a href="/cp/ajuda">Ajuda</a></li>                       
                    </ul>
                </li>
            <%  } %>
            <%
               
                if (lip && bolAVAPuro == 0)
                {
                
            %>

            <li class="last ava_lip">
                <a href="javascript:loginPositivoON();"><span class="lip"></span>Positivo</a>
                <!--<ul class="sub_menunav ">
                    <div class="<if(bolModular == 0){ %>cenario_menu<} else{ %>cenario_menu_modular<} %>">&#9660; Livro Integrado</div>
                    <li class="mega_menunav menu_lip clearfix">
                        <div id="carregarLIP"></div>
						<!--<img src="/ava/StaticContent/Common/img/perfil/deletar.png" alt="avater_menor">--
                    </li>
                </ul>-->
                    
            </li>
            <%
                }
            %>
            <!--<li class="last ava_lip">
                <a href="#"><span class="lip"></span>&#9660; Livro Integrado</a>
                <ul class="sub_menunav ">
                    		
                    <li class="mega_menunav menu_lip clearfix">
                    <div class="mega_containers">
                        <a href="#">Matemática</a>
                    <a href="#">Biologia</a>
                    <a href="#">Física</a>
                    <a href="#">Química</a>
                    <a href="#">Geografia</a>
                    <a href="#">Arte</a>
                    </div>
                           
                    <div class="mega_containers">

                    <a href="#">Educação Física </a>
                    <a href="#">Língua Espanhola </a>
                    <a href="#">Língua Inglesa </a>
                    <a href="#">Língua Portuguesa</a>
                    <a href="#">História</a>
                            
                    </div>
                           
                           


                    </li>
                            
                        	
                </ul>
                    
            </li>-->
        </ul>
                
        <ul id="ava_temas" class="menunav">
            <li>
            <a rel="AVA_laranja" href="#" class="trocarTemas"></a>
                <ul class="sub_menunav">
                    <li><a rel="AVA_laranja" href="#" class="trocarTemas"></a></li>
                    <li><a rel="AVA_azul" href="#" class="trocarTemas"></a></li>
                    <li><a rel="AVA_verde" href="#" class="trocarTemas"></a></li>
                </ul>
            </li>
        </ul>
        <%
            string strNome;
            if (Model.strApelido.Equals("") || Model.strApelido == null)
            {
                strNome = Model.strNome;
            }
            else
            {
                strNome = Model.strApelido;
            }    
         %>
        <ul class="menunav" id="ava_user" ident="<%:Model.id%>">
            <li class="user_li">
                <a href="#" id="ava_pic_n_user">
                    <img width="33" height="33" alt="avater_menor" src="<%: Model.strMiniFoto %>"> &#9660; <span id="nameUser"><%: strNome %></span>
                </a>
                <ul class="sub_menunav"  >
                            <li><a href="<%=strURL%>/rd/gravar.asp?servidor=<%=strURLEscola%>&url=/default.asp" target="_blank">Home da escola</a></li>
                            <li><a href="/AVA/Perfil/MeuPerfil">Perfil</a> 
                            
                            </li>
                            <%if (bolAVAPuro == 0) { %>
                            <li><a href="<%=strURL%>/webmail/webmail.asp">Webmail</a></li>
                            <%} %>                            
                            <li><a target="_blank" href="https://positivote.zendesk.com/hc/pt-br/categories/360000878631-Educacional">Central de ajuda</a></li>
                            <li><a href="javascript: logoutAVA()">Sair</a></li>
                        </ul>

            </li>
            <li class="noti_li">
                <a class="span_red span_vazio" id="vw_notif" href="#"></a>
                
            </li>
        </ul>
                
        <!--<ul id="ava_acessorapido" class="menunav">
            <li><a href="#">&#9660; Acesso Rápido</a></li>
        </ul>-->

        
                
        <div id="ava_login_ava" style="display:none">
            <label>Login:</label><input name="q" class="form-login" title="Username" value="" size="15" maxlength="2048" />
            <label>Senha:</label><input name="q" type="password" class="form-login" title="Password" value="" size="15" maxlength="2048" />
        </div>
    </nav>
<!--div id="ava_menu_usuario" style="width: 200px; height: 130px; background-color: #FFF;
    z-index: 99999; position: absolute; margin-left: 700px; top: 60px; border-radius: 6px 6px 6px 6px;
    box-shadow: 2px 2px 0 #797B7C; display: none;">
    <nav>
            <ul style="list-style: none outside none;">
                <li style="height: 10px; padding-left: 10px; padding-bottom: 10px; margin-top: 10px; border-bottom: 1px solid #CCCCCC;cursor:pointer;"><a href="/AVA/Perfil/MeuPerfil">Perfil</a></li>
                <li style="height: 10px; padding-left: 10px; padding-bottom: 10px; margin-top: 10px; border-bottom: 1px solid #CCCCCC;"><a href="<%=strURL%>/webmail/webmail.asp" target="_blank">Webmail</a></li>
                <li style="height: 10px; padding-left: 10px; padding-bottom: 10px; margin-top: 10px; border-bottom: 1px solid #CCCCCC;"><a href="<%=strURL%>/rd/gravar.asp?servidor=<%=strURLEscola%>&url=/default.asp">Home da escola</a></li>
                <li style="height: 10px; padding-left: 10px; padding-bottom: 10px; margin-top: 10px; border-bottom: 1px solid #CCCCCC;"><a href="/ava/login/login/home/logout">Sair</a></li>
            </ul>
        </nav>
   
</div-->
 <input type="hidden" id="nova_foto" value="" />
    <input type="hidden" id="novo_apelido" value="" />
    <input type="hidden" id="novo_sobremim" value="" />

