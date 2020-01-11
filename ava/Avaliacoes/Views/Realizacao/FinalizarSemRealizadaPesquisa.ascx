<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>
<div id="finalizar">
    <div id="AR_conteudo">
        <div class="barraPrincipal">
            <div class="fundo">
                <div class="areaTexto">
                    <div class="logoAvaliacoes"></div><div class="campoTexto semBorda"><%=Html.Encode(Model.Nome) %></div>
                </div>
            </div>
        </div>
            
        <div id="areaConteudo" class="areaConteudo">
        <div  class="encerrado"><label>O prazo deste agendamento já encerrou.</label></div>
        </div>
    </div>
</div>
