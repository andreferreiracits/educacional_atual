<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ProvaView>" %>

<% int count = 2; %>
    <% for (int i = 0; i < Model.Classificacoes.Count; i++ )
       { %>
        <div id="divBuscaAvancadaPasso<%=count %>">
            <div id="tree<%=count %>" class="boxArvoreScroll">
				
			</div> 
        </div>
    <%   count++;
       } %>