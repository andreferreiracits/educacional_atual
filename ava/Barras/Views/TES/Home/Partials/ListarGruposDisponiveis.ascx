<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<List<Grupo.Models.Grupos>>" %>

<%
int idUsuarioLogado = Convert.ToInt32(ViewData["idUsuarioLogado"]);
int qtdRegistroPorPagina = ViewData["qtdRegistroPorPagina"] == null ? 5 : Convert.ToInt32(ViewData["qtdRegistroPorPagina"]);

if(Model == null)
{
    %>
    <span class="clearfix"></span>
    <span>Nenhum grupo encontrado.</span>
    <input type="hidden" value="semGrupos" />
    <%
}
else if (Model.Count > 0)
{        
    foreach (Grupo.Models.Grupos grupo in Model)
    {
        string classInativo = "";
        string htmlInativo = "";
        if (grupo.idEstado == 2)
        {
            classInativo = "grupo_inativo";
            htmlInativo = " - Grupo inativo";
        }              
        %>
        <div class="<%=classInativo%>">
			<img src="<%=grupo.strFoto%>" height="74" width="74"/>
			<div class="infoGrupo">
				<h3> 
                    <a href="/AVA/Grupo/Home/PerfilGrupo/<%=grupo.strLinkPermanente%>">
                        <%=grupo.strNome%>
                    </a>
                </h3>
                <p><%=grupo.strDescricao%></p>
            </div>
            <div class="statusLista">
				<p>
                    <%
                    List<Grupo.Models.ParticipanteGrupo> lTodosUsuariosGrupo = grupo.lTodosUsuariosGrupo.FindAll(p => p.id == idUsuarioLogado);
                    if (grupo.idEstado == 2)
                    {
                        Response.Write(htmlInativo);
                    }
                    else
                    {
                        if (lTodosUsuariosGrupo.Count > 0)
                        {
                            string strTexto = "";
                            
                            if (grupo.idAdesao == 4)
                            {
                                Response.Write(lTodosUsuariosGrupo[0].strTipoParticipante);
                            }
                            else
                            {
                                if (lTodosUsuariosGrupo[0].lConvite.Count > 0)
                                {                                    
                                    List<Grupo.Models.ConviteUsuario> lConviteAceito = lTodosUsuariosGrupo[0].lConvite.FindAll(p => p.idStatus == 3 && !p.bolExcluido);

                                    if (lConviteAceito.Count > 0)
                                    {
                                        strTexto = lTodosUsuariosGrupo[0].strTipoParticipante;
                                    }
                                    else
                                    {
                                        List<Grupo.Models.ConviteUsuario> lConvitePendente = lTodosUsuariosGrupo[0].lConvite.FindAll(p => p.idStatus == 1 && !p.bolExcluido);

                                        if (lConvitePendente.Count > 0)
                                        {
                                            if (lConvitePendente[0].idTipoConvite == 2)//convite solicitado
                                            {
                                                strTexto = "Aguardando aprovação do mediador";
                                            }
                                            else
                                            {
                                                strTexto = "Aguardando aceitação do convidado"; 
                                            }  
                                        }
                                    }                                    
                                }
                                else
                                {
                                    strTexto = lTodosUsuariosGrupo[0].strTipoParticipante;
                                }
                            }

                            Response.Write(strTexto);                                                       
                        }
                    }
                    %>
                </p>
                <p class="right">
                    <%
                    int qtdParticipantes =  grupo.totalParticipantes;
                    string strPart = " participante";
                    if (qtdParticipantes > 1)
	                {
		                strPart = " participantes";
	                }
                    Response.Write(qtdParticipantes.ToString() + strPart);
                    %>  
                </p>           			
			</div>
               			
		</div>
        <%    
    }
            
    if (Model.Count == qtdRegistroPorPagina)
    {
        %>
        <span class="clearfix"></span>
        <a href="javascript:void(0);" class="carregarItens" id="btCarregaMaisGrupos">Carregar mais grupos</a>		
        <%
    }
        
    if (Model.Count < qtdRegistroPorPagina)
    {
        %>
        <input type="hidden" value="poucoGrupo" />
        <%
    }
    
} 
else// Model.Count == 0
{
    %>
    <span class="clearfix"></span>
    <span>Nenhum grupo encontrado.</span>
    <input type="hidden" value="semGrupos" />
    <%    
}    
%>
