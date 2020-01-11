<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>

<div id="itemProva_<%= Model.Id %>" class="itemProva">
    <%= Html.Hidden("txtIdProvaSelecionada", Model.Id) %>
    <div class="destaqueAzul">
        <%
            if (!Model.AlterarProva)
            {
                %>
                    <label>Avaliação selecionada:</label>
                    <strong><%= Html.Encode(Model.Prova.Nome)%></strong>
                <%
            }
            else
            {
                %>
                    <label>Avaliação Selecionada:</label>
                    <strong><%= Html.Encode(Model.Prova.Nome)%></strong>
                    <a class="btnRemover"><span class="icoRemover"></span>remover prova</a>
                <%
            }
        %>
    </div>
    <div class="linhaImpar">
        <span class="SEC02511_texto">Autor:</span>
        <label><%= Model.Prova.Autor%></label>
    </div>
    <div class="linhaPar">
        <span class="SEC02511_texto">Data da última modificação:</span>
	    <label><%= Model.Prova.Modificado%></label>
    </div>
    <div class="linhaImpar">
        <span class="SEC02511_texto">Questões:</span>
        <label><%= Model.TextoNrQuestao%></label>
    </div>
    <% Html.RenderPartial(Model.BoxBtnViewQuestoes, Model); %>
    <div class="divisaoQuestao">
        <div class="tituloDivisao">Título</div>
        <div class="textoDivisao">Digite um título para o agendamento ou apenas reutilize o título da avaliação.</div>
    </div>                  
    <div class="linhaImpar">
        <span class="SEC02511_texto">Título do agendamento: <span class="obrigatorio">*</span></span>
        <label>
            <input type="text" id="txtTituloAplicacao" name="txtTituloAplicacao" class="txt" maxlength="80" value="<%= Server.HtmlEncode(Model.Nome) %>" />
        </label>
    </div>
    <div class="divisaoQuestao">
        <div class="tituloDivisao">Texto introdutório <span class="obrigatorio">*</span></div>
        <div class="textoDivisao">Edite o texto introdutório se julgar necessário.</div>
    </div>      
    <%= Html.TextArea("txtInstrucao", Model.Instrucao.Html, new { @id = "txtInstrucao", @cols = "74", @rows = "18", @class = "txtareaEnunciado html" })%>
</div>