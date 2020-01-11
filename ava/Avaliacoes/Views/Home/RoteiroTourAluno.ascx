<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<ol>
    <li id="tourStart">
        <input type="hidden" name="config" value='{"tipo":"start", "container":"#barraSuperior", "posicao":"T", "delay":0}' />
        <p>Bem-vindo à seção Avaliações, uma ferramenta utilizada por milhares de professores e alunos que já processou milhões de provas on-line.</p><a href='javascript:tour.startTour()'>Faça um tour »</a>
    </li>
    <li id="menuTour">
        <input type="hidden" name="config" value='{"tipo":"menu", "container":"#barraSuperior", "delay":0}' />
        <ul>
            <li><a href='javascript:tour.gotoStep("roteiro1")'>visão geral</a></li>
            <li><a href='javascript:tour.resetTour()'>reiniciar</a></li>
            <li><a href='javascript:tour.sairTour()'>parar tour</a></li>
         </ul>
    </li>
    <li id="roteiro1" title="Visão Geral">
        <input type="hidden" name="config" value='{"tipo":"roteiro", "urlbase":"<%=UtilView.Url("")%>"}' />
        <ol>
            <li id="step1">
                <input type="hidden" name="config" value='{"container":"#tblAplicacoesUsuario tbody > tr", "posicao":"B", "url":"/Aresponder"}' />
                As avaliações e pesquisas mostradas na sua lista foram agendadas pelos seus professores ou pelo <%=this.TextosRecursos()["TextoPortal_"+ this.Usuario().TipoPortal.Id]%>.
            </li>
            <li id="step2">
                <input type="hidden" name="config" value='{"container":"#divFiltroAvancado .cxOrdemResultado", "posicao":"RT"}' />
                Reorganize suas provas usando os comandos que ficam no topo da lista. 
            </li>
            <li id="step3">
                <input type="hidden" name="config" value='{"container":"#divFiltroAvancado .cxOrdemResultado .btAresponder.bordaD.btOrdemAZ", "posicao":"T"}' />
                É possível colocar as provas em ordem alfabética de título.
            </li>
            <li id="step4">
                <input type="hidden" name="config" value='{"container":"#divFiltroAvancado .cxOrdemResultado .btAresponder.bordaD.bordaE.btOrdemC", "posicao":"RT"}' />
                Ordene por data de início ou de fim para ver quais provas precisam ser feitas primeiro.
            </li>
            <li id="step5">
                <input type="hidden" name="config" value='{"container":"#filtroAresponder .subDivFacaFiltros", "posicao":"LT"}' />
                Os filtros são úteis para mostrar apenas o que lhe interessa no momento. 
            </li>
            <li id="step6">
                <input type="hidden" name="config" value='{"container":"#tblAplicacoesUsuario tbody > tr > td.tdStatusAvaliacao", "posicao":"RT"}' />
                Fique atento ao estado da avaliação. Avaliações abertas podem ser feitas imediatamente. Verde indica resultado liberado. Amarelo indica que a prova ainda não abriu.
            </li>
        </ol>
    </li>
</ol>




