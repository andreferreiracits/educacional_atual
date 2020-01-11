<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AplicacaoView>" %>

<div id="itemProva_<%= Model.Id %>" class="itemProva">
    <%= Html.Hidden("txtIdProvaSelecionada", Model.Id) %>
    <div class="destaqueAzul">
<%  if (!Model.Prova.Editavel)
    { %>
        <label>Prova selecionada:</label>
        <strong><%= Model.Prova.Nome%></strong>
<%  }
    else
    { %>
        <label>Prova Selecionada:</label>
        <strong><%= Model.Prova.Nome%></strong>
        <a class="btnRemover"><span class="icoRemover"></span>remover prova</a>
<%  } %>
    </div>
    <div class="linhaImpar">
        <span class="texto">Autor:</span>
        <label><%= Model.Prova.Autor%></label>
    </div>
    <div class="linhaPar">
        <span class="texto">Data da última modificação:</span>
	    <label><%= Model.Prova.Modificado%></label>
    </div>
    <div class="linhaImpar">
        <span class="texto">Questões:</span>
        <label><%= Model.Prova.TextoNrQuestao%></label>
        
    </div>
    
    <% Html.RenderPartial(Model.BoxBtnViewQuestoes, Model); %>

    <div class="divisaoQuestao">
        <div class="tituloDivisao">Dados gerais</div>
        <div class="textoDivisao">Digite as informações sobre esta aplicação.</div>
    </div>
                            
    <div class="linhaImpar">
        <span class="texto">Título da aplicação: <span class="obrigatorio">*</span></span>
        <label><input type="text" id="txtTituloAplicacao" name="txtTituloAplicacao" class="txt" value="<%= Model.Nome %>" /></label>
    </div>

    <div class="divisaoQuestao">
        <div class="tituloDivisao">Instruções <span class="obrigatorio">*</span></div>
        <div class="textoDivisao">Abaixo você poderá inserir as instruções para esta aplicação.</div>
    </div>
                
    <%= Html.TextArea("txtInstrucao", Model.Instrucao.Html, new { @id = "txtInstrucao", @cols = "74", @rows = "18", @class = "txtareaEnunciado html" })%>

</div>