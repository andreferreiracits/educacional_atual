<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<Avaliacoes.Servicos.Agendamentos.Imp.Entidades.Agendamento.Lista.AgendamentoProvaItemLista>>" %>
<%@ Import Namespace="Avaliacoes.Servicos.Agendamentos.Imp.Entidades.Agendamento.Lista" %>
<div id="avaliacoes" class="avaliacoes">
<% 
    int idProva = 0;
    int count = 0;
    string checkado = "checked=\"checked\"";
    string disabled = "";
    foreach(AgendamentoProvaItemLista item in Model.OrderBy(i => i.TituloProva)){ %>
        <div class="blocoMenuAgendamentoConfig">
            <% if(idProva != item.IdProva){
                idProva = item.IdProva;
                count++;
            %>
            <label>
                <div class="blcAvaliacao">
                    <input type="hidden" name="avaliacaoTipo" value="<%: item.IdTipoProva %>" <%: disabled %>/>
                    <input type="radio" class="radioAbaQuestoes" name="Consulta[AvaliacaoSelecionada]" value="<%: idProva %>" <%: checkado %> disabled data-change-submit="true" data-inputsdisable="[name=avaliacaoTipo]"/>
                    <div class="numero coluEsq abaDeft abaQuestoes bgRadio"></div>
                    <div class="numero coluEsq fundoNumeros abaDeft abaNotas"><%=count %></div>
                    <input type="hidden" name="avaliacaoFundoFiltro" data-par="<%=count %>" value="<%: idProva %>" />
                    <div class="coluDir">
                        <div>AVALIAÇÃO</div>
                        <div class="txtAzul bold"><%:item.TituloProva %></div>
                        <div class="clear"></div>
                    </div>
                    <div class="clear"></div>
                </div>
            </label>
            <%
                checkado = "";
                disabled = "disabled=\"disabled\"";
            }%>
            <label>
                <div class="blcAvaliacao aplcConfig">
                    <input type="checkbox" value="<%=item.IdConfig %>" name="Consulta[AgendamentosConfig][]" checked="checked" data-change-submit="true" />
                    <div class="numero coluEsq bgCheck"></div>

                    <div class="coluDir">
                        <div class="bold"><%:item.Titulo %></div>
                        <div><%:Html.Recurso("ServicoAgendamentos.Textos.Periodo_Hifen_" + (int)item.Periodo.Tipo, item.Periodo.Inicio, item.Periodo.Fim)%></div>
                        <div class="clear"></div>
                    </div>
                    <div class="clear"></div>
                </div>
            </label>
        </div>
    <% }  %>    
</div>

