<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<Caminhos.Models.Caminho>>" %>

<%
    string uAgent = Request.UserAgent.ToLower();
    bool bolMobile = false;
    if (uAgent.Contains("ipad") || uAgent.Contains("iphone") || uAgent.Contains("android"))
    {
        bolMobile = true;
    }
    
bool bolAdmRede = Convert.ToBoolean(ViewData["bolAdmRedeSocial"]);
    
if (Model.Count > 0)
{
    int qtd = 1;
    foreach (var caminho in Model)
    {
        string autor = "";
        if (caminho.strTipo == "meus")
        {
            autor = "Você";
        }
        else if (caminho.strTipo == "portal")
        {
            autor = "Portal";
        }
        else
        {
            autor = caminho.nomeUsuario;
        }

        int idDono = caminho.idUsuario;
        int idUsuarioAtual = Convert.ToInt32(ViewData["idUsuarioAtual"]);
        
        bool podeEditarCaminho = true;
        
        if (caminho.intStatus == 2 && idDono != idUsuarioAtual && !bolAdmRede) //XUNXO PRA NÃO MEXER NA SP = é privado e não é sua
        {

        }
        else
        {
        
        %>

        <%       
            string tituloAtividade = caminho.titulo;
            tituloAtividade = RedeSocialAVA.FuncoesTexto.ReverterAspas(tituloAtividade);
            tituloAtividade = RedeSocialAVA.FuncoesTexto.ArrumaAspas(tituloAtividade);
                        
        %>

        <tr class="bancocaminho_<%=caminho.id%> bcam" id="<%=caminho.id%>">
            <%if (bolAdmRede)
              { %>
            <td width="11%" class="mgle20" id="strNomeDono"> <%=autor%></td>
            <%} %>
            <td width="63%" class="mgle20">
                <div style="cursor: pointer" id="escorrega_<%=caminho.id%>" idAtiv="<%=caminho.id%>" class="btnEscorregarCaminho">
                    <a href="javascript: void(0)"><span id="seta_<%=caminho.id%>">&#9660;</span> <%=tituloAtividade%></a>
                </div>
                <span class="e-actions <%=bolMobile ? "mobile" : "" %>">
                            
                    <%
                        
                    if (caminho.strTipo == "meus")
                    {
                        %>
                        <a href="javascript: void(0)" class="bt_normal" onclick="abrirAgendamento(<%=caminho.id%>, 1, 1, 1, '','','', false, <%=bolAdmRede.ToString().ToLower()%>, 0, '', 1)">Agendamentos <span class="span_nbr"><%=caminho.totalAgendamento%></span></a>
                        <a href="javascript: void(0)" class="bt_normal" onclick="irParaConclusao(<%=caminho.id%>)">Agendar</a>
                        <a href="javascript: void(0)" class="bt_normal" onclick="duplicarRota(<%=caminho.id%>)">Duplicar</a>
                        <a href="javascript:void(0);" id="btEscondidoAgendamento_<%=caminho.id%>"></a>
                        <%
                        
                        if (caminho.totalAgendamento >= 0)
                        {   
                            foreach (var ag in caminho.lAgendamento)
                            {
                                if (ag.dtmInicio <= DateTime.Now)
                                {
                                    podeEditarCaminho = false;
                                }
                                        
                            }                                   
                        }
                        if (podeEditarCaminho)
                        {
                            %>
                            <a href="javascript: void(0);" class="bt_normal" onClick="editar(<%=caminho.id%>);">Editar</a>                                        
                            <a href="/ava/Caminhos/Home/TelaExcluirCaminho/<%:caminho.id%>" class="bt_normal red_light excluirCaminho">Excluir</a>
                            <%
                        }
                                
                    }
                    else
                    {
                        
                        if (caminho.intStatus == 4 && Convert.ToInt32(ViewData["idEscola"]) == 3760001)
                        {
                            %>
                            <a href="javascript: void(0);" class="bt_normal" onClick="editar(<%=caminho.id%>);">editar</a>                                        
                            <%
                        }
                        %>
                        <a href="javascript: void(0)" class="bt_normal" onclick="duplicarRota(<%=caminho.id%>)">Duplicar</a>
                        <%

                    }
                    %>
                    <!--
                    <span class="black_tip_center tooltip" id="tooltipExc_<%=caminho.id%>">
                        <p>Deseja realmente excluir este caminho? </p> 
                        <a href="javascript: void(0);" class="bt_normal green" onclick="excluirRota(<%=caminho.id%>, true)">sim</a>
                        <a href="javascript: void(0);" class="bt_normal red" onclick="excluirRota(<%=caminho.id%>, false)">não</a>
                        <span class="black_tip_seta">&#9660;</span>
                    </span>         -->              
                    
                    <a href="javascript: void(0)" id="btDetalhe_<%=caminho.id%>" class="bt_normal" onclick="escorregaCaminho(<%=caminho.id%>)">ver detalhes</a>
                            
                </span>                                                           
            </td>
            <%if (!bolAdmRede)
              { %>
            <td width="13%" class="center"><%=autor%></td>
            <%} %>
            <% 
            string status = "<span class='privada'></span>Privado";
            if (caminho.intStatus == 1)
            {
                status = "<span class='publica'></span>Compartilhado";
            }
            else if (caminho.intStatus == 3)
            {
                status = "<span class='publica'></span>Compartilhado para POL";
            }
            else if (caminho.intStatus == 4)
            {
                status = "<span class='privada'></span>Em revisão";
            }
            %>
            <td width="11%" class="center" id="status_<%=caminho.id%>"><%=status%></td>
            <td width="13%" class="center"><%=caminho.dtmCriacao.ToString("dd/MM/yyyy") %></td>
        </tr>
                            
            <tr class="table_aberta" id="caminho_<%=caminho.id%>" style="display: none">
                <td colspan="3" valign="top" width="70%">
                    <div id="containerescorrega_<%=caminho.id%>" style="display:none">
                    <div class="ta_etapas cam_table">
                        <div class="infos_lebox">
                            <h3>Descrição do caminho</h3>
                            <% 
                            if (caminho.descricao.Length > 200)
                            {
                                %>
                                <p id="caminhoDescr_<%=caminho.id%>"><%=caminho.descricao.Substring(0, 200) + "..."%></p>
                                <p id="caminhoDescrCompleto_<%=caminho.id%>" style="display: none;"><%=caminho.descricao%></p>
                                <p><a id="bt_verMaisDescRota_<%=caminho.id%>" rel="<%=caminho.id%>" class="bt_normal" href="javascript:void(0);">veja mais</a></p>           
                                <%                
                            }
                            else
                            {                
                                %>
                                <p id="caminhoDescr"><%=caminho.descricao%></p>
                                <%
                            }        
                            %>                                                              
                        </div>
                        <h4>Tarefas deste caminho:</h4> 
                    <% 
                    int qtdEtapa = caminho.lEtapa.Count;

                    if (qtdEtapa > 0)
                    {
                    %>
                        <div class="ta_etapas" style="width:655px">
                            
                            <% 
                            string strClassEdit = "";
                            if (!podeEditarCaminho)
                            {
                                strClassEdit = "container_etapas_G";
                            }
                            %>

                            <div id="container_etapas" class="container_etapas_G">  
                                <ul class="etapa_numeros">
                                    <%
                                    for (int i = 1; i <= qtdEtapa; i++)
                                    {
                                    %>
                                        <li>
                                            <h3><%=i %></h3>
                                        </li>
                                    <%
                                    }                                
                                    %>            	                                                                            
                                </ul>
                                <%                                                
                                if (caminho.totalAgendamento == 0 && idDono == idUsuarioAtual)
                                {
                                    %>
                                    <ul class="arrastaveis clearfix arrastar<%=qtd %>">
                                    <%                                                        
                                }
                                else
                                {
                                    %>
                                    <ul class="arrastaveis clearfix">
                                    <%  
                                }
                                    double total = caminho.totalValor;
                                    int cont = 0;
                                    string fim = "";
                                    double somaEtapa = 0;
                                    foreach (var etapa in caminho.lEtapa)
                                    {
                                        if (qtdEtapa - 1 == cont)
                                        {
                                            fim = "e-fim";
                                        }

                                        string strTitutoEtapa = "Etapa sem título";
                                        if (etapa.strEtapa.Length > 0)
                                        {
                                            strTitutoEtapa = etapa.strEtapa;
                                            strTitutoEtapa = RedeSocialAVA.FuncoesTexto.ReverterAspas(strTitutoEtapa);
                                            strTitutoEtapa = RedeSocialAVA.FuncoesTexto.ArrumaAspas(strTitutoEtapa);
                                        }
                                        %>
                                        <li class="e-a-box <%=fim%>" intOrdem="<%=etapa.intEtapa %>" idetapa="<%=etapa.id %>" id="<%=etapa.id %>">
                    		                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table_etapas">
                                                <tr>
                                                    <td width="55%" class="e-titulo"><h6><%=strTitutoEtapa%></h6>                                                    
                                                        <span class="">
                                                            <a href="javascript:void(0);" class="bt_normal" onclick="verOrientacoes(<%=etapa.id%>)">Ver orientações</a>                                                        
                                                            <a href="/ava/caminhos/home/VerOrientacoesEtapa/?idEtapa_intSituacao=<%=etapa.id%>_3" id="btVer_<%=etapa.id%>"></a>
                                                        </span>                                                                                  
                                                    </td>
                                                    <td width="35%" class="e-recurso">
		                                                <span><%=etapa.recursoItem.strRecurso%></span>
                                                       <%  int tamStrTitulo = 0;
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
                                                    <td width="10%" class="e-notas"> 
                                                        <span>
                                                            <%
                                                            if (etapa.intValor > 0)
                                                            {                                
                                                                Response.Write(etapa.intValor);
                                                                somaEtapa += etapa.intValor;                        
                                                            }
                                                            else
                                                            {
                                                                Response.Write("-");
                                                            }
                                                            %>
                                                        </span>
                                                        <p>
                                                            <%
                                                            if (etapa.intValor > 0)
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
                                            </table> 
                                        </li> 
                                        <%
                                        cont++;    
                                    }
                                    %>
                                </ul>
                            </div><!--container_etapas-->
                            <span class="etapa_total"><h2>Total: <%=somaEtapa%></h2></span>
                        </div><!--ta_etapas-->
                    <%
                    }else{
                        Response.Write("Nenhuma etapa criada.");    
                    }
                    %>
                    </div>  
                </td>
                <td colspan="2" valign="top" width="30%">                                  
                        
                        <div class="lbbloco lbopcoes ta_desc">
                            <%                           
                                Html.RenderPartial("Partials/OpcoesCompartilhamento", new ViewDataDictionary { { "idEscola", ViewData["idEscola"] }, { "intStatus", caminho.intStatus }, { "cont", qtd }, { "idCaminho", caminho.id }, { "idDono", idDono }, { "idUsuarioAtual", idUsuarioAtual }, { "intTipo", 1 } });  
                            %>
                        </div>

                        <div class="ava_tags_box_clean clearfix">
                            <h4 class="left">Tags:</h4> 
                            <%
                            if (caminho.lTag.Count > 0)
                            {
                                %>
                                <ul class="ava_tags">
                                    <%
                                    foreach (var tag in caminho.lTag)
                                    {
                                        if (caminho.totalAgendamento > 0 && idDono != idUsuarioAtual)
                                        {
                                            %>
                                            <li id="<%=tag.id%>"><%=tag.strTag%> <span class="lajo_x FontAwesome"><a href="javascript: void(0);"></a></span></li>    
                                            <% 
                                        }
                                        else
                                        {
                                            %>
                                            <li id="<%=tag.id%>"><%=tag.strTag%> <span class="lajo_x FontAwesome"><a href="javascript: void(0);" onclick="fecharTag(<%=tag.id%>, <%=tag.id%>, <%=caminho.id%>)"></a></span></li>    
                                            <%    
                                        }
                                                               
                                    }
                                    %> 
							    </ul>
                                <%
                            }
                            else
                            {
                                %>
                                <p class="left">Você não adicionou tags para este caminho.</p>  
                                <%
                            }
                            %>           					                
          				</div>    

                        <%
                        if (!podeEditarCaminho)
                        {
                            %>
                            <p class="highlight">Este caminho não pode ser editado por já possuir agendamentos associados.</p>
                            <%     
                        }
                        %>
                    </div><!--ta_desc-->
                </td>
            </tr> 
                             
        <%
        qtd++;
        }//é privado e não é sua
    }
}
else
{
    %>
     <tr class="mouseover">
         <td colspan="7" class="">Nenhum caminho encontrado para os filtros aplicados</td>
    </tr>
    <%
}   
%>
 
