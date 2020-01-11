<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoView.ViewEscolhaTipoResposta>" %>
<%@ Import Namespace="ProvaColegiada.Models" %>
<%@ Import namespace="ProvaColegiada.Models.Question.Answer" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Answer "%>
<li>
    <label>
        <div class="<%=Model.Ativo %>">
            <input id="rdoTipo_<%=Model.Id %>" name="rdoTipo" type="radio" value="<%=Model.Id %>" <%= Model.checkedTipoResposta %>  <%=Model.Disabled %> />
            <span><%= Model.Nome%></span>
            <div>
                <p>Texto que serve de base para várias questões.</p>
                <br />
                <br />
                <img src="<%=UtilView.Url("/Content/imgcss/1.0.2/icone_tipo_questaopai.png")%>" alt="<%= Model.Nome %>" />
            </div>
        </div>
     </label>
</li>