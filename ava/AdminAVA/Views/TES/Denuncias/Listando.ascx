<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<AdminAVA.Models.EscolaAVADenuncias>>"%>

<% 
IList<UsuarioAVA.Models.Unidade> lUnidade = null;

if (ViewData["lUnidades"] != null)
{
    lUnidade = (List<UsuarioAVA.Models.Unidade>)ViewData["lUnidades"];
}

int intVisualizada = Convert.ToInt32(ViewData["intVizualizada"]);
%>
<div class="le_filtros">
	<div id="filtro_aval">
		<div class="topo_filtro">
			<h3>Filtro</h3>
			<a href="javascript:void(0);" class="btAbreFechaFiltro">Fechar<span class="aberto"></span></a>
		</div>
		<div class="boxFiltro">
			<div class="itens">
				<h4>Exibir Itens:</h4>
                <% 
                if (intVisualizada == 0)
                {
		            %>
                    <input type="radio" name="estado_denuncia" id="hoje" value="0" checked>
                    <%
                }
                else
	            {
                   %>
                   <input type="radio" name="estado_denuncia" id="hoje" value="0">    
                   <% 
	            }
                %>
				<label for="hoje">		
					<strong>Pendentes</strong>
				</label>
				<br>
                <% 
                if (intVisualizada == 1)
                {
		            %>
                    <input type="radio" name="estado_denuncia" id="mes" value="1" checked>
                    <%
                }
                else
	            {
                   %>
                   <input type="radio" name="estado_denuncia" id="mes" value="1">    
                   <% 
	            }
                %>						
				<label for="mes">	
					<strong>Resolvidos</strong>
				</label>
			</div>
            <% 
            if (lUnidade.Count > 0)
            {
                %>
			    <div class="itens">
				    <h4>Unidades:</h4>
				    <select id="cbUnidadeDenuncia">
                        <option value="0">Todas</option>                        
                        <%
                        foreach (var unidade in lUnidade)
                        {
                            if (unidade.id == Convert.ToInt32(ViewData["idUnidade"]))
	                        {
		                        %>
                                <option value="<%=unidade.id%>" selected><%=unidade.strUnidade%></option>
                                <%
	                        }
                            else
	                        {
                                %>
                                <option value="<%=unidade.id%>"><%=unidade.strUnidade%></option>
                                <%
	                        }
                        }
                        %>
                    </select>
			    </div>
                <%
            }
            %>
			<div class="itens_botoes">
				<a class="btn_laranja salvar" href="javascript: void(0);" onclick="filtrarDenuncia()">Filtrar</a>
			</div>
		</div>	
	</div>
</div>

<table width="100%" border="0" cellpadding="0" cellspacing="0" class="tb_avisos" style="table-layout:fixed; word-wrap:break-word;">
    <thead>
        <tr>
            <td width="28%">motivo</td>
            <td width="15%">denunciado</td>
            <td width="15%">local</td>
            <td width="15%">denunciante</td>
            <td width="7%">data</td>
            <td width="8%">status</td>
        </tr>
    </thead>
    <%            
    if (Model.Count > 0)
    {
        string strStatus = "";
        string strClass = "";
        string strMsg = "";
        string strNomeUserDenunciado = "";
        string strTurmaDenunciado = "";
        string strTurmaDenunciante = "";
        int intEnviaStatus = 0;

        foreach (var item in Model)
        {
            string dtmDenuncia = String.Format("{0:dd/MM/yy}", item.dtmDenuncia) + " " + item.dtmDenuncia.Hour.ToString().PadLeft(2, '0') + "h" + item.dtmDenuncia.Minute.ToString().PadLeft(2, '0');
            
            if (item.bolVisualizada == false)
            {
                strStatus = "Pendente";
                strClass = "bt_normal red";
                strMsg = "Clique aqui para alterar o status.";
                intEnviaStatus = 1;
            }
            else
            {
                strStatus = "Resolvido";
                strClass = "bt_normal green";
                strMsg = "Resolvido";
                intEnviaStatus = 0;
            }

            if (item.strTurmaDenunciado.Length > 0)
            {
                strTurmaDenunciado = "Turma: " + item.strTurmaDenunciado;
            }

            if (item.strTurmaDenunciante.Length > 0)
            {
                strTurmaDenunciante = "Turma: " + item.strTurmaDenunciante;
            }
            %>
                    
            <tr>
                <td><div style="width: 265px; word-wrap:break-word;"><%=item.strMotivo%></div>
                    <p>
                        <%
                        string strURL = item.strURL;
                        if (strURL.ToLower().Contains("/perfil/"))
                        {
                            %>
                            <a href="/AVA/Perfil/Home/Index/<%=item.strLoginUsuarioDenunciado%>" target="_blank" class="bt_normal "><i class="ui-img-nots ui-img-mural"></i> ver perfil</a>
                            <%
                        }
                        else
                        {
                            %>
                            <a href="<%=strURL%>" target="_blank" class="bt_normal "><i class="ui-img-nots ui-img-quote"></i> ver post</a>
                            <% 
                        }
                        %>                      
                    </p>
                </td>
                <td class="adm_users">Nome: <%=item.strNomeUsuarioDenunciado%> <%=strTurmaDenunciado%></td>
                <% 
                string strClassLocal = "local_mural";
                
                if (strURL.ToLower().Contains("/perfil/"))
                {
                    strClassLocal = "local_perfil";
                }
                else if (strURL.ToLower().Contains("/grupo/") || strURL.ToLower().Contains("/turma/"))
                {
                    strClassLocal = "local_grupo";
                }   
                %>
                <td class="adm_users <%=strClassLocal%>"><%=item.strLocal%></td>
                <td class="adm_users">Nome: <%=item.strNomeUsuarioDenuncia%> <%=strTurmaDenunciante%></td>
                <td><%=dtmDenuncia%></td>
                <td><a class="<%=strClass%>" style="cursor:pointer;" title="<%=strMsg%>" onclick="alteraStatusDenuncia(<%=item.idDenuncia%>, <%=intEnviaStatus %>)"><%=strStatus%></a></td>
            </tr>                                         
            <%
        }
    }
    else
    {                    
    %>
        <tr>
            <td colspan="6">Nenhuma denúncia encontrada.</td>
        </tr>
    <%
    }
    %>    
</table>
