<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/Caminhos.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage<Caminhos.Models.Caminho>" %>

<asp:Content ContentPlaceHolderID="ContentPlaceHolderPrincipal" ID="ContentPlaceHolder" runat="server">

<script type="text/javascript" src="/AVA/StaticContent/Common/Scripts/ajaxfileupload(1).js<%=Url.TimeStampLink() %>"></script>
<script type="text/javascript">

    jQuery(function ($) {
        $("#ava_wrap").removeClass("painel_controle").addClass("criando");
        $("#strTitulo").limit('100', '#tituloLimite');
        $("#strDescricao").limit('800', '#textoLimite');
        $("#iTags").limit('30', '#tagLimite');        
        
        $("#ava_barralateral-direita").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
        var idRota = <%=Model.id%>;
        $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/MostraPreview/?id="+idRota+"&bolEtapa=false",            
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function (data) {  
                $("#ava_barralateral-direita").html(data)

                $('#bt_verMaisDescRota').toggle(
			        function () {      
                        $('html, body').animate({
                          scrollTop: $(".placa_verde").offset().top
                        }, 1000);                 
			            $(this).html("veja menos");
			            $("#caminhoDescr").css("display", "none")
                        $("#caminhoDescrCompleto").css("display", "")                        
			        }, function () {
                        $('html, body').animate({
                          scrollTop: $(".placa_verde").offset().top
                        }, 1000);                        
                        $(this).html("veja mais");
			            $("#caminhoDescr").css("display", "")
                        $("#caminhoDescrCompleto").css("display", "none")                        
			        }
		        );                

            },
            error: function () {
                $("#ava_barralateral-direita").html("erro ao montar preview!")
            }
        });

        $("#strTitulo").focus(function () {            
            $(this).removeClass('ava_field_alert');               
        });

        $("#strTitulo").keyup(function () {
            if ($("#strTitulo").val() == "") {
                $("#titCaminho").text("Título do Caminho");
            } else {
                $("#titCaminho").text($("#strTitulo").val());
            }
        });

        $("#strDescricao").keyup(function () {           
            if ($("#strDescricao").val() == "") {
                $("#caminhoDescr").text("Descrição do caminho");
            } else {
                $("#caminhoDescr").text($("#strDescricao").val())
            }
        });

        $("#iTags").keyup(function(e) {            
            montaTag(e, $(this).val(), 'keyup');  
        });

        $("#iTags").blur(function(e) {                     
            montaTag(e, $(this).val(), 'blur'); 
        });
        
        $(".b_tooltip_center").tooltip({
            effect: 'slide',
            position: 'top center',
            relative: true,
            events: {
                def: 'click, mouseout'
            }
        });
        
        $('.ph').addPlaceholder();        

    })
</script>

<% 
int idDono = Model.idUsuario;
int idUsuarioAtual = Convert.ToInt32(ViewData["idUsuarioLogado"]);   
%>

<section id="ava_container" class="as1">
    
    <header id="Hcaminhos">
        <!---<a href="javascript: void(0);" class=""><span class="relato lajotinha">Relatórios</span></a>---->
        <!---<a href="javascript: void(0);" class="" onclick="criar()"><span class="caminho lajotinha atual">Criar Caminho</span></a>--->
        <a href="/ava/caminhos/home/index/2" class=""><span class="caminho lajotinha">voltar para lista de caminhos.</span></a>
        <h1 class="blokletters"> Caminhos </h1><p class="blokletters">de aprendizagem</p>
    </header>
    
    <section id="ava_steps">
        <div class="step_caminhos "><a href="javascript: void(0);" onclick="editar(<%=Model.id %>);" class="caminho_atual din"><span></span>Dados do caminho</a></div>
        <div class="step_etapas"><a href="javascript: void(0);" onclick="salvarCaminho(<%=Model.idUsuario%>, <%=Model.id %>, true)" class="din"><span></span>Tarefas</a></div>
        <div class="step_conclusao"><a href="/AVA/caminhos/home/concluir/<%=Model.id %>" class="din"><span></span>Conclusão</a></div>
    </section>

    <div id="listaconteudo_caminho">
        <input type="hidden" id="idCaminho" value="<%=Model.id%>" />
        <input type="hidden" id="idUsuario" value="<%=Model.idUsuario%>" />  

        <section class="as1 ava_caminhos" id="ava_box">
        <h1>Dados do caminho</h1><!---<span class="lb_info"><a class="" href="#">&#9660; ajuda</a></span>--->
            
            <div class="caminhos_form">
                <div class="lbbloco"> 
                    <label><div class="hlabel" id="tituloCaminho">Título</div>
                    <span class="lb_info discreto">&nbsp;caracteres restantes</span><span class="lb_info discreto" id="tituloLimite"></span>
                    <input type="text" id="strTitulo" placeholder="Escreva aqui um título para o seu caminho de aprendizagem." name="titulo" class="sombra_form ph" value="<%=Model.titulo %>"></label>
                </div>
                <div class="lbbloco">
                    <label><div class="hlabel" id="descricaoCaminho">Descrição</div>
                    <span class="lb_info discreto">&nbsp;caracteres restantes</span><span class="lb_info discreto" id="textoLimite"></span>                      
                    <textarea id="strDescricao" placeholder="Digite um texto explicando aos alunos o objetivo deste caminho." rows="" cols="" name="descricao" class="sombra_form ph"><%=Model.descricao %></textarea></label>

                </div>
           
                <div class="lbbloco">
                    <label>
                        <div class="hlabel">Tags (Palavras-chave)</div>                        
                    </label>
                    <span class="lb_info discreto"><span id="tagLimite">30</span> caractere(s) restantes para esta tag</span>
                    <div class="ava_tags_box">
           		        <ul class="ava_tags">
                        <%
                            if (Model.lTag != null)
                            {
                                int cont = 1;
                                foreach (var tag in Model.lTag)
                                {
                                    %>
                                    <li id="<%=cont%>"><%=RedeSocialAVA.FuncoesTexto.ArrumaAspas(tag.strTag)%><span class="lajo_x FontAwesome"><a class="" href="javascript: void(0);" onclick="fecharTag(<%=cont%>, <%=tag.id%>, <%=Model.id%>)"></a></span></li>
                                    <%
                                    cont++;
                                }   
                            }                          
                        
                        %>
                        </ul>
                        
                        <input type="text" placeholder="Separe as tags por vírgula." id="iTags" class="sombra_form limpo discreto ph">
                        <br><span class="lb_info discreto">Use tags para facilitar a busca do caminho. Exemplos: Literatura, Mário de Andrade, Ensino Médio.</span>
                   </div>
                </div>
                <br>
                <div class="lbbloco lbopcoes">
                    <% 
                    if (Convert.ToInt32(ViewData["idEscola"]) == 3760001) //POL
                    {
                        %>
                        <div class="hlabel" style="height: 110px">Opções</div>    
                        <%
                    }
                    else
                    {
                        %>
                        <div class="hlabel">Opções</div>    
                        <%    
                    }

                            Html.RenderPartial("Partials/OpcoesCompartilhamento", new ViewDataDictionary { { "idEscola", ViewData["idEscola"] }, { "intStatus", Model.intStatus }, { "cont", 1 }, { "idCaminho", Model.id }, { "idDono", idDono }, { "idUsuarioAtual", idUsuarioAtual }, { "intTipo", 1 } });
                    %>
                </div>
            
            </div>

            <div class="nav_etapas" id="nav_etapas">
                
                <%
                if (Model.id > 0)
                {
                    %>
                    <div id="btnExcluirCaminhoSpan">
                        <a href="javascript: void(0);" class="ne-excluir large awesome awesome-red b_tooltip_center">Excluir caminho</a>
                        <span class="black_tip_center tooltip" id="tooltipExc_<%=Model.id%>">
                            <p>Deseja realmente excluir este caminho? </p>
                            <a href="javascript: void(0);" class="bt_normal green" onclick="excluirRota(<%=Model.id%>, true)">sim</a>
                            <a href="javascript: void(0);" class="bt_normal red" onclick="excluirRota(<%=Model.id%>, false)">não</a>
                            <span class="black_tip_seta">&#9660;</span>
                        </span>
                    </div>
                    <%
                }
                else
                {
                    %>
                    <div id="btnExcluirCaminhoSpan">
                        <a href="javascript: void(0);" class="ne-excluir large awesome awesome-red disable">Excluir caminho</a>
                    </div>
                    <%                    
                }
                %>
                
                <%-- <span id="btSalvarCaminhoSpan">
                    <a href="javascript: void(0);" class="ne-salvar large awesome awesome-green" id="btSalvarCaminho" onclick="salvarCaminho(<%=Model.idUsuario%>, <%=Model.id %>, false)">Salvar</a>
                </span> --%>

            </div>

        </section>

        <aside id="ava_barralateral-direita"></aside>

        <section id="ava_steps_footer">
            <a class="large awesome c-cancelar" id="btnCancelarCaminho" href="javascript: void(0);" onclick="location.href='/ava/caminhos/home/index/2'"><span class="awe_icons"></span>Cancelar</a>
            
            <a class="large awesome c-avancar" id="btnAvancarCaminho" href="javascript: void(0);" onclick="salvarCaminho(<%=Model.idUsuario%>, <%=Model.id %>, true)">Salvar e avançar<span class="awe_icons"></span></a>
        </section>

    </div>
</section>


</asp:Content>
