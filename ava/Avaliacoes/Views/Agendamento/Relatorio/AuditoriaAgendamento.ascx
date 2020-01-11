<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AuditoriaVoView>" %>

<div class="bloco">
    <div class="titulo">Avaliação:  &nbsp;<span class="valor"><%=Model.Avaliacao %></span></div>
    <div class="titulo">Criador:    &nbsp;<span class="valor"><%=Model.Criador %></span></div>
    <div class="titulo">Adendamento:&nbsp;<span class="valor"><%=Model.Agendamento %></span></div>
</div>

<div class="bloco">
    <div class="titulo">Período do agendamento:</div>
    <div class="valor">Início: &nbsp;<%=Model.DataAgendamentoInicio %></div>
    <div class="valor">Término:&nbsp;<%=Model.DataAgendamentoEncerramento %></div>
</div>

<div class="bloco">
    <div class="titulo">Aluno:</div>
    <div class="valor">Nome:&nbsp;<%=Model.Nome %></div>
    <div class="valor">Login:&nbsp;<%=Model.Login %></div>
</div>

<div class="bloco">
    <div class="titulo">Primeiro acesso a avaliação:</div>
    <div class="valor">Data:&nbsp;<%=Model.DataRealizacaoInicio %></div>
    <div class="valor"><%=Model.IpInicio %></div>
</div>

<div class="bloco">
    <div class="titulo">Encerramento da avaliação:</div>
    <div class="valor">Data:&nbsp;<%=Model.DataRealizacaoEncerramento %></div>
    <div class="valor"><%=Model.IpEncerramento %></div>
</div>

<div class="bloco">
    <span class="titulo"><%=Model.MeioEncerrado %></span>
    <span class="subtitulo direita">Obs.: O IP identifica o endereço na internet da máquina usada pelo aluno.</span>
</div>
