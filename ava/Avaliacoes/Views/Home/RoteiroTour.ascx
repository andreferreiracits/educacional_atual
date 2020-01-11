<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<ol>
    <li id="tourStart">
        <input type="hidden" name="config" value='{"tipo":"start", "container":"#barraSuperior", "delay":0}' />
        <p>Bem-vindo à seção Avaliações, uma ferramenta on-line utilizada por milhares de professores e alunos. A área de trabalho está organizada em abas.</p><a href='javascript:tour.startTour()'>Faça um tour »</a>
    </li>
    <li id="menuTour">
        <input type="hidden" name="config" value='{"tipo":"menu", "container":"#barraSuperior", "delay":0}' />
        <select class="tourselect" onchange="tour.gotoStep(this.value)">
              <option value="roteiro1">visão geral</option>
              <option value="roteiro2">questões</option>
              <option value="roteiro3">avaliações</option>
              <option value="roteiro4">agendamentos</option>
              <option value="roteiro5">correção</option>
              <option value="roteiro6">a responder</option>
        </select>
        <ul>
            <li><a href='javascript:tour.resetTour()'>reiniciar</a></li>
            <li><a href='javascript:tour.sairTour()'>parar tour</a></li>
         </ul>
    </li>

    <li id="roteiro1" title="Visão Geral">
        <input type="hidden" name="config" value='{"tipo":"roteiro", "urlbase":"<%=UtilView.Url("")%>"}' />
        <ol>
            <li id="step1">
                <input type="hidden" name="config" value='{"container":"#menuConteudo .abaQuestao", "posicao":"LT", "url":"/Questoes"}' />
                Nesta aba ficam suas questões, de seus colegas de escola e do <%=this.TextosRecursos()["TextoPortal_"+ this.Usuario().TipoPortal.Id]%>.
            </li>
            <li id="step2">
                <input type="hidden" name="config" value='{"container":"#menuConteudo .abaProva", "posicao":"LT", "url":"/Criacao"}' />
                A aba Avaliações exibe as suas provas e pesquisas, as compartilhadas pelos seus colegas de escola ou criadas pelo <%=this.TextosRecursos()["TextoPortal_"+ this.Usuario().TipoPortal.Id]%>.
            </li>
            <li id="step3">
                <input type="hidden" name="config" value='{"container":"#menuConteudo .abaAplicacao", "posicao":"LT", "url":"/Agendamento"}' />
                Depois de criar uma avaliação, você pode agendá-la definindo quem deve respondê-la e em qual período.
            </li>
            <li id="step4">
                <input type="hidden" name="config" value='{"container":"#menuConteudo .abaCorrecao", "posicao":"LT", "url":"/Correcao"}' />
                Se a avaliação tiver questões discursivas, você pode corrigi-las aqui.
            </li>
        </ol>
    </li>

    <% if (this.Usuario().TipoPortal == ProvaColegiada.Models.EnumTipoPortal.Educacional ||
       this.Usuario().TipoPortal == ProvaColegiada.Models.EnumTipoPortal.EducacionalPositivo ||
       this.Usuario().TipoPortal == ProvaColegiada.Models.EnumTipoPortal.PPParcial ||
       this.Usuario().TipoPortal == ProvaColegiada.Models.EnumTipoPortal.PortalAvaliacoes)
       { 
       %>
    <li id="roteiro2" title="Questões">
        <input type="hidden" name="config" value='{"tipo":"roteiro", "urlbase":"<%=UtilView.Url("")%>", "urlroteiro":"<%=UtilView.Url("/TourRoteiros/questoes_educacional.htm")%>"}' />
    </li>

    <li id="roteiro3" title="Avaliações">
        <input type="hidden" name="config" value='{"tipo":"roteiro", "urlbase":"<%=UtilView.Url("")%>", "urlroteiro":"<%=UtilView.Url("/TourRoteiros/avaliacoes_educacional.htm")%>"}' />
    </li>

    <li id="roteiro4" title="Agendamentos">
        <input type="hidden" name="config" value='{"tipo":"roteiro", "urlbase":"<%=UtilView.Url("")%>", "urlroteiro":"<%=UtilView.Url("/TourRoteiros/agendamentos.htm")%>"}' />
    </li>

    <li id="roteiro5" title="Correção">
        <input type="hidden" name="config" value='{"tipo":"roteiro", "urlbase":"<%=UtilView.Url("")%>", "urlroteiro":"<%=UtilView.Url("/TourRoteiros/correcao.htm")%>"}' />
    </li>

    <li id="roteiro6" title="A Responder">
        <input type="hidden" name="config" value='{"tipo":"roteiro", "urlbase":"<%=UtilView.Url("")%>", "urlroteiro":"<%=UtilView.Url("/TourRoteiros/aresponder_educacional.htm")%>"}' />
    </li>
    <% }
       else
       {  %>
    <li id="roteiro2" title="Questões">
        <input type="hidden" name="config" value='{"tipo":"roteiro", "urlbase":"<%=UtilView.Url("")%>", "urlroteiro":"<%=UtilView.Url("/TourRoteiros/questoes.htm")%>"}' />
    </li>

    <li id="roteiro3" title="Avaliações">
        <input type="hidden" name="config" value='{"tipo":"roteiro", "urlbase":"<%=UtilView.Url("")%>", "urlroteiro":"<%=UtilView.Url("/TourRoteiros/avaliacoes.htm")%>"}' />
    </li>

    <li id="roteiro4" title="Agendamentos">
        <input type="hidden" name="config" value='{"tipo":"roteiro", "urlbase":"<%=UtilView.Url("")%>", "urlroteiro":"<%=UtilView.Url("/TourRoteiros/agendamentos.htm")%>"}' />
    </li>

    <li id="roteiro5" title="Correção">
        <input type="hidden" name="config" value='{"tipo":"roteiro", "urlbase":"<%=UtilView.Url("")%>", "urlroteiro":"<%=UtilView.Url("/TourRoteiros/correcao.htm")%>"}' />
    </li>

    <li id="roteiro6" title="A Responder">
        <input type="hidden" name="config" value='{"tipo":"roteiro", "urlbase":"<%=UtilView.Url("")%>", "urlroteiro":"<%=UtilView.Url("/TourRoteiros/aresponder.htm")%>"}' />
    </li>
       <%} %>
</ol>




