<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ProvaGrupoView>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<div id="cadAgrupamento">
    <input type="hidden" name="idProvaGrupoSalvar" value="<%=Model.Id%>" />
    <div class="configTitle">
        <span>Informações sobre o agrupamento</span>
    </div>
    <div class="conteudoCapaCadastro">
        <div class="linhaPar">
            <div class="opcoes">
                <div class="conteudo">
                    <label class="SEC02511_texto">
                        Nome:</label>
                    <input type="text" id="strNomeGrupo" name="strNomeGrupo" class="txt" maxlength="80"
                        value="<%= Model.Nome %>" />
                </div>
                <div class="conteudo2">
                    <label class="SEC02511_texto"> Escolha uma cor:</label>

                    

                    <label class="listaPickColor">
                        <%= Html.DropDownList("strCor", (IEnumerable<SelectListItem>)Model.ListaCorSelecao(), new { @class = "slc" })%>
                    </label>
                    <label class="labelSigla <%=Model.CssAgrupamento %>"> </label>
                    <div class=""></div>
                </div>
            </div>
        </div>
        <div class="linhaDivisoria"></div>
        <div class="linhaImpar">
            <div class="opcoes">
                <div class="conteudo">
                    <label class="SEC02511_texto">
                        Seu agrupamento terá uma capa?</label>
                </div>
                <div class="conteudo dadosCriacao">
                    <input id="rdoCapaSim" name="rdoCapa" type="radio" value="1" <%=Model.CheckComCapa %> />
                    <label for="rdoCapaSim">
                        Sim</label>
                    <input id="rdoCapaNao" name="rdoCapa" type="radio" value="0" <%=Model.CheckSemCapa %> />
                    <label for="rdoCapaNao">
                        Não</label>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="conteudoCapa" class="<%=Model.ShowCapa %>">
    <div class="configTitle">
        <span>Capa</span>
    </div>
    <div class="conteudoCapaCadastro">
        <div class="linhaPar">
            <div class="opcoes">
                <div class="conteudo">
                    <label class="SEC02511_texto">Sigla:</label>
                    <span class="SEC02511_texto">
                        <input type="text" id="strSiglaGrupo" name="strSiglaGrupo" class="txt" maxlength="2" size="2" value="<%= Model.Sigla %>" />
                    </span>
                    <div class="textoHelp">* até 2 caracteres</div>
                </div>
            </div>
        </div>
        <div class="linhaDivisoria"></div>
        <div class="linhaImpar">
            <div class="opcoes">
                <div class="conteudo">
                <%=Html.TextArea("strConteudoGrupo", Model.Conteudo, new { @id = "strConteudoGrupo", @cols = "56", @rows = "12", @class = "txtareaEnunciado html", @maxchar = Model.LimiteConteudo, @maxcharmsg = String.Format(Model.MsgLimiteChar, Model.LimiteConteudo)}) %>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="clear"></div>

