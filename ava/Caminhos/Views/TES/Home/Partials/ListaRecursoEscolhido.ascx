<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Caminhos.Models.RecursoItem>" %>

<%

    
if (Model.idAvaliacao <= 0)
{
    string strBarra = "";
    if(Model.idCategoria == 16 || Model.idCategoria == 26)
    {
        strBarra = "/";
    }
%>
    <img src="<%=strBarra%><%=Model.strThumbItem%>" width="105" height="105" alt="<%=Model.strTitulo%>">
    <span><strong><%=Model.strTitulo%></strong>
    <p><%=Model.strDescricao%></p></span>
<%
    if (Model.idCategoria == 159)
    {
        if (Model.paginasCM != null)
        {
            %>
            <span>
                Iniciar em: <select name="paginacaoCM" id="paginacaoCM">
            <%
            string options, selecionado;
            for (int i = 0; i < Model.paginasCM.Count; i++)
            {
                if (i.Equals(0))
                {
                    selecionado = "selected=\"selected\"";
                }
                else
                {
                    selecionado = "";
                }
                if (Model.paginasCM[i].iVersaoCM.Equals(6))
                {
                    options = "urlPai=\"" + Model.paginasCM[i].urlPai + "\" url=\"" + Model.paginasCM[i].url + "\" pOrdem=\"" + Model.paginasCM[i].intOrdem + "\" sOrdem=\"" + Model.paginasCM[i].intOrdem2 + "\" iVersao=\"" + Model.paginasCM[i].iVersaoCM + "\" idPublicacao=\"" + Model.paginasCM[i].idPublicacao + "\"";
                }
                else
                {
                    options = "urlPai=\"" + Model.paginasCM[i].urlPai + "\" url=\"" + Model.paginasCM[i].url + "\" pOrdem=\"" + Model.paginasCM[i].intOrdem + "\" sOrdem=\"" + Model.paginasCM[i].intOrdem2 + "\" iVersao=\"" + Model.paginasCM[i].iVersaoCM + "\" idPublicacao=\"" + Model.paginasCM[i].idPublicacao + "\"";
                }                
                
                %>
                <option <%=selecionado %> value="<%=Model.paginasCM[i].iVersaoCM + ";" + Model.paginasCM[i].intOrdem + ";" + Model.paginasCM[i].intOrdem2 %>" <%=options %>><%=Model.paginasCM[i].intOrdem2 > 0 ? "&nbsp;&nbsp;" : ""%><%=Model.paginasCM[i].strTitulo%></option>
                <%
            }
            %>
                </select> <a href="#VisualizarCM" class="bt_normal" onclick="visualizarCM(); return false;">Visualizar</a>
            </span>
            <%
        }

    }
}
else
{
%>
                       
    <table cellspacing="0" cellpadding="0" border="0" width="100%" class="">
        <thead>                  		
            <tr class="table_selected">
                <td width="37%">
                    <img height="55" width="55" alt="Avaliações" src="/ava/StaticContent/Common/img/recursos/Avaliacoes_55x55.jpg">
                    <span>AVALIAÇÕES</span>
                    <p><a class="bt_normal" href="javascript: void(0);" onclick="voltarListaAvaliacoesCaminhos();">voltar</a></p>
                </td>                       
            </tr>
        </thead>
    </table>
   
            
<%
}   
%>


