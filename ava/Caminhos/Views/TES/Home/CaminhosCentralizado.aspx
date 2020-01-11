<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/Caminhos.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage<System.Collections.Generic.IList<UsuarioAVA.Models.Perseguicao>>" %>


<asp:Content ContentPlaceHolderID="ContentPlaceHolderPrincipal" ID="ContentPlaceHolder" runat="server">    

    <link href="/AVA/Avaliacoes/Content/css/carregando_aplicador.css<%=Url.TimeStampLink() %>" rel="stylesheet" type="text/css" />
    <link href="/AVA/Avaliacoes/Content/css/realizacao2.0.0.css<%=Url.TimeStampLink() %>" rel="stylesheet" type="text/css" />
	<link href="/AVA/Avaliacoes/Content/css/mceView.css<%=Url.TimeStampLink() %>" rel="stylesheet" type="text/css" />    
    <link href="/AVA/StaticContent/Content/TES/css/centralizacao_atividades.css<%=Url.TimeStampLink() %>" rel="stylesheet" type="text/css" />    

    <script type="text/javascript" src="/AVA/Avaliacoes/Scripts/class/Mensagem3.0.0.js<%=Url.TimeStampLink() %>"></script>
    <script type="text/javascript" src="/AVA/Avaliacoes/Scripts/class/Carregando3.0.0.js<%=Url.TimeStampLink() %>"></script>
	<script type="text/javascript" src="/AVA/Avaliacoes/Scripts/util/jquery.textareaCounter.plugin.js<%=Url.TimeStampLink() %>"></script>
    <script type="text/javascript" src="/AVA/Avaliacoes/Scripts/class/Realizacao2.0.0.js<%=Url.TimeStampLink() %>"></script>
    <script type="text/javascript" src="/AVA/Avaliacoes/Scripts/view/avaliacoes.realizacao-2.0.1.js<%=Url.TimeStampLink() %>"></script>        
    <script type="text/javascript" src="/AVA/StaticContent/Common/Scripts/centralizacaoAgendamentos_3.0.6.js<%=Url.TimeStampLink() %>"></script>

     <%
        bool maisDeUmFilho = false;
        var idAluno = "";
        var strNomeAluno = "";


        int intAdmin = 0;
        int intMeus = 0;
        int intEscola = 0;
        int intPortal = 0;

        bool bolResponsavel = Convert.ToBoolean(ViewData["bolResponsavel"]);
        bool bolEducador = Convert.ToBoolean(ViewData["bolEducador"]);
        bool bolAVAPuro = Convert.ToBoolean(Session["bolAVAPuro"]);
        int idEscola = (int)ViewData["idEscola"];
        int idUsuario = (int)ViewData["idUsuario"];
        int qtdeFilhos = Convert.ToInt32(ViewData["qtdeFilhos"]);
        //int tipoAtividadeAux = Convert.ToInt32(ViewData["idRotaUsuarioAlert"]);
        int tipoAtividadeAux = Convert.ToInt32(ViewData["tipoAtividadeTarefa"]);
              

        if (Convert.ToBoolean(ViewData["admRedeSocial"]))
        {
            intAdmin = 1;
        }

        if (intAdmin == 1)
        {
            intMeus = 1;
            intEscola = 0;
            intPortal = 0;
        }
        else
        {
            intMeus = 1;
            intEscola = 1;
            intPortal = 1;
        }

        if (idEscola == 3760001)
            intEscola = 0;
            
        
        string filhosAux = ViewData["filhos"].ToString();
        string strLogin = ViewData["strLogin"].ToString();
        int idFilhoAtivo = Convert.ToInt32(ViewData["idFilhoAtivo"]);
        string filhos = "";

        //Response.Write("idFilhoAtivo: " + idFilhoAtivo);
        //Response.Write("strLogin: " + strLogin);
        
        if(bolResponsavel){            
            filhos = (filhosAux.StartsWith(";")) ? filhosAux.Substring(1).Trim() : filhosAux.Trim();

            if (filhos.IndexOf(';') > -1)
            {
                maisDeUmFilho = true;
                string[] splitFilhos = filhos.Split(';');
                foreach (string filho in splitFilhos)
                {
                    string[] filhinho = filho.Split(',');
                    idAluno = filhinho[0];
                    strNomeAluno = filhinho[1];

                    if (idFilhoAtivo > 0)
                    {
                        if (Convert.ToInt32(idAluno) == idFilhoAtivo)
                        {
                            break;
                        }
                    }
                    else
                    {
                        break;
                    }
                }
            }
            else
            {
                try
                {
                    string[] filhinho = filhos.Split(',');
                    idAluno = filhinho[0];
                    strNomeAluno = filhinho[1];
                }
                catch (Exception e)
                {
                    idAluno = "";
                    strNomeAluno = "";
                }
            }
            
        }        
       
     %>

    <script type="text/javascript">
        var idUsuarioAvaliacao = <%=idUsuario %>;                   

        <%if(bolResponsavel){ %>
            idAlunoGlobal = <% Response.Write(idAluno); %>;
                
        <%}%>

        function abrirBancoTarefas(){
            window.location.href = "/AVA/Caminhos/Home/Index/1";
        }
        function abrirBancoCaminhos(){
            window.location.href = "/AVA/Caminhos/Home/Index/2";
        }
        function abrirAgendamento(){
            window.location.href = "/AVA/Caminhos/Home/Index/";
        }

        


    </script>
        
        <%if (bolEducador)
        { %>
            <section id="ava_box" class="as1 ava_ativtable reset-border">
            <div class="nav_table aba_bt_geral">    
                
                <% if (!bolAVAPuro)
                   { %>   
                    <a href="javascript: void(0)" id="aba_tarefas" onclick="abrirBancoTarefas()">Tarefas<span class="tip_aba_geral"></span></a>
                    <a href="javascript: void(0)" id="aba_caminhos" class="" onclick="abrirBancoCaminhos()">Caminhos de aprendizagem<span class="tip_aba_geral"></span></a>
                <% }
                   else
                   {
                       if (idEscola == 3760001)
                       {
                           %>      
                           <a href="javascript: void(0)"  id="aba_tarefas" class="atual" onclick="abrirBancoTarefas()">Tarefas<span class="tip_aba_geral"></span></a>
                           <a href="javascript: void(0)" id="aba_caminhos" class="" onclick="abrirBancoCaminhos()">Caminhos de aprendizagem<span class="tip_aba_geral"></span></a>
                               <%
                       }
                       else
                       {
                           %>
                           <a href="javascript: void(0)" id="aba_tarefas" class="atual" onclick="abrirBancoTarefas()">Tarefas<span class="tip_aba_geral"></span></a>
                           <a href="javascript: void(0)"   id="aba_caminhos"  class="" onclick="abrirBancoCaminhos()">Caminhos de aprendizagem<span class="tip_aba_geral"></span></a>
                           <%
                       }
                       %>
                    
                <% } %>

                   
                    <a href="javascript: void(0)" id="aba_agendadas" class="" onclick="abrirAgendamento();">Agendamentos<span class="tip_aba_geral"></span></a> 
                    <%
                   
                   if (bolResponsavel)
                   {
                %>
                    <a href="/ava/caminhos/home/caminhosAluno" class="atual" id="aba_agendadasfilho" class="" ><% if (bolResponsavel && maisDeUmFilho) { Response.Write("Atividades dos filhos"); } else if (bolResponsavel && !maisDeUmFilho) { Response.Write("Atividades do filho"); } %><span class="tip_aba_geral"></span></a> 
                <%}

                %>
            </div>
            </section>
        <%} %>

         <header class="topo_atividades">
            <h2 class="h-tarefas"><strong class="h-strong"><% if (!bolEducador && !bolResponsavel) { Response.Write("Minhas atividades."); }%></strong> 
            <%=bolResponsavel ? "Confira as atividades agendadas para seus filhos." : "Esta é a lista de atividades agendadas para você. Fique de olho no status!"%></h2>
            <section class="row-user show-grid">
            
            <%if (bolResponsavel && maisDeUmFilho)
            { %>
            <div class="form-control-user padding-user">
                <% 
                    string[] splitFilhos = filhos.Split(';');
                    string[] filho1 = splitFilhos[0].Split(',');          
                %>
                <div id="nomeFilho"><%= idFilhoAtivo > 0 ? strNomeAluno: filho1[1]%></div>
                <span class="icons-user"></span>    
                <ul class="list-dropdown-user">
                <%               
                foreach (string filho in splitFilhos)
	            {
                    string[] filhoDetalhes = filho.Split(',');                                 
	            %>
                    <li id="<%=filhoDetalhes[0]%>"><%=filhoDetalhes[1] %></li>
                <%
	            }
                %>                                          
                </ul>                    
            </div>
            <%
	        }
            %>    

            <div class="control-buttons">
                <button id="aberta" id-status="1" data-tab="tab-1" class="default-tab btn-primary current">ABERTAS</button>
                <button id="resultado" id-status="4"  data-tab="tab-1" class="default-tab">RESULTADO</button>
                <button id="embreve" id-status="2"  data-tab="tab-1" class="default-tab">EM BREVE</button>
                <button id="encerrada" id-status="3" data-tab="tab-1" class="default-tab">ENCERRADAS</button>
                <button id="naorealizada" id-status="5"  data-tab="tab-1" class="default-tab">NÃO REALIZADAS</button>                    
                <button id="todos" id-status="1,2,3,4,5"  data-tab="tab-6" class="default-tab right reset-right">TODOS OS STATUS</button>                    
            </div>
            </section>
            <section class="row reset">
            <div class="col-3">
                <select class="form-control" name="selProfessor" id="selProfessor">
                <option value="0">Todos os professores</option>
                <% 
                foreach (var professor in Model)
                {
                    int idProfessor = professor.id;
                    string strProfessor = professor.strNome;
                    %>
                    <option value="<%=idProfessor %>"><%=strProfessor%></option>    
                    <%
                }  
                %>                   
                </select>
            </div>
            <div class="col-3">
                <div class="form-control-icon">
                <%
                    var strClassIcons = "";
                    var idTempAux = 0;
                    var strNomeAtividade = "";
                        
                    switch (tipoAtividadeAux)
                    {
                        case 0:
                            strClassIcons = "todas-t";
                            idTempAux = 0;
                            strNomeAtividade = "Todas as atividades";
                            break;
                        case 1:
                            strClassIcons = "caminho-t";
                            idTempAux = 1;
                            strNomeAtividade = "Caminhos de aprendizagem";
                            break;
                        case 2:
                            strClassIcons = "tarefa-t";
                            idTempAux = 2;
                            strNomeAtividade = "Tarefas";
                            break;
                        case 3:
                            strClassIcons = "avaliacao-t";
                            idTempAux = 3;
                            strNomeAtividade = "Avaliações";
                            break;
                        
                    }
                %>
                <div id="icons" class="<%=strClassIcons %> todas-t"></div>
                <div class="t-conteudo" idTemp="<%=idTempAux %>"><%=strNomeAtividade %></div>        
                <ul class="list-dropdown">
                    <li id="0"><div class="iconList-todasAtividades"></div> Todas as atividades</li>
                    <li id="2"><div class="iconList-tarefas"></div> Tarefas</li>
                    <li id="1"><div class="iconList-caminhosAprendizagem"></div> Caminhos de aprendizagem</li>
                    <% if (!bolAVAPuro)
                      { %>   
                        <li id="3"><div class="iconList-avaliacoes"></div> Avaliações</li>
                    <%} %>
                </ul>
                </div>                    
            </div>
            <div class="col-6 right">
                <section class="row show-grid">
                <div class="col-4">
                    <input type="text" id="strPesquisa" placeholder="Nome da atividade" class="form-control">
                </div>
                <div class="col-2">
                    <input type="text" id="dataInicio" placeholder="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/ " style="width: 100%" class="form-control campoData">
                </div>
                <div class="col-1 alignt-text">até</div>
                <div class="col-2">
                    <input type="text" id="dataFim" placeholder="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/ " style="width: 100%"  class="form-control campoData">
                </div>
                <div class="col-2 ">
                    <button class="btn default" id="btnFiltrarAtiv">Filtrar</button>                            
                </div>
                <div class="col-1 alignt-text">
                    <a href="javascript: void(0);" onclick="limparFiltroAluno();">Limpar</a>
                </div>
                </section>
            </div>                
            </section>
        </header>

        <section id="tab-1" class="row show-grid tab-content current">
          <table id="miolo-conteudo" class="table table-hover">
            <thead>
                <tr style="display:block">
                    <th width="3500px">
                        <div class="ordem-hover" id="orderAtividade">Atividade <i class="ordem ordem-top"></i></div>
                        <div class="right" id="show-realizadas"> 
                            <label class="margin-right">
                                <input type="checkbox" class="checkbox-right mostrar-realizadas" checked>Mostrar realizadas
                            </label>
                        </div>
                    </th>
                    <th width="15%">
                        <div class="ordem-hover" id="orderProfessor">Professor <i class="ordem ordem-top"></i></div>
                    </th>
                    <th width="20%"><div class="ordem-hover" id="orderPeriodo">Período <i class="ordem ordem-top"></i></div></th>
                </tr>
            </thead>
            <tfoot>
                <tr>
                    <th colspan="3" width="80%">
                        <div id="mostraPaginas" class="paginacao-margin">                            
                            <div id="Pagination" class="pagination">
                            </div>
                        </div>

                        <div id="mostraComboPaginas" class="right" style="display:none;">
                            <select class="exibir-paginas" id="exibirPaginas">
                                <option value="10">Exibir 10 por página</option>
                            </select>
                        </div>
                    </th>                          
                </tr>
            </tfoot>
            <tbody id="thFluxoPrincipal">                    
                
            </tbody>
        </table>
        </section> 

        <section id="tab-6" class="row show-grid tab-content">
          <table class="table table-hover">
            <thead>
                <tr style="display:block">
                    <th width="3500px">
                        <div class="ordem-hover" id="orderAtividade">Atividade <i class="ordem ordem-top"></i></div>                        
                    </th>
                    <th width="15%">
                        <div class="ordem-hover" id="orderProfessor">Professor <i class="ordem ordem-top"></i></div>
                    </th>
                    <th width="15%"><div class="ordem-hover" id="orderPeriodo">Período <i class="ordem ordem-top"></i></div></th>
                    <th width="17%"><div class="ordem-hover" id="orderStatus">Status <i class="ordem ordem-top"></i></div></th>
                </tr>
            </thead>
            <tfoot>
                <tr>
                    <th colspan="4" width="80%">
                        <div id="mostraPaginas" class="paginacao-margin">                            
                            <div id="Pagination" class="pagination">
                            </div>
                        </div>

                        <div id="mostraComboPaginas" class="right">
                            <select class="exibir-paginas" id="exibirPaginas">
                                <option value="10">Exibir 10 por página</option>
                            </select>
                        </div>
                    </th>                          
                </tr>
            </tfoot>
            <tbody id="thFluxoPrincipal">                    
                
              
            </tbody>
        </table>
        </section>         
       


</asp:Content>
