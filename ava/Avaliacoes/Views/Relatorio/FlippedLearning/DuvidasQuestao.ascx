<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.Models.Relatorios.TotalDuvidaFlipped>" %>
<%@ Import namespace="ProvaColegiada.Models.Relatorios" %>
<%@ Import namespace="ProvaColegiada.Models.Question" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<div class="conteudoResumo">
<h1>Enunciado</h1>
<div class="areaEnunciado mceView">
<%=Model.Enunciado %>
</div>
<h1>Dúvidas e comentários</h1>
<%  
    
    if (Model.Duvidas.Count > 0)
    {

        foreach (DuvidaQuestaoRealizada duvida in Model.Duvidas)
        {
        %>
        <div class="DuvidaAutor">
            <p>Autor: <%=Html.Encode(duvida.Autor)%></p>
            <div>
                <%=Html.Encode(duvida.Duvida)%>
            </div>
        </div>
        <%
        }

    }
    else
    {
    %> Nenhuma dúvida<%
    }
    
    
    %>


    </div>