
<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<List<Turma.Models.Atividade>>" %>
<%  

var bolAtividadesPai = ViewData["bolAtividadesPai"] == null ? false : (bool)ViewData["bolAtividadesPai"];
var dcFilhos = ViewData["dcFilhos"] == null ? new Dictionary<int, string>() : (Dictionary<int, string>)ViewData["dcFilhos"];
var bolSemIdFilho = ViewData["bolSemIdFilho"] == null ? true : (bool)ViewData["bolSemIdFilho"];
var nomeFilho = "";
var idProfessorLogado = ViewData["idProfessorLogado"] == null ? 0 : (int)ViewData["idProfessorLogado"];

var tituloBox = ViewData["tituloBox"] != null ? ViewData["tituloBox"].ToString() : (bolAtividadesPai ? "Atividades dos filhos" : "Atividades da turma");

if (!bolAtividadesPai || (bolAtividadesPai && dcFilhos.Count > 0))
{ 
    if(bolSemIdFilho || !bolAtividadesPai){    
%>
    <header>
        <h1><%if (bolAtividadesPai || (ViewData["tituloBox"] == "Minhas atividades"))
              { %>
                <a href="/AVA/Caminhos/Home/CaminhosAluno"><%=tituloBox%></a>
            <%}
              else
              {
                  Response.Write(tituloBox);
              }
            %>
            <i class="fontello info tooltip_title_top" title="Atividades agendadas para os próximos sete dias."></i>
            <% if (bolAtividadesPai) { %>
            <input type="hidden" id="hIdFilho" initvalue="<%=dcFilhos.First().Key%>" value="<%=dcFilhos.First().Key%>" />
            <% if(dcFilhos.Count > 1) {
                   if (!String.IsNullOrEmpty(dcFilhos.First().Value))
                   {
                       nomeFilho = dcFilhos.First().Value.Length > 23 ? dcFilhos.First().Value.Substring(0, 23) + "&hellip;" : dcFilhos.First().Value;
                       nomeFilho = nomeFilho.Split(' ')[0];
                   }       
            %>
                <div class="bootstrap right">
                    <div class="btn-group">
                        <label href="javascript:void(0);" data-toggle="dropdown" class="btn btn-small dropdown-toggle whiteButton" id="txtNomeFilho"> 
                            <%=nomeFilho%>&nbsp;<span class="caret"></span>
                        </label>
                    
			            <ul class="dropdown-menu" id="cbNomeFilho">
                            <% foreach (var f in dcFilhos) {
                                   nomeFilho = "";
                                   if (!String.IsNullOrEmpty(f.Value))
                                   {
                                       nomeFilho = f.Value.Length > 23 ? f.Value.Substring(0, 23) + "&hellip;" : f.Value;
                                       nomeFilho = nomeFilho.Split(' ')[0];
                                   }
                            %>    	
                                <li idf="<%=f.Key%>">
                                    <input type="checkbox" id="ckNomeFilho<%=f.Key%>" <%=f.Key == dcFilhos.First().Key ? "checked=\"checked\"" : ""%> />
			                        <label for="ckNomeFilho<%=f.Key%>"><%=nomeFilho%>&nbsp;</label>
			                    </li>                        
                            <% } %>                                              
			            </ul>
			        </div>  
                </div>
            <% } } %>
        </h1>
    </header>
<% } %>
<div class="boxScroll">        
    <ul class="clearfix">       
    <% if(Model.Count > 0) {%>  
        <% foreach (var atividade in Model)
        {
            string strLink = "";
            string dtmInicio = RedeSocialAVA.FuncoesTexto.FormataDataMensagemRapida(atividade.dtmInicio, true, false, false);
            string dtmFim = RedeSocialAVA.FuncoesTexto.FormataDataMensagemRapida(atividade.dtmFim, true, false, false);
            
            if (atividade.strTipo.ToLower() == "lip_medio")
            {
                strLink = "";
                if (idProfessorLogado == 0)
                {
                    strLink = "ViewRealizacaoProva(" + atividade.intOrdemAgendamento + ");";
                }
                else if (idProfessorLogado == atividade.idResponsavel)
                {
                    strLink = "ViewRelatorioProva(" + atividade.intOrdemAgendamento + ");";
                }
                            
                %>
                <li>
                    <div class="infoTipo">
                        <span class="icoAvaliacao tooltip_title" title="Avaliação"></span> 
                        <p><%=dtmInicio%> até <%=dtmFim%><%=String.IsNullOrEmpty(atividade.strProfessor) ? "" : (" Por: <a href=\"/AVA/Perfil/Home/Index/" + atividade.strLogin + "\" title=\"" + atividade.strProfessor + "\">" + atividade.strProfessor + "</a>")%></p>
	   	                <% if(!String.IsNullOrEmpty(strLink)) { %>
                            <a target="_blank" href="javascript: void(0);" onclick="<%=strLink%>return false;"><%=atividade.strTitulo%></a>
                        <% } else { %>
                            <span class="tituloTipo"><%=atividade.strTitulo%></span>
                        <% } %>
                    </div>

                    <% 
                    if (atividade.intSituacao > 2)
                    {
                        %>
                        <div class="infoRealizacao">
                            <span class="itemFeito FontAwesome tooltip_title" title="Concluída"></span>
                        </div>
                        <%
                    }                
                    %>                     
                </li>  
                <%
            }
            else if (atividade.strTipo.ToLower() == "lip_fundamental") //caminhos
            {
                strLink = (idProfessorLogado == 0 || idProfessorLogado == atividade.idResponsavel) ? "/lip/lip.asp?idUnidade=" + atividade.idRotaAgendamento : String.Empty;

                //***Atenção if atividade.intOrdemAgendamento > 8 o link deve ser para o LIP 2.0. Ainda não foi definido -- Falar com Furtado/Denis.                
                %>
                <li>
                    <div class="infoTipo">
                        <span class="icoAvaliacao tooltip_title" title="Avaliação"></span> 
                        <p><%=dtmInicio%> até <%=dtmFim%><%=String.IsNullOrEmpty(atividade.strProfessor) ? "" : (" Por: <a href=\"/AVA/Perfil/Home/Index/" + atividade.strLogin + "\" title=\"" + atividade.strProfessor + "\">" + atividade.strProfessor + "</a>")%></p>
	   	                <% if(String.IsNullOrEmpty(strLink)) { %>
                            <span class="tituloTipo"><%=atividade.strTitulo%></span>
                        <% } else { %>
                            <a target="_blank" href="<%=strLink%>"><%=atividade.strTitulo%></a>
                        <% } %>                        
                    </div>
                    
                    <% 
                    if (atividade.intSituacao > 2)
                    {
                        %>
                        <div class="infoRealizacao">
                            <span class="itemFeito FontAwesome tooltip_title" title="Concluída"></span>
                        </div>
                        <%
                    }                
                    %>                     
                </li>  
                <%
            }
            else if (atividade.strTipo.ToLower() == "caminho") //caminhos
            {
                strLink = (idProfessorLogado == 0 || idProfessorLogado == atividade.idResponsavel) ? "/ava/caminhos/home/player/" + atividade.idRotaAgendamento + "/0" : String.Empty;
                %>
                <li>
                    <div class="infoTipo">
                        <span class="icoCaminho tooltip_title" title="Caminho de Aprendizagem"></span> 
                        <p><%=dtmInicio%> até <%=dtmFim%><%=String.IsNullOrEmpty(atividade.strProfessor) ? "" : (" Por: <a href=\"/AVA/Perfil/Home/Index/" + atividade.strLogin + "\" title=\"" + atividade.strProfessor + "\">" + atividade.strProfessor + "</a>")%></p>
	   	                <% 
                        if (bolAtividadesPai || String.IsNullOrEmpty(strLink))
                        {
                            %>
                            <span class="tituloTipo titulo-pai"><%=atividade.strTitulo%></span>
                            <%
                        }
                        else
	                    {
                            %>
                            <a href="<%=strLink%>"><%=atividade.strTitulo%></a>    
                            <%
	                    }
                        %>
                    </div>

                    <% 
                    if (atividade.intSituacao > 2)
                    {
                        %>
                        <div class="infoRealizacao">
                            <span class="itemFeito FontAwesome tooltip_title" title="Concluída"></span>
                        </div>
                        <%
                    }                   
                    %>                     
                </li>  
                <%
            }
            else if (atividade.strTipo.ToLower() == "tarefa") //tarefas
            {
                strLink = (idProfessorLogado == 0 || idProfessorLogado == atividade.idResponsavel) ? "/ava/caminhos/home/player/" + atividade.idRotaAgendamento + "/0" :String.Empty;
                %>
                <li>
                    <div class="infoTipo">
                        <span class="icoTarefa tooltip_title" title="Tarefa"></span> 
                        <p><%=dtmInicio%> até <%=dtmFim%><%=String.IsNullOrEmpty(atividade.strProfessor) ? "" : (" Por: <a href=\"/AVA/Perfil/Home/Index/" + atividade.strLogin + "\" title=\"" + atividade.strProfessor + "\">" + atividade.strProfessor + "</a>")%></p>
	   	                <% 
                        if (bolAtividadesPai || String.IsNullOrEmpty(strLink))
                        {
                            %>
                            <span class="tituloTipo titulo-pai"><%=atividade.strTitulo%></span>
                            <%
                        }
                        else
	                    {
                            %>
                            <a href="<%=strLink%>"><%=atividade.strTitulo%></a>    
                            <%
	                    }
                        %>
                    </div>

                    <% 
                    if (atividade.intSituacao > 2)
                    {
                        %>
                        <div class="infoRealizacao">
                            <span class="itemFeito FontAwesome tooltip_title" title="Concluída"></span>
                        </div>
                        <%
                    }                   
                    %>                     
                </li>  
                <%
            }
            else if (atividade.strTipo.ToLower() == "professor") //agendamentos de professor no grupo
            {
                strLink = (idProfessorLogado == 0 || idProfessorLogado == atividade.idResponsavel) ? "/ava/caminhos/home/agendamento/" + atividade.idRotaAgendamento : String.Empty;
                %>
                <li>
                    <div class="infoTipo">
                        <span class="icoTarefa tooltip_title" title="Tarefa"></span> 
                        <p><%=dtmInicio%> até <%=dtmFim%><%=String.IsNullOrEmpty(atividade.strProfessor) ? "" : (" Por: <a href=\"/AVA/Perfil/Home/Index/" + atividade.strLogin + "\" title=\"" + atividade.strProfessor + "\">" + atividade.strProfessor + "</a>")%></p>
	   	                <% if(String.IsNullOrEmpty(strLink)) { %>
                            <span class="tituloTipo"><%=atividade.strTitulo%></span>
                        <% } else { %>
                            <a href="<%=strLink%>"><%=atividade.strTitulo%></a>
                        <% } %>                        
                    </div>
                </li>  
                <%
            }
            else //avaliações
            {
                %>
                <li>
                    <div class="infoTipo">
                        <span class="icoAvaliacao tooltip_title" title="Avaliação"></span> 
                        <p><%=dtmInicio%> até <%=dtmFim%><%=String.IsNullOrEmpty(atividade.strProfessor) ? "" : (" Por: <a href=\"/AVA/Perfil/Home/Index/" + atividade.strLogin + "\" title=\"" + atividade.strProfessor + "\">" + atividade.strProfessor + "</a>")%></p>
	   	                <% 
                        if (bolAtividadesPai)
                        {
                            %>
                            <span class="tituloTipo titulo-pai"><%=atividade.strTitulo%></span>
                            <%
                        }
                        else
	                    {   
                            %>
                            <a href="javascript: void(0)" onclick="ViewRealizacaoProva(<%=atividade.intOrdemAgendamento%>);return false;"><%=atividade.strTitulo%></a>    
                            <%
	                    }
                        %>
                    </div>

                    <%
                    if (atividade.intSituacao > 2)
                    {
                        %>
                        <div class="infoRealizacao">
                            <span class="itemFeito FontAwesome tooltip_title" title="Concluída"></span>
                        </div>
                        <%
                    }
                    %>              
                </li>
                <%                
            } 
        } } else { %>
        <li>
            <p>Até agora, não há nenhuma atividade para os próximos sete dias.</p>
        </li>
        <% } %>
    </ul>
</div>
<% } else { Writer.Write("0"); } %>

