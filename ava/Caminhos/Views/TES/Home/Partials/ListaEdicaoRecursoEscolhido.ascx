<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Caminhos.Models.RecursoItem>" %>
<%
int pOrdem = 0;
int sOrdem = 0;
if (Model.idCategoria.Equals(159) && Model.idRecurso.Equals(2))
{
    if (Model.paginasCM != null)
    {
        pOrdem = (int)ViewData["pOrdem"];
        sOrdem = (int)ViewData["sOrdem"];
    }
}
 %>
<input type="hidden" id="idRecurso" value="<%=Model.idRecurso%>" />
<input type="hidden" id="idCategoriaPublicacao" value="<%=Model.idCategoria%>" />
<input type="hidden" id="bolEdicao" value="true" />

<section id="ava_box" class="as1 ava_caminhos ">
    <h1>Edição da tarefa <%=ViewData["intEtapa"]%></h1><!---<span class="lb_info"><a href="javascript: void(0);" class="">&#9660; ajuda</a></span>--->

    <div id="recurso_ava" class="ava_ativtable">            
        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="">
            <THEAD>
                <tr class="table_selected">
                    <td width="37%">                        
                        <img src="<%=Model.strThumbRecurso%>" width="55" height="55" alt="<%=Model.strRecurso%>">
                        <span>
                            <b><%=Model.strRecurso.ToUpper()%></b>                            
                        </span>                        
                        <%                          
                            
                        if (Model.idCategoria > 0)
                        {                            
                            %>
                            <p><a href="javascript: void(0);" class="bt_normal b_tooltip_center">substituir</a></p> 
                            
                            <span class="black_tip_center tooltip black_tip_M" style="display: none"><p>Manter os dados já inseridos nos campos abaixo? </p> 
                                <a href="javascript: void(0);" class="bt_normal green" onclick="substituirRecurso(<%=Model.id %>, true)">manter</a>
                                <a href="javascript: void(0);" class="bt_normal red" onclick="substituirRecurso(<%=Model.id %>, false)">limpar</a>
                                <span class="black_tip_seta">&#9660;</span>
                            </span>    
                            <%  
                        }                       
                        %>
                    </td>                       
                </tr>
            </THEAD>
        </table>        
    </div>
       
    <div class="r-selecionado" id="recursoitem_ava">
        <%    
        if (Model.idRecurso != 11 && Model.idRecurso != 1)
        {
                string strBarra = "";
                if (Model.idCategoria == 16 || Model.idCategoria == 26)
                {
                    strBarra = "/";
                }
                if (Model.idPublicacao > 0 && (Model.intEstado == 94 || Model.intEstado == 91) || Model.idRecurso == 1)
                {
            %>
            <img src="<%=strBarra%><%=Model.strThumbItem%>" width="105" height="105" alt="<%=Model.strTitulo%>">
            <span><strong><%=Model.strTitulo%></strong>
            <p><%=Model.strDescricao%></p></span>
            <%
                    if (Model.idCategoria == 159)
                    {
                        if (Model.paginasCM != null)
                        {
                            %>
                            <span>
                                Iniciar em: <select name="paginacaoCM" id="paginacaoCM">
                            <%
                            string options, selecionado;
                            for (int i = 0; i < Model.paginasCM.Count; i++)
                            {

                                if (Model.paginasCM != null && Model.paginasCM[i].intOrdem.Equals(pOrdem) && Model.paginasCM[i].intOrdem2.Equals(sOrdem))
                                {
                                    selecionado = "selected=\"selected\"";
                                }
                                else
                                {
                                    selecionado = "";
                                }
                                
                                if (Model.paginasCM[i].iVersaoCM.Equals(6))
                                {
                                    options = "urlPai=\"" + Model.paginasCM[i].urlPai + "\" url=\"" + Model.paginasCM[i].url + "\" iVersao=\"" + Model.paginasCM[i].iVersaoCM + "\" idPublicacao=\""+ Model.paginasCM[i].idPublicacao +"\"";
                                }
                                else
                                {
                                    options = "urlPai=\"" + Model.paginasCM[i].urlPai + "\" url=\"" + Model.paginasCM[i].url + "\" pOrdem=\"" + Model.paginasCM[i].intOrdem + "\" sOrdem=\"" + Model.paginasCM[i].intOrdem2 + "\" iVersao=\"" + Model.paginasCM[i].iVersaoCM + "\" idPublicacao=\"" + Model.paginasCM[i].idPublicacao + "\"";
                                }                
                                %>
                                <option <%=selecionado %> value="<%=Model.paginasCM[i].iVersaoCM + ";" + Model.paginasCM[i].intOrdem + ";" + Model.paginasCM[i].intOrdem2 %>" <%=options %>><%=Model.paginasCM[i].intOrdem2 > 0 ? "&nbsp;&nbsp;" : ""%><%=Model.paginasCM[i].strTitulo%></option>
                                <%
                            }
                            %>
                                </select> <a href="#VisualizarCM" class="bt_normal" onclick="visualizarCM(); return false;">Visualizar</a>
                            </span>
                            <%
                        }

                    }

                }
                else
                {
            %>
            <span>Este recurso não está mais disponível.</span>
            <%
            }
        }
        %>
    </div>

    <div class="r-selecionado" id="recursoescolhido" style="display: none">
        
    </div>

    <div class="caminhos_form" id="camposEtapa"> 
          
    </div><!--caminhos_form-->
    
</section>

<aside id="ava_barralateral-direita"></aside>

<section id="ava_steps_footer">
    <a id="btnCancelarCaminho" class="large awesome c-cancelar" id="A1" href="javascript: void(0);" onclick="location.href='/ava/caminhos/home/index/2'"><span class="awe_icons"></span>Cancelar</a>
    
    <a id="btnAvancarCaminho" class="large awesome c-avancar" id="A2" href="javascript: void(0);" onclick="avancarConclusao()">Avançar para conclusão<span class="awe_icons"></span></a>
</section>
