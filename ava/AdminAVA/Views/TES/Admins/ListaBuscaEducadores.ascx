<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<AdminAVA.Models.EscolaAVAAdminsRedeSocial>>"%>

<%
    if (Model.Count > 0)
    {
        foreach (var admin in Model)
        {
            %>
            <div class="info_usuario_cadastrado container_educs" id="<%=admin.idUsuario%>">
                <div class="thum_administrador">
                     <img src="<%=admin.strThumb%>" width="42" height="42" />
                </div>
                <div class="detalhe_usuario_cadastrado">
			        <p><%=admin.strNome%></p>
			        <small><%=admin.strLogin%></small>
                    <a onclick="adicionarAcessoAdmRSEducador(<%=admin.idUsuario%>);" class="adm_cadastrar_adm" href="javascript:void ;"><span class="FontAwesome"></span>Adicionar</a>
			    </div>
		    </div>
            <%
        }
    }
    else
    {
        %>
        <span>Nenhum educador encontrado.</span>
        <%
    }  
%>


                                
                                
		

 