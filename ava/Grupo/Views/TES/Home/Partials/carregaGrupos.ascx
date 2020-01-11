<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<List<Grupo.Models.Grupos>>" %>

<%
    string titulo = ViewData["titulo"].ToString();
    string classe = ViewData["class"] != null ? ViewData["class"].ToString() : "";
    bool mostra = ViewData["mostra"] != null ? Convert.ToBoolean(ViewData["mostra"]) : true;

    if (classe.Equals("descubra_novos_grupos"))
    {
        %>
        <div class="itensGrupo descubra <%=classe %>">
		    <span class="clearfix"></span>		
		    <h2>
			    <span><%=titulo %></span>
			    <span class="linha_titulo"></span>
		    </h2>
			
            <%
            int i = 0;
            int tamanho = Model.Count;
            int tamanho2 = 0;
            if (tamanho.Equals(10))
            {
                tamanho2 = tamanho - 1;
            }
            else
            {
                tamanho2 = tamanho;
            }
            foreach (Grupo.Models.Grupos g in Model)
            {
                
                %>
                <div class="<%=g.idEstado.Equals(2) || g.idEstado.Equals(3) ? "grupo_inativo" : "" %>">
                <%
                if (g.idTipo.Equals(1))
                {                    
                    %>
                    <div class="tag">Portal</div>
                    <%
                }
                
                %>
			    
			    <img src="<%=g.strFoto != null && g.strFoto != "" ? g.strFoto : "/imagens/templates/2010/avatar_turma_grande.gif" %>" height="120" width="120">
			    <div class="infoGrupo">
				    <h3> <a href="<%=Url.Action("PerfilGrupo", "Home") + "/" + g.strLinkPermanente %>"><%=g.strNome %></a></h3>
			    </div>
			    <div class="statusLista">
				    <p><%
                      if(g.qtdParticipante.Equals(0)){
                          Response.Write("Sem participante");
                      }
                      else if (g.qtdParticipante.Equals(1)){
                          Response.Write(g.qtdParticipante + " participante");
                      }
                      else {
                          Response.Write((g.qtdParticipante > 99 ? "+99" : g.qtdParticipante.ToString()) + " participantes");
                      }
                      %></p>
			    </div>
		    </div>
                <%                
                i++;
                if (i.Equals(tamanho2))
                {
                    break;
                }
            }
                
            if (Model.Count == 10)
            {
                %>
                <a class="carregarMais" href="javascript:void(0);"><span class="FontAwesome"></span> Carregar mais grupos</a>
                <%
            }
            %>
		    
		    
		    
		    <span class="clearfix"></span>
	    </div>
        <%
    }
    else
    {
        if (!mostra)
        {
            %>
            <div class="itensGrupo <%=classe %>" style="display: none">
    
	            <h2>
                    <span><%=titulo %></span>
                    <span class="linha_titulo"></span>
                </h2>

            </div>
            <%
        }
        else
        {
            %>
            <div class="itensGrupo <%=classe %>">
    
	            <h2>
                    <span><%=titulo %></span>
                    <span class="linha_titulo"></span>
                </h2>
                <%
                int i = 0;
                int tamanho = Model.Count;
                int tamanho2 = 0;
                bool carregarMais = false;
                if (tamanho.Equals(9))
                {
                    tamanho2 = tamanho - 2;
                
                    carregarMais = true;
                }
                else if (tamanho.Equals(8))
                {
                    tamanho2 = tamanho;
                }
                else if (tamanho.Equals(16))
                {
                    tamanho2 = tamanho - 1;
                    //carregarMais = true;
                }
                else
                {
                    tamanho2 = tamanho;
                }
                foreach(Grupo.Models.Grupos g in Model){                
                    %>
                    <div class="<%=g.idEstado.Equals(2) || g.idEstado.Equals(3) ? "grupo_inativo" : "" %>">
                        <%
                        if (g.idTipo.Equals(1))
                        {
                        %>
                        <div class="tag">Portal</div>
                        <%
                        }                
                        %>		    
		                <img src="<%=g.strFoto != null && g.strFoto != "" ? g.strFoto : "/imagens/templates/2010/avatar_turma_grande.gif" %>" height="79" width="79">
		                <div class="infoGrupo">
			                <h3> <a href="<%=Url.Action("PerfilGrupo", "Home") + "/" + g.strLinkPermanente %>"><%=g.strNome %></a></h3>
		                </div>
		                <div class="statusLista">
			                <p><%
                          if(g.qtdParticipante.Equals(0)){
                              Response.Write("Sem participante");
                          }
                          else if (g.qtdParticipante.Equals(1)){
                              Response.Write(g.qtdParticipante + " participante");
                          }
                          else {
                              Response.Write((g.qtdParticipante > 99 ? "+99" : g.qtdParticipante.ToString()) + " participantes");
                          }
                          %> </p>
		                </div>
	                </div>
                    <%
                
                    i++;
                    if (i.Equals(tamanho2))
                    {
                        break;
                    }
                }
                if (carregarMais)
                {
                     %>
                    <a class="carregarMais" href="javascript:void(0);"><span class="FontAwesome"></span> Carregar mais grupos</a>
                    <%
                }
                else if (Model.Count == 16)
                {
                    %>
                    <a class="carregarMais" href="javascript:void(0);"><span class="FontAwesome"></span> Carregar mais grupos</a>
                    <%
                }
            
                %>
	
	            <span class="clearfix"></span>						
            </div>
        <%
        }
    }
    
%>

