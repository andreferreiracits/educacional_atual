<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Caminhos.Models.Caminho>" %>

<div class="conf_agendamento" style="text-align:center; margin-top: 110px;">
    <h1>Deseja agendar este caminho agora?</h1>
    <a class="large awesome c-cancelar " href="javascript:void(0);" onclick="naoAgendar();"><span></span>Não, obrigado </a>
    <a class="large awesome awesome-color " href="javascript:void(0);" onclick="prepararAgendamento(<%=Model.id %>);"><span></span>Sim</a>
</div>
