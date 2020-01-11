<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<AdminAVA.Models.EscolaAVAAdminsRedeSocial>>"%>

<%
    foreach (var admin in Model)
    {
        %>
        <div class="info_usuario_cadastrado" id="<%=admin.idUsuario%>">
			<div class="thum_administrador">
                 <img src="<%=admin.strThumb%>" width="42" height="42" />
            </div>
            <div class="detalhe_usuario_cadastrado">
			    <p><%=admin.strNome%></p>
			    <small><%=admin.strLogin%></small>
                <%
                if (!admin.bolMaster && admin.idUsuario != Convert.ToInt32(ViewData["meuId"]))
                {
                    %>
                    <a href="javascript:void(0);" class="remover_adm_cadastrados b_tooltip_center"><span class="FontAwesome"></span>Remover</a>
                    
                    <span class="black_tip_center tooltip black_tip_M" style="display:none;">
						<p>Deseja realmente excluir este usuário da lista de administradores? </p> 
						<a onclick="removeAcessoADMRSEducador(<%=admin.idUsuario%>);" class="bt_normal green" href="javascript: void(0);">sim</a>
						<a onclick="removeAcessoADMRSEducador(0);" class="bt_normal red" href="javascript: void(0);">não</a>
						<span class="black_tip_seta">▼</span>
					</span>
                    
                    <%        
                }
                %>
		    </div>

		</div>
        <%
    }  
%>


                                
                                
		

 