<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Caminhos.Models.Caminho>" %>

<div class="right agendamento_descricao">
    <div class="ta_desc">
    
        <h3>Descrição da atividade</h3>
        <% 
        if (Model.descricao.Length > 200)
        {
            %>
            <p id="caminhoDescr"><%=Model.descricao.Substring(0, 200) + "..."%></p>
            <p id="caminhoDescrCompleto" style="display: none;"><%=Model.descricao%></p>
            <p><a id="bt_verMaisDescRota" class="bt_normal" href="javascript:void(0);">veja mais</a></p>           
            <%                
        }
        else
        {                
            %>
            <p id="caminhoDescr"><%=Model.descricao%></p>
            <%
        }        
        %>
    
    </div> <!--ta_desc-->

    <div class="ava_tags_box_clean clearfix">
        <h4 class="left">Tags:</h4> 
        <%
        if (Model.lTag.Count > 0)
        {
            %>
            <ul class="ava_tags">
                <%
                foreach (var tag in Model.lTag)
                {                    
                    %>
                    <li id="<%=tag.id%>"><%=tag.strTag%> <span class="lajo_x  FontAwesome"><a href="javascript: void(0);"></a></span></li>    
                    <%                                         
                }
                %> 
		    </ul>
            <%
        }
        else
        {
            %>
            <p>Você não adicionou tags para este caminho.</p>  
            <%
        }
        %>           					                
        </div>
</div>
<div class="ta_alunos left">
    <div class="ta_alunos_cb">
        <span>Exibindo resultados para:</span>       
        <select class="sTurmas">
            <%                
            int cont = 0;
            foreach (var turma in Model.lTurmasAgendadas)
            {
                string strSelect = "";
                cont++;
                if (cont == 1)
                {
                    strSelect = "selected";                   
                }
                
                if (turma.strTipoAgendamento == "turma")
                {
                %>                    
                    <option id="<%=turma.idTurma%>" <%=strSelect%>><%=turma.strTurma%></option>
                <%
                }
                else
                {
                %>
                    <option id="<%=turma.idTurma%>" <%=strSelect%>><%=turma.strTurma%>(<%=turma.totalAlunoTurma%>)</option>
                <%
                }
            }            
        %>
        </select>
    </div>

    <div class="ta_alunos_container usuarios_agendamento">

    </div>
</div>
    <div class="clearfix"></div>

    <div class=" agendamento_descricao">
            <div class="loader" id="loadAtividades" style="display:none"><img src="/AVA/StaticContent/Common/img/geral/ajax-loader.gif"></div>

            <div  id="ta_desc">

                <div id="dados-tarefa-aluno">
                    

                </div>
            </div>
            
    </div>



<!-- <div class=" agendamento_descricao">
    <div  id="ta_desc">
    
         <h3>Aluno</h3>
        
        <div id="aluno_atividade"> -->
        
            <!-- <div class="ta_desc_corr"> -->
            
                <!-- <a href="javascript: void(0);" id="btPrevAluno" class="bt_normal disable">« Anterior</a>
                <a href="javascript: void(0);" id="btNextAluno" class="bt_normal" onclick="next(180117)">Próximo »</a>     -->
                
            <!-- <img src="/userData/ava/repositorio/11993/11993917/Imagens/201892493237_170.Jpeg" width="170" height="170">
            <h4 class="blokletters">Aluno 01 - QA (PE/PP)</h4>
            <h1 class="blokletters">Anexos:</h1>
            <h4 class="blokletters">asdasdasdasdasdasdasdasda</h4> -->
            
            
            
        <!-- </div> -->

        <!-- </div> -->
<!--     
    </div>
</div>  -->
