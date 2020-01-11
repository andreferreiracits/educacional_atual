<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Caminhos.Models.Caminho>" %>

<% 
bool podeEditarCaminho = true;
    
if (Model.totalAgendamento >= 0)
{
    foreach (var ag in Model.lAgendamento)
    {
        if (ag.dtmInicio <= DateTime.Now)
        {
            podeEditarCaminho = false;
            break;
        }

    }
}        
%>

<div class="placa_verde">
    <h2 class="din">
        <%
        if (Model.titulo != "")           
            Response.Write(Model.titulo);           
        else           
            Response.Write("Título do caminho");            
        %>
    </h2>
    
    <%
    if (1 == 0)
    {                
    %>
        <p>
        <%
            if (podeEditarCaminho)
            {
                %>
                <a href="javascript: void(0);" class="bt_normal" onclick="editar(<%=Model.id %>);">Editar</a>
                <a href="javascript: void(0);" class="bt_normal" title="veja mais" alt="veja mais">Duplicar</a>
                <a href="javascript: void(0);" class="bt_normal" onclick="agendar(<%=Model.id %>);" id="ava_agendar">Agendar</a>        
                <a href="javascript: void(0);" class="bt_normal excluir" onclick="excluirCaminho(<%=Model.id %>);">Excluir</a>    
                <%
            }
            else
            {
                %>
                <a href="javascript: void(0);" class="bt_normal" onclick="duplicarRota(<%=Model.id%>)">Duplicar</a>
                <a href="javascript: void(0);" class="bt_normal" onclick="agendar(<%=Model.id %>);" id="ava_agendar">Agendar</a>        
                <%
            }
            %>
        </p>
        <%
    }    
        
    if (Model.descricao != "")
        if (Model.descricao.Length > 200)
        {
            %>
            <p id="caminhoDescr"><%=Model.descricao.Substring(0, 200) + "..."%></p>
            <p id="caminhoDescrCompleto" style="display: none;"><%=Model.descricao%></p>
            <p class="hide_show"><a id="bt_verMaisDescRota" class="bt_normal" href="javascript:void(0);">veja mais</a></p>           
            <%                
        }
        else
        {                
            %>
            <p id="caminhoDescr"><%=Model.descricao%></p>
            <%
        }         
    else           
        Response.Write("<p>Descrição do caminho</p>");
   
    if (Model.lEtapa != null)
    {
        
        if (Model.id > 0)
        {
            if (Model.intStatus == 1)
            {
                %>
                <p><span class="publico"></span>Compartilhado</p>
                <%
            }
            else
            {
                %>
                <p><span class="privado"></span>Privado</p>
                <%
            }
                    
            int qtdTags = Model.lTag.Count;

            if (qtdTags > 0)
            {
               %>
               <p>
                    <strong>tags:</strong>
                    <%=String.Join(", ", Model.lTag.Select(x => RedeSocialAVA.FuncoesTexto.ArrumaAspas(x.strTag)).ToArray())%>
               </p>
               <%         
            }
            %>           
            
            <div class="footer_pv clearfix"><p>Por: <%=Model.nomeUsuario%></p><p>Criado em: <%=Model.dtmCriacao.ToString("dd/MM/yyyy") %> </p></div>    
            <%                
        }        
    }
    %>
</div><!--placa_verde-->
    
