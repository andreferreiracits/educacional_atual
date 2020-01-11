<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<UsuarioAVA.Models.Perseguicao>" %>

<%
    if (Model.idSeguidor != Model.idPerseguido)
    {
        if (Model.bolSigoAuto)
        {
            %>
            <h1 class="bt_geral"><a id="bt_perseguicao">Você segue automaticamente esta pessoa</a></h1>
            <%
        }
        else
        {
            if (Model.bolEstouSeguindo)
            {
                %>
                <h1 class="bt_geral"><a id="bt_perseguicao" href="javascript: parardeseguirPublico(<%=Model.idSeguidor%>, <%=Model.idPerseguido%>)" id="bt_perseguicao">Não seguir</a></h1>
                <%
            }
            else if (Model.bolPossoSeguir)
            {
                %>
                <h1 class="bt_geral"><a id="bt_perseguicao" href="javascript: seguirPublico(<%=Model.idSeguidor%>, <%=Model.idPerseguido%>)" id="bt_perseguicao">Seguir</a></h1>
                <% 
            }
        }

    }
         
%>