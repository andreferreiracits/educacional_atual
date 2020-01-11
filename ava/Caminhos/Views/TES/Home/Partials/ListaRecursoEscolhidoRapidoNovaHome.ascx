<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Caminhos.Models.RecursoItem>" %>

<% 
if (Model.idRecurso != 11)
{
    int pOrdem = 0;
    int sOrdem = 0;
    if (Model.idCategoria.Equals(159) && Model.idRecurso.Equals(2))
    {
        if (Model.paginasCM != null)
        {
            pOrdem = (int)ViewData["pOrdem"];
            sOrdem = (int)ViewData["sOrdem"];
        }
    }
%>

<div class="anexo_preview anx_recurso">

    <div class="anx_dados_recurso" id="previewRecursoRapidoTarefa">
        <img width="55" height="55" alt="<%=Model.strRecurso%>" src="<%=Model.strThumbRecurso%>">

        <div class="txt_recurso">
            <h4><%=Model.strTitulo%></h4>
            <p><%=Model.strDescricao%></p>
         <%
            if (Model.idCategoria == 159)
            {
                if (Model.paginasCM != null)
                {
                    %>
                    <div class="recurso_acao">
                        <span id="spanRecursoTarefa">Iniciar em:</span>
                        
                        <div class="bootstrap selecao">
							<select name="paginacaoCM" id="paginacaoCM" onchange="salvarPaginasCM();">

                            <%
                            string options, selecionado;
                            for (int i = 0; i < Model.paginasCM.Count; i++)
                            {
                                if (Model.paginasCM != null && Model.paginasCM[i].intOrdem.Equals(pOrdem) && Model.paginasCM[i].intOrdem2.Equals(sOrdem))
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
                            </select> <a href="#VisualizarCM" class="btn_acao visualizar" onclick="visualizarCM(); return false;">Visualizar</a>
                        </div>
                    </div>
                    <%
                }
            }
         %>
        </div>
    </div>
	<a href="javascript:void(0);" class="btn_acao opcao_excluir" onclick="excluirRecursoRapidoTarefa()"></a>
</div>
<% 
}
%>