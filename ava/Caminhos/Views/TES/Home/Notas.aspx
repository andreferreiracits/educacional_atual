<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/Caminhos.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage<Caminhos.Models.Agendamento>" %>

<asp:Content ContentPlaceHolderID="ContentPlaceHolderPrincipal" ID="ContentPlaceHolder" runat="server">
   
    <% if(Model.lTurmasAgendadas != null)
           if (Model.lTurmasAgendadas.Count > 0)
           { %>
                <script>
        $(function(){
            verNotasTurma(<%=Model.lTurmasAgendadas[0].idTurma%>, <%=Model.id%>);
            
            var $sidebar   = $(".atv_relatorio .fixed_area"),
                $window    = $(window),
                offset     = $sidebar.offset(),
                topPadding = 50;

            $window.scroll(function() {
                if ($window.scrollTop() > offset.top) {
                    $sidebar.stop().animate({
                        top: $window.scrollTop() - offset.top + topPadding
                    });
                } else {
                    $sidebar.stop().animate({
                        top: 0
                    });
                }
            });

        })//function
        
        function verNotasTurma(idTurma, idRotaAgendamento) {
            
            $(".ava_menuturmas a").removeClass("awesome-color");
            $(".ava_menuturmas a#" + idTurma).addClass("awesome-color");
            $("#container_notas").html("<tr><td colspan='5'><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></td></tr>");
                    
            $.ajax({
                type: "POST",
                url: "/AVA/Caminhos/Home/RetornaNomeTurma",
                data: {                    
                    idTurma: idTurma
                },
                success: function (data) {
                    
                    $("#nomeTurma").html(data);

                    $.ajax({
                        type: "POST",
                        url: "/AVA/Caminhos/Home/SelecionaNotasTurmaAgendamento",
                        data: {
                            idRotaAgendamento: idRotaAgendamento,
                            idTurma: idTurma
                        },
                        success: function (data) {
                            $("#container_notas").html(data);
                        },
                        error: function (data) {
                            if (data.status != 0) {
                                console.debug("erro ao buscar notas da turma:" + idTurma + " do agendamento: " + idRotaAgendamento);
                            }
                        }
                    });

                },
                error: function (data) {
                    if (data.status != 0) {
                        console.debug("erro ao buscar turma:" + idTurma);
                    }
                }
            });
            

        }    
    </script>

    <% 
           }
    int idRotaAgendamento = Model.id;    
    %>

    <section id="ava_container" class="as1">
        <header id="Hcaminhos">
            <a href="/ava/caminhos" class="btn_cinza right">
                <span class="FontAwesome voltar"></span>
                Voltar para Agendamentos
            </a>

            <h1 class="blokletters">Notas de atividades</h1>
        </header>
        <div class="ver_notas">
            <% 
                string dtmInicio = Model.dtmInicio.ToString("dd/MM/yyyy");
                string horaInicio = Model.dtmInicio.ToString("HH:mm");
                string dtmFim = Model.dtmFim.ToString("dd/MM/yyyy");
                string horaFim = Model.dtmFim.ToString("HH:mm");                        
            %> 
            <h4 class="blokletters"> Título da Tarefa: <p class="tt_tarefaNotas"><%=Model.strRota%></p></h4>
            <div class="atv_periodo"> de <span><%=dtmInicio%> ás <%=horaInicio%></span> até <span><%=dtmFim%> ás <%=horaFim%></span></div>
        </div>
        
        <div class="ava_menuturmas">
            <%
            int cont = 0;
            
            foreach (var turma in Model.lTurmasAgendadas)
            {
                string strHTMLTurma = "";
                if (turma.strTipoAgendamento == "individual")
                {
                    strHTMLTurma = " (" + turma.totalAlunoTurma + ")";
                }

                
                if (cont == 0)
                {
                    %>
                    <a href="javascript: void(0);" id="<%=turma.idTurma%>" onclick="verNotasTurma(<%=turma.idTurma%>, <%=idRotaAgendamento%>)" class="large awesome awesome-color">
                        <span></span><%=turma.strTurma%><%=strHTMLTurma%>
                    </a>    
                    <%
                }
                else
                {
                    %>
                    <a href="javascript: void(0);" id="<%=turma.idTurma%>" onclick="verNotasTurma(<%=turma.idTurma%>, <%=idRotaAgendamento%>)" class="large awesome">
                        <span></span><%=turma.strTurma%><%=strHTMLTurma%>
                    </a>    
                    <%                    
                }
                cont++;
            }           
            %>
        </div>

        <section class="ava_ativtable atv_relatorio">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="fixed_area">
                <thead class="">                                        
                    <tr class="tableheader">
                        <td width="100%" colspan="5">
                            <h4 class="blokletters" id="nomeTurma"></h4>                                      
                            <div class="bts_right_top">
                                <!---<a href="#" class="bt_normal "><span></span> Exportar tabela de notas</a>--->
                                <a href="#" class="bt_normal "><span></span>Voltar para o topo</a>                                      
                            </div>
                        </td>                                    
                    </tr>
                    <tr class="tableheader">
                        <td width="47%">Aluno</td>
                        <td width="14%" class="center">Cod. Aluno</td>
                        <td width="13%" class="center">Nº Chamada</span></td>
                        <td width="16%" class="center">Progresso</td>
                        <td width="10%" class="center">Nota</td>
                    </tr>
                </thead>
            </table>
            
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="trhover relat_content">
                <tbody class="tablebody" id="container_notas">
                    <tr><td colspan='5'><img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' /></td></tr>                       
                </tbody>        
            </table>

        </section>
    </section>
</asp:Content>
