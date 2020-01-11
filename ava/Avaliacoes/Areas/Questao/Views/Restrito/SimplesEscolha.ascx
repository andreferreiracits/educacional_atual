<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Avaliacoes.Componentes.Questao.Models.QuestaoSimplesEscolhaView>" %>
<form id="editar" action="<%=Url.Content("~/Questao/Restrito/Salvar") %>"  method="post" data-render="avl_formjson" data-avl_formjson-entidade="Questao" data-event-start="avl_load-show" data-event-end="avl_load-hide">

<input type="hidden" name="Questao[Id]" value="<%= Model.Id %>" />
<input type="hidden" name="Questao[IdBanco]" value="<%= Model.IdBanco %>" />
<input type="hidden" name="Questao[CodigoOrigem]" value="SEC02511" />
<input type="hidden" name="Questao[Tipo]" value="<%= Model.Tipo.Id %>" />
<a href="<%=Url.Content("~/Questoes/EditaClassificacaoTempRefactor/" + Model.Id) %>" data-action="avl_popup" data-avl_popup-setting="height=600,width=900,scrollbars=1, resizable=1" class="avl_stps_btn_edit">Editar classificação</a>
<fieldset>
	<legend><strong>Enunciado</strong></legend>
	<textarea cols="106" maxlength="50000" name="Questao[Enunciado][Conteudo]" rows="12" data-render="<%=Model.Enunciado.EhHtml ? "avl_tiny" : "" %>" data-element-format="#formatTyne" data-avl_tiny-upload="debug" data-avl_tiny-upload_debug_path="<%=Url.Content(String.Format("~/Questoes/AnexarImagem/{0}", Model.Id)) %>" data-noparse="true" ><%=Model.Enunciado.Conteudo %></textarea>
	<input type="hidden" value="<%=Model.Enunciado.EhHtml%>" name="Questao[Enunciado][EhHtml]" />
</fieldset>
<fieldset>
    <legend><strong>Alternativas</strong></legend>
    <ul class="alternativas">
<% 
    char letra = 'A';
    int count = 0;
    foreach (Avaliacoes.Servicos.Questao.Interfaces.IAlternativaQuestao resposta in (Avaliacoes.Servicos.Questao.Imp.Respostas.RespostasQuestaoEscolha)Model.Respostas) { %>
        <li>
            <h3><%=letra%>)</h3>
            <input type="hidden" name="Questao[Respostas][<%=count%>][Id]" value="<%= resposta.Id %>" />
            <textarea cols="106" maxlength="5000" name="Questao[Respostas][<%=count%>][Texto][Conteudo]" rows="12" data-render="<%=resposta.Texto.EhHtml ? "avl_tiny" : "" %>" data-element-format="#formatTyne" data-avl_tiny-upload="debug" data-avl_tiny-upload_debug_path="<%=Url.Content(String.Format("~/Questoes/AnexarImagem/{0}", Model.Id)) %>" data-noparse="true" ><%=resposta.Texto.Conteudo%></textarea>
	        <input type="hidden" value="<%=resposta.Texto.EhHtml%>" name="Questao[Respostas][<%=count%>][Texto][EhHtml]" />
            <label><input type="radio" name="Questao[Corretas]" value="<%=letra %>" <%=Model.CheckCorreta(letra)%> /> alternativa correta</label>
        </li>
        <%
        letra++;
        count++;
    } %>
    </ul>
</fieldset>

<footer>
    <button type="submit" class="avl_stps_btn">Salvar</button>
</footer>


       
</form>
