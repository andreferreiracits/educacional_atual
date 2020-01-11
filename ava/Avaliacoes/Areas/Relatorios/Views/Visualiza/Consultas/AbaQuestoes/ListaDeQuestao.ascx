<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<List<int>>" %>

<div class="boxListaQuestoes">
    <ul id="listaQuestoes">
        <% int i = 0;
            string classe = ""; %>
        <% foreach ( var item in Model ) {
                i++; %>
        <li>
            <div class="imgPaginacao">
                <% classe = (int)ViewData["questaoAtual"] == item ? "questaoAtual" : ""; %>
                <div class="paginacaoBtn <%:classe %>">
                    <a href="javascript:void(0)" data-click-submit='true'>
                        <div><%:i %> </div>
                        <input type="hidden" name="Consulta[QuestaoSelecionada]" disabled value="<%: item %>"/>
                    </a>
                </div>
            </div>
        </li>
        <%} %>
    </ul>
</div>
