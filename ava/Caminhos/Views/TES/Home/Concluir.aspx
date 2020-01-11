<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/Caminhos.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage<Caminhos.Models.Caminho>" %>

<asp:Content ContentPlaceHolderID="ContentPlaceHolderPrincipal" ID="ContentPlaceHolder" runat="server">

<script type="text/javascript">
    jQuery(function ($) {

        //$.getScript("/AVA/StaticContent/Common/Scripts/jquery.seletorAVA_3.0.2.js<%=Url.TimeStampLink() %>"); 

        $("#ava_wrap").removeClass("painel_controle").addClass("criando");
        $("#ava_barralateral-direita").html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");
        
        var idRota = <%=Model.id%>;

        $.ajax({
            type: "POST",
            url: "/AVA/Caminhos/Home/MostraPreviewConclusao/?id="+idRota+"&bolEtapa=false",            
            contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
            success: function (data) {  
                $("#ava_barralateral-direita").css("margin-left", "0px").html(data);
                
                $('#bt_verMaisDescRota').toggle(
			        function () {      
                        $('html, body').animate({
                          scrollTop: $(".placa_verde").offset().top
                        }, 1000);                 
			            $(this).html("ocultar");
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
                $("#ava_barralateral-direita").html("erro ao montar preview!");
            }
        });
        
        $(".arrastaveisAtivo").sortable({
            stop: function(event, ui){
                $(".arrastaveis").find(".e-fim").each(function(){
					$(this).removeClass("e-fim");
				});
				$(".arrastaveis").children(":last").addClass("e-fim");
                var i = 1;               

                $(this).find("li").each(function () {
				    var idEtapa = $(this).attr("idetapa");
                    
                    $.ajax({
                        url: "/AVA/Caminhos/home/salvarOrdemEtapa/?idEtapa=" + idEtapa + "&ordem=" + i,
                        contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
                        async: false,
                        success: function (data) {                           
                        },
                        error: function (data) {
                            alert("Erro: " + data.status);
                        }
                    });                    
                    i++;
				});
            }
        }).disableSelection();

        $(".e-titulo").mouseover(function(){
            $(this).css("cursor", "move");
        })
        .mouseout(function(){
            $(this).css("cursor", "none");
        });       

    });
</script>

<section id="ava_container" class="as1">
    
    <header id="Hcaminhos">
        <!---<a href="javascript: void(0);" class=""><span class="relato lajotinha">Relatórios</span></a>---->
        <!---<a href="javascript: void(0);" class="" onclick="criar()"><span class="caminho lajotinha atual">Criar Caminho</span></a>--->
        <a href="/ava/caminhos/home/index/2"><span class="caminho lajotinha">voltar para lista de caminhos.</span></a>
        <h1 class="blokletters"> Caminhos </h1><p class="blokletters">de aprendizagem</p>
    </header>

    <section id="ava_steps">
    <%
        bool podeEditarCaminhoBarra = true;
        int qtdEtapa = Model.lEtapa.Count();

        if (qtdEtapa > 0)
        {
            if (Model.totalAgendamento >= 0)
            {
                foreach (var ag in Model.lAgendamento)
                {
                    if (ag.dtmInicio <= DateTime.Now)
                    {
                        podeEditarCaminhoBarra = false;
                        break;
                    }

                }
            } 
        
        
        
         %>

         <% if (podeEditarCaminhoBarra)
            {
            %>
                <div class="step_caminhos "><a href="javascript: void(0);" onclick="editar(<%=Model.id %>);" class="din"><span></span>Dados do caminho</a></div>
                <div class="step_etapas"><a href="javascript: void(0);" onclick="voltarEdicaoEtapa(<%=Model.id %>);" class="din"><span></span>Tarefas</a></div>
            <%
            }
            else
            {
                %>

                <div class="step_caminhos "><a href="javascript: void(0);" style="cursor:default;" class="din"><span></span>Dados do caminho</a></div>
                <div class="step_etapas"><a href="javascript: void(0);" style="cursor:default;" class="din"><span></span>Tarefas</a></div>
                
                <%
            }
        }
        %>
        
        <div class="step_conclusao"><a href="/AVA/caminhos/home/concluir/<%=Model.id %>" class="caminho_atual din"><span></span>Conclusão</a></div>
    </section>

    <div id="listaconteudo_caminho">
        <section class="as1 ava_caminhos_conclusao" id="ava_box">   
        
            <% 

            if (qtdEtapa > 0)
            {
            %>
                <div class="leg_notas leg_top"> 
                    <span class="last">Nota máx.</span>
                </div>

                <div id="container_etapas">
                    <ul class="etapa_numeros">
                        <%
                        bool podeEditarCaminho = true;
                        string strClassArrastar = "arrastaveisAtivo";

                        if (Model.totalAgendamento >= 0)
                        {
                            foreach (var ag in Model.lAgendamento)
                            {
                                if (ag.dtmInicio <= DateTime.Now)
                                {
                                    podeEditarCaminho = false;
                                    strClassArrastar = "";
                                    break;
                                }

                            }
                        }    
                    
                        double total = 0;
                    
                        if (qtdEtapa < 1)
                        {
                        }
                        else
                        {
                            if (Model.lEtapa != null)
                            {
                                for (int i = 1; i <= qtdEtapa; i++)
                                {
                                %>
                                    <li>
                                        <h3><%=i %></h3>
                                    </li>
                                <%
                                }
                            }
                         %>
                    </ul>

                    <ul class="<%=strClassArrastar%> arrastaveis clearfix">
                        <%
                   
                        if (Model.lEtapa != null)
                        {
                            total = Model.totalValor;
                            int num = 1;
                            int idCaminho = Model.id;
                            int o = 0;
                            string fim = "";
                            foreach (var etapa in Model.lEtapa)
                            {
                                if (qtdEtapa - 1 == o)
                                {
                                    fim = "e-fim";
                                }

                                string strTituloEtapa = "Tarefa sem título";
                                if (etapa.strEtapa.Length > 0)
                                {
                                    strTituloEtapa = etapa.strEtapa;
                                }
                    
                            %>
                            <li class="e-a-box <%=fim %>" intOrdem="<%=etapa.intEtapa %>" idetapa="<%=etapa.id %>">
                                <table cellspacing="0" cellpadding="0" border="0" class="table_etapas">
                                    <tbody>
                                    <tr>
                                        <td width="344" class="e-titulo">
                                            <h6><%=strTituloEtapa%></h6>
                                            <span class="e-actions">
                                                <input type="hidden" id="idEtapa" value="<%=etapa.id%> " />
                                                <input type="hidden" id="idCaminho" value="<%=idCaminho%> " />
                                                <% 
                                                if (podeEditarCaminho)
                                                {
                                                    %>
                                                    <a class="bt_normal" href="javascript: void(0);" onclick="editarEtapa(<%=etapa.id%> , <%=etapa.intEtapa%> );">Editar</a>                                            
                                                    <a class="bt_normal" href="javascript: void(0);" onclick="excluirEtapaConclusao(<%=etapa.id%>, <%=idCaminho%> );">Excluir</a>    
                                                    <%      
                                                }
                                                %>
                                            </span>                                
                                        </td>
                                        <td width="222" class="e-recurso">
                                            <span><%=etapa.recursoItem.strRecurso%></span>
                                             <% int tamStrTitulo = 0;
                                                if (etapa.recursoItem.strTitulo != null) {
                                                    tamStrTitulo = etapa.recursoItem.strTitulo.Length;
                                                }                                                           
                                                if (tamStrTitulo > 27) 
                                                {  %>
		                                            <p title="<%=etapa.recursoItem.strTitulo%>"><%=etapa.recursoItem.strTitulo.Substring(0, 26) + "..."%></p>
                                             <% } else {   %>
                                                   <p><%=etapa.recursoItem.strTitulo%></p>
                                             <% } %>                                                              

                                        </td>
                                        <td width="60" class="e-notas"> 
                                            <span class="grade">
                                                <%
                                                if (etapa.intValor != 0)
                                                {
                                
                                                    Response.Write(etapa.intValor);
                            
                                                }
                                                else
                                                {
                                                    Response.Write("-");
                                                }
                                                %>
                                            </span>
                                            <p class="discreto">
                                                <%
                                                if (etapa.intValor != 0)
                                                {
                                                    var resultado = (double)(etapa.intValor * 100) / total;
                                                    resultado = Math.Round(resultado, 1);
                                                    Response.Write(resultado + "%");                            
                                                }
                                                else
                                                {
                                                    Response.Write("-");
                                                }
                                                %>
                                             </p>
                                          </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </li>
                            <%
                                o++;
                            }           
                        }
                        else
                        {
                            %>
                            <div style="background-color: #C5C5C5; float: left; width: 700px; height: 55px">
                                Caminho sem tarefa.
                            </div>
                            <%
                        }
                    }            
                    %>
                    </ul>
               </div>

               <div class="leg_notas leg_bottom">
                    <span class="">Total:</span>
                    <span class="last"><%=total%><div class="percent">100%</div></span>                         
               </div>
            <%
            }
            else
            {
                Response.Write("Nenhuma tarefa criada.");  
            }
                
            %>
        </section>    

        <aside id="ava_barralateral-direita" class="conclusao"></aside>

        <div class="ava_agendamento" id="ancora_agendamento" style="display: none;">
            <a href="/ava/caminhos/home/ConfirmaAgendamento/<%=Model.id%>" id="confirmaAgendamento"></a>
        </div>

        <section id="ava_steps_footer">
            <% 
            if (podeEditarCaminhoBarra)
            {
                %>
                <a href="javascript:void(0);" onclick="voltarEdicaoEtapa(<%=Model.id%>)" class="large awesome c-voltar">Voltar para tarefas<span class="awe_icons"></span></a>     
                <%      
            }    
            %>            
            <a class="large awesome awesome-color c-avancar" id="btnAgendarConclusao" href="javascript: void(0);" onclick="agendar(<%=Model.id%>)">Agendar<span></span></a>
            <a href="javascript:void(0);" id="btEscondidoAgendamento"></a>
        </section> 
         
    </div><!--listaconteudo_caminho-->      

</section>


</asp:Content>
