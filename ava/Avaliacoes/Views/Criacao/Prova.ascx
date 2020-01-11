<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ProvaView>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<div class="areaResumoPasso1">
    <div class="divisaoQuestao">
        <div class="tituloDivisao">Configurações</div>
        <div class="textoDivisao">Edite informações complementares a avaliação.</div>
        <a class="btn direita btnConfirmacaoEditarConfiguracao" >Editar</a>
    </div>

    <div class="linhaImpar">
        <label class="questao">Forma de seleção das questões:</label>
        <span class="SEC02511_texto"><%= Model.TipoSelecaoQuestao%></span>
    </div>
    <div class="linhaPar">
        <label class="questao">Título:</label>
        <span class="SEC02511_texto"><%= Html.Encode(Model.Nome) %></span>
    </div>
    <div class="linhaImpar">
        <label class="questao">Identificador:</label>
        <span class="SEC02511_texto"><%= Html.Encode(Model.Identificador) %></span>
    </div>
    <div class="linhaPar">
        <label class="questao">Finalidade:</label>
        <span class="SEC02511_texto"><%= Model.NomeTipoBanco%></span>
    </div>
    <%-- if (((ProvaColegiada.Controllers.BaseController)this.ViewContext.Controller).Usuario.TipoPortal != EnumTipoPortal.Positivo) { --%>
    <div class="linhaImpar">
        <label class="questao">Compartilhamento:</label>
        <span class="SEC02511_texto"><%= Model.Compartilhamento%></span>
    </div>
    <%-- } --%>
    <div class="areaDetalheConfiguracoes">
        <div class="divisaoQuestao">
            <div class="tituloDivisao">Texto Introdutório</div>
            <div class="textoDivisao">Será exibido quando o respondente abrir a avaliação.</div>
            <a class="btn direita btnConfirmacaoEditarConfiguracao" >Editar</a>
        </div>
        <div class="areaInstrucoesHtml mceView">
            <%= Model.Introducao.Html %>
        </div>
    </div>

    <div class="areaDetalheConfiguracoes">
        <div class="divisaoQuestao">
            <div class="tituloDivisao">Opções para prova impressa</div>
            <div class="textoDivisao"></div>
            <a class="btn direita btnConfirmacaoEditarConfiguracao" >Editar</a>
        </div>
         <div class="linhaImpar">
            <div class="SEC02511_texto">Cabeçalho:</div>
        </div>
        <div class="areaInstrucoesHtml mceView">
            <%= Model.Cabecalho.Html %>
        </div>

        <div class="linhaImpar">
            <div class="SEC02511_texto">Rodapé:</div>
        </div>
        <div class="areaInstrucoesHtml mceView">
            <%= Model.Rodape.Html %>
        </div>
    </div>


</div>

<div class="areaResumoPasso4">
    <div class="divisaoQuestao">
        <div class="tituloDivisao">Questões</div>
        <div class="textoDivisao">Confira as questões incluídas nesta prova e o controle.</div>
        <a class="btn direita" id="btnConfirmcacaoEditarQuestao" >Editar</a>
    </div>
    <div class="destaqueAzul">
        <% Html.RenderPartial(Model.BoxResumoQuestoes, Model); %>
    </div>
    
    <% Html.RenderPartial(Model.ViewConfirmacaoBoxNota, Model); %>

</div>