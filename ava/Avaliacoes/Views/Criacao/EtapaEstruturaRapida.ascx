<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ProvaView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.Models.Exam" %>

<% using (Html.BeginForm("SalvarProvaRapida", "Criacao", FormMethod.Post, new { @id = "frmProvaEstruturaRapida" })){ %>
    <%= Html.Hidden("txtIdProvaEstrutura", Model.Id) %>
    <div class="areaConfiguracoesProva">
        <div class="divisaoQuestao">
            <div class="tituloDivisao">Configurações</div>
            <div class="textoDivisao">Informe os dados básicos da avaliação.</div>
        </div>

        <% Html.RenderPartial(ViewData["FinalidadeView"].ToString(), Model);  %>

        <div class="linhaPar">
            <label class="SEC02511_texto">Título: <span class="obrigatorio">*</span></label>
            <span class="SEC02511_texto">
                <input type="text" id="txtNome" name="txtNome" class="txt" maxlength="80" value="<%= Model.Nome %>" <%=Model.PermissaoAlterarEstruturaDisabled %> />
            </span>
        </div>

        <%--<% Html.RenderPartial(Model.BoxCompartilhamento, Model); %>--%>
        
        <% Html.RenderPartial(Model.BoxFormaSelecaoQuestao, Model); %>

        <%--<% Html.RenderPartial(Model.BoxEmbaralhamento, Model); %>--%>
    </div>
<% } %>