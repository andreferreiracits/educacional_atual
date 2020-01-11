<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ProvaView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.Models.Exam" %>

<% using (Html.BeginForm("SalvarProva", "Criacao", FormMethod.Post, new { @id = "frmProvaEstrutura" })){ %>
    <input type="hidden" id="strPathFiles" value="<%=Model.CaminhoUpload %>" />

    <%= Html.Hidden("txtIdProvaEstrutura", Model.Id) %>
    <div class="areaConfiguracoesProva">
         <a id="helpCriAvaliacao" class="btn sec_menuNavegacao" href="javascript:void(0)">?</a>               
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
        <div class="linhaImpar">
            <label class="SEC02511_texto">Identificador:</label>
            <span class="SEC02511_texto">
                <input type="text" id="txtIdentificador" name="txtIdentificador" class="txt" maxlength="500" value="<%= Model.Identificador %>" />
            </span>
        </div>
        <% Html.RenderPartial(Model.BoxCompartilhamento, Model); %>
        
        <% Html.RenderPartial(Model.BoxFormaSelecaoQuestao, Model); %>


        <% Html.RenderPartial(Model.BoxEmbaralhamento, Model); %>

        <div class="divisaoQuestao">
            <div class="tituloDivisao">Texto introdutório:</div>
            <div class="textoDivisao">Será exibido quando o respondente abrir a avaliação.</div>
        </div>

        <%= Html.TextArea("txtIntroducao", Model.Introducao.Html, new { @id = "txtIntroducao", @cols = "106", @rows = "12", @class = "txtareaEnunciado html", @maxchar = Model.LimiteIntroducao, @maxcharmsg = String.Format(Model.MsgLimiteChar, Model.LimiteIntroducao)        
        })%>

        <div class="divisaoQuestao">
            <div class="tituloDivisao">Opções para prova impressa:</div>
            <div class="textoDivisao">No caso de sua aplicação for impressa, preencha os campos abaixo.</div>
            <a class="btn direita" id="btnExpandirTextoImpressa"><div class="btn_setaUP">Ocultar</div>|<div class="btn_setaDown">Expandir</div></a>
        </div>
        <div id="areaTextoImpressa" class="hide">
            <div class="tituloImpressa">Cabeçalho:</div>
            <%= Html.TextArea("txtCabecalho", Model.Cabecalho.Html, new { @id = "txtCabecalho", @cols = "106", @rows = "12", @class = "txtareaEnunciado html", @maxchar = Model.LimiteImpresso, @maxcharmsg = String.Format(Model.MsgLimiteChar, Model.LimiteImpresso)   })%>
            <div class="tituloImpressa">Rodapé:</div>
            <%= Html.TextArea("txtRodape", Model.Rodape.Html, new { @id = "txtRodape", @cols = "106",@rows = "12", @class = "txtareaEnunciado html", @maxchar = Model.LimiteImpresso, @maxcharmsg = String.Format(Model.MsgLimiteChar, Model.LimiteImpresso)})%>
        </div>
    </div>
    
    <div class="navegacaoBotoes">
        <div class="btnEspacamento">
            <%= Html.ActionLink("Cancelar", "Index", "Admin", new { @id = "btnCancelar", @class = "btnCancelar" })%>
        </div>
        <div class="btnEspacamento direita">
            <a id="btnAvancar" class="btnNav">Avançar &raquo;</a>
        </div>
    </div>
<% } %>