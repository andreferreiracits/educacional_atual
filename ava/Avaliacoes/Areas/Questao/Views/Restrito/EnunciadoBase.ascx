<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Avaliacoes.Componentes.Questao.Models.QuestaoEnunciadoBaseView>" %>
<form id="editar" action="<%=Url.Content("~/Questao/Restrito/Salvar") %>"  method="post" data-render="avl_formjson" data-avl_formjson-entidade="Questao" data-event-start="avl_load-show" data-event-end="avl_load-hide">

<input type="hidden" name="Questao[Id]" value="<%= Model.Id %>" />
<input type="hidden" name="Questao[IdBanco]" value="<%= Model.IdBanco %>" />
<input type="hidden" name="Questao[CodigoOrigem]" value="SEC02511" />
<input type="hidden" name="Questao[Tipo]" value="<%= Model.Tipo.Id %>" />

<fieldset>
	<legend><strong>Enunciado</strong></legend>
	<textarea cols="106" maxlength="50000" name="Questao[Enunciado][Conteudo]" rows="12" data-render="<%=Model.Enunciado.EhHtml ? "avl_tiny" : "" %>" data-element-format="#formatTyne" data-avl_tiny-upload="debug" data-avl_tiny-upload_debug_path="<%=Url.Content(String.Format("~/Questoes/AnexarImagem/{0}", Model.Id)) %>" data-noparse="true" ><%=Model.Enunciado.Conteudo %></textarea>
	<input type="hidden" value="<%=Model.Enunciado.EhHtml%>" name="Questao[Enunciado][EhHtml]" />
</fieldset>

<footer>
    <button type="submit" class="avl_stps_btn">Salvar</button>
</footer>


       
</form>
