<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Caminhos.Models.Caminho>" %>
   
<div class="placa_verde">
    <h2 class="din" id="titCaminho">
        <%
        if (Model.titulo != "")           
            Response.Write(Model.titulo);           
        else           
            Response.Write("Título do caminho");            
        %>
    </h2>            
    
    <%
    if (Model.descricao != "")
    {
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
    }
    else
    {
        %>
        <p id="caminhoDescr">Descrição do caminho</p>
        <%
    }
    if (Model.lEtapa != null)
    {        
        foreach (var etapa in Model.lEtapa)
        {
            var strClassPlaca = "";
            var strClassSpanAtual = "";
            if (ViewData["intEtapaEdicao"] != "")
            {
                if (etapa.intEtapa == Convert.ToInt32(ViewData["intEtapaEdicao"]))
                {
                    strClassPlaca = "atual";
                    strClassSpanAtual = "seta_etapa";
                }
            }
            var strEtapa = etapa.strEtapa;
            if (strEtapa.Length <= 0)
            {
                strEtapa = "Tarefa sem título";
            }
            
            %>
            <div class="placa_amarela <%=strClassPlaca%>"><a class="" href="javascript: void(0);" onclick="editarEtapa(<%=etapa.id%>, <%=etapa.intEtapa%>)"><%=strEtapa%><span class="<%=strClassSpanAtual%>"></span></a></div>
            <%
        }

        if (ViewData["intEtapa"].ToString().Length > 0 && ViewData["intEtapaEdicao"].ToString().Length <= 0)
        {           
            %>
            <div class="placa_amarela atual"><a class="" href="javascript: void(0); onclick="criarEtapa(<%=Model.id%>)">Título da tarefa <%=ViewData["intEtapa"]%><span class="seta_etapa"></span></a></div>
            <%
        }
        %>           
        
        <div class="placa_add"><a class="" href="javascript: void(0);" onclick="criarEtapa(<%=Model.id %>);">Adicionar tarefa</a><span class="add_etapa"></span></div>
        <%
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
    
