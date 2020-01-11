<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<ProvaColegiada.Models.Exam.AbstractModeloProva>>" %>
<%@ Import Namespace="ProvaColegiada.Models.Exam" %>

<div id="listaModelos">
<%
    if (Model.Count > 0 && !(Model[0] is ModeloRandomProva))
    {
        int i = 0;
        foreach (AbstractModeloProva modelo in Model)
        {   %>
        <div class="<%= ((i++ % 2) == 0) ? "linhaImpar" : "linhaPar" %>">
            <span class="texto">&nbsp;</span>
            <div class="opcoes">
                <label class="recuoB">
                    <input type="hidden" id="txtIdModelo_<%= modelo.Id %>" name="txtIdModelo" value="<%= modelo.Id %>" />
                    <input type="text" id="txtNomeModelo_<%= modelo.Id %>" name="txtNomeModelo" value="<%= modelo.Nome %>" class="txtTentativaM" />
                </label>
            </div>
        </div>
<%      }
    }
%>
</div>