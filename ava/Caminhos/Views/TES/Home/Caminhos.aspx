<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/Caminhos.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage<dynamic>" %>



<asp:Content ContentPlaceHolderID="ContentPlaceHolderPrincipal" ID="ContentPlaceHolder" runat="server">

<%
int intAdmin = 0;
int intMeus = 0;
int intEscola = 0;
int intPortal = 0;
int idEscola = (int) ViewData["idEscola"];
bool bolAVAPuro = Convert.ToBoolean(Session["bolAVAPuro"]);
bool bolResponsavel = Convert.ToBoolean(ViewData["bolResponsavel"]);
string filhosAux = ViewData["filhos"] != null ? ViewData["filhos"].ToString() : "";
bool maisDeUmFilho = false;
string filhos = "";
bool bolTurmaFilhos = Convert.ToBoolean(ViewData["turmaFilhos"]);
 
if(bolResponsavel){            
    filhos = (filhosAux.StartsWith(";")) ? filhosAux.Substring(1).Trim() : filhosAux.Trim();

    if (filhos.IndexOf(';') > -1)
    {
        maisDeUmFilho = true;
    }
}
                
        
if (Convert.ToBoolean(ViewData["admRedeSocial"]))
{
    intAdmin = 1;
}

if (intAdmin == 1)
{
    intMeus = 1;
    intEscola = 1;
    intPortal = 1;
}else{
    intMeus = 1;
    intEscola = 1;
    intPortal = 0;
}

if (idEscola == 3760001)
    intEscola = 0;

     
%>  

    <script src="/AVA/avaliacoes/Scripts/view/avaliacoes.correcao-1.0.1.js<%=Url.TimeStampLink() %>"  type="text/javascript"></script>
    <link href="/AVA/avaliacoes/Content/css/correcao1.0.0.css<%=Url.TimeStampLink() %>" rel="stylesheet" type="text/css" />

    <script type="text/javascript">
        jQuery(function () {
             
            var aba = '<%=ViewData["aba"]%>';
            var adm = '<%=ViewData["admRedeSocial"]%>';
            var bolAVAPuro = '<%=ViewData["bolAVAPuro"]%>';
            var idEscola = <%=idEscola %>;
            //alert(aba);
            if (aba == 1) {
                if(!bolAVAPuro){
                    abrirBancoTarefas("1,2,4", <%=intMeus%>, <%=intEscola%>, <%=intPortal%>, '', '', '', false, adm);
                }else{
                  if (idEscola == 3760001) {
                              abrirBancoTarefas("1,2,3,4", <%=intMeus%>, <%=intEscola%>, <%=intPortal%>, '', '', '', false, adm);
                     }else{
                           
                              abrirBancoTarefas("1,2,4", <%=intMeus%>, <%=intEscola%>, <%=intPortal%>, '', '', '', false, adm);
                     }
                }
            } else if (aba == 2) {
                if(!bolAVAPuro){
                    abrirBancoCaminhos("1,2,,4", <%=intMeus%>, <%=intEscola%>, <%=intPortal%>, '', '', '', false, adm);
                }else{
                    // Se for avaPuro não mostra os compartilhados com o portal Status 3!
                     if (idEscola == 3760001) {
                           abrirBancoCaminhos("1,2,3,4", <%=intMeus%>, <%=intEscola%>, <%=intPortal%>, '', '', '', false, adm);
                     }else{
                           abrirBancoCaminhos("1,2,4", <%=intMeus%>, <%=intEscola%>, <%=intPortal%>, '', '', '', false, adm); 
                     }
                }
            } else {
                if (<%=ViewData["idRotaAgendamento"]%> != 0) {
                    abrirAgendamento(0, 1, 1, 1, '', '<%=ViewData["dtmInicio"]%>', '<%=ViewData["dtmFim"]%>', true, adm, 0, '', 2);
                }else {
                    abrirAgendamento(0, 1, 1, 1, '', '', '', false, adm, 0, '', 1);
                }
            }
            
        })        
    </script>

    <input id="anoVigente" value="<%=ViewData["anoVigente"]%>" type="hidden" />
    <input id="idRotaAgendamento" value="<%=ViewData["idRotaAgendamento"]%>" type="hidden" />
   
    <section id="ava_container" class="as1">
        <header id="Hcaminhos" data-valor="ISMAEL">
            <h1 class="blokletters"> Tarefas </h1>
        </header>
        
        <section id="ava_box" class="as1 ava_ativtable">
            <div class="nav_table aba_bt_geral">    
                
                <% if (!bolAVAPuro){ %>   
                    <a href="javascript: void(0)" id="aba_tarefas" class="atual" onclick="abrirBancoTarefas('1,2,4',<%=intMeus %>,<%=intEscola %>,<%=intPortal %>,'','','', false,<%=intAdmin %>)">Tarefas<span class="tip_aba_geral"></span></a>
                    <a href="javascript: void(0)" id="aba_caminhos" class="" onclick="abrirBancoCaminhos('1,2,4', <%=intMeus %>,<%=intEscola %>,<%=intPortal %>,'','','', false,<%=intAdmin %>)">Caminhos de aprendizagem<span class="tip_aba_geral"></span></a>
                <% }else{
                       if (idEscola == 3760001)
                       {
                           %>      
                           <a href="javascript: void(0)"  id="aba_tarefas" class="atual" onclick="abrirBancoTarefas('1,2,3,4',<%=intMeus %>,<%=intEscola %>,<%=intPortal %>,'','','', false,<%=intAdmin %>)">Tarefas<span class="tip_aba_geral"></span></a>
                           <a href="javascript: void(0)" id="aba_caminhos" class="" onclick="abrirBancoCaminhos('1,2,4', <%=intMeus %>,<%=intEscola %>,<%=intPortal %>,'','','', false,<%=intAdmin %>)">Caminhos de aprendizagem<span class="tip_aba_geral"></span></a>
                               <%
                       }
                       else
                       {
                           %>
                           <a href="javascript: void(0)" id="aba_tarefas" class="atual" onclick="abrirBancoTarefas('1,2,4',<%=intMeus %>,<%=intEscola %>,<%=intPortal %>,'','','', false,<%=intAdmin %>)">Tarefas<span class="tip_aba_geral"></span></a>
                           <a href="javascript: void(0)"   id="aba_caminhos"  class="" onclick="abrirBancoCaminhos('1,2,4', <%=intMeus %>,<%=intEscola %>,<%=intPortal %>,'','','', false,<%=intAdmin %>)">Caminhos de aprendizagem<span class="tip_aba_geral"></span></a>
                           <%
                       }
                       %>
                    
                <% } 

                if (Convert.ToInt32(ViewData["idRotaAgendamento"]) != 0) {
                    %>
                    <a href="javascript: void(0)" id="aba_agendadas" class="" onclick="abrirAgendamento(0, 1, 1, 1, '', '<%=ViewData["dtmInicio"]%>', '<%=ViewData["dtmFim"]%>', true, <%=intAdmin%>, 0, '', 2);">Agendamentos<span class="tip_aba_geral"></span></a> 
                    <%
                }else {
                    %>
                    <a href="javascript: void(0)" id="aba_agendadas" class="" onclick="abrirAgendamento(0, 1, 1, 1, '', '', '', false, <%=intAdmin%>, 0, '', 1);">Agendamentos<span class="tip_aba_geral"></span></a> 
                    <%
                }

                if (bolResponsavel && bolTurmaFilhos)
                {
                %>
                    <a href="/ava/caminhos/home/caminhosAluno" id="aba_agendadasfilho" class="" ><% if (bolResponsavel && maisDeUmFilho) { Response.Write("Atividades dos filhos"); } else if (bolResponsavel && !maisDeUmFilho) { Response.Write("Atividades do filho"); } %><span class="tip_aba_geral"></span></a> 
                <%}

                %>
            </div>
            
            <div id="container_painelcontrole">
                
            </div>
                        
        </section> <!--ava_box-->
    </section>
</asp:Content>
