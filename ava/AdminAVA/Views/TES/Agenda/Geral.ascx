<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.Collections.Generic.IList<AdminAVA.Models.EscolaAVAAgenda>>" %>

<script type="text/javascript">
$(document).ready(function () {
    $('#paginacao_agenda').pajinate({
        items_per_page: 10,
        wrap_around: true,
        show_first_last: false,
        nav_label_prev: 'Anterior',
        nav_label_next: 'Próxima'
    });
});               
</script>



<div class="header_painel">
    <div id="abas">
	    <a class="bt_normal aba_adm" id="lista_agenda" href="javascript:void(0);">EVENTOS</a> 
	    <a class="bt_normal aba_adm" id="tipo_evento" href="javascript:void(0);">TIPO DE EVENTO</a>
    </div>
    <p class="msg_intro">Acompanhe todos os eventos de agenda criados pelos professores e administradores de sua escola. Não inclui eventos pessoais.</p>
    <div class="agenda_painel">
		    <ul class="filtro_agenda_eventos">
			    <strong>Filtrar por &#9660;</strong>
                <li>	
				    <input type="checkbox" name="filtro_agenda[]" checked="checked" value="2">
				    <label for="filtroEscola">Escola</label>
			    </li>
			    <li>	
				    <input type="checkbox" name="filtro_agenda[]" checked="checked" value="3">
				    <label for="filtroPortal">Portal</label>
			    </li>
			    <li>	
				    <input type="checkbox" name="filtro_agenda[]" checked="checked" value="4">
				    <label for="filtroTurma">Turma</label>
			    </li>
                <li>
                    <input type="submit" class="btn_laranja salvar filtrar_adm_agenda_botao" value="OK" id="btn_filtrarAgenda">
                </li>						
		    </ul>
            
            <br/><br/>
        
        
        <div id="paginacao_agenda" class="container">
        <table width="100%" cellspacing="0" cellpadding="0" border="0" class="tb_avisos">
	        <thead>
	        <tr>
		        <td width="50%">titulo</td>
		        <td width="10%">de:</td>
		        <td width="10%">até:</td>
		        <td width="15%">autor:</td>
		        <td width="15%" align="center">para:</td>
	        </tr>
	        </thead>
            <% 
                if (Model.Count > 0)
                { 
            %>
            
	        <tbody class="content">
            
            <%
                    foreach (var item in Model)
                    {
                        DateTime dataIni = Convert.ToDateTime(item.dtmInicio);
                        DateTime dataFim = Convert.ToDateTime(item.dtmFim);
                        string format = "dd/MM/yyyy";
            %>
		        <tr>
			        <td>
                        <% if (item.idCategoria == 2)
                           {
                        %>
                                <span class="bullet_cor" style="background:#<%=item.strRGB%>"></span>
				                <span style="color:#<%=item.strRGB%>"><%=item.strTipo %></span>
                        <%
                           }
                           else if (item.idCategoria == 3)
                           {
                        %>
                                <span class="bullet_cor" style="background:#9C8C6D"></span>
				                <span style="color:#9C8C6D">Portal</span>
                        <%}
                           else if (item.idCategoria == 4)
                           {
                          %>
                                <span class="bullet_cor" style="background:#7C9C6D"></span>
				                <span style="color:#7C9C6D">Turma</span>
                         <%} %>
				        
				        <div style="width: 445px; word-wrap:break-word;"><%=item.strTitulo%></div>
			        </td>
			        <td><%=dataIni.ToString(format)%><br /><%=item.horaInicio %></td>
			        <td><%=dataFim.ToString(format)%><br /><%=item.horaFim %></td>
			        <td><%=item.strAutor %></td>
			        <td align="center">
                    <%
                        if (item.listAgendaTurma.Count > 0)
                        {
                            foreach (var item2 in item.listAgendaTurma)
                            {
                                %>

                                <%=item2.strTurma%><br />

                                <%
                            }
                        }
                        else
                        {
                            %>
                                -
                            <%
                        }
                                
                            %>
                    </td>
		        </tr>
                <%} %>
                                                                                      
	        </tbody>
            <%
                }
                else
                {
             %>
                    <tr>
                        <td colspan="6">Nenhum aviso encontrado.</td>
                    </tr>
             <%   
                }
            %>
        </table>
        <div class="page_navigation"></div>	
        </div>
        


        <br/><br/><br/>
        <!--
        <ul class="ava_paginas">
	        <li class="ava_previous "><a href="#">« Anterior</a></li>
	        <li class="pag_ativa "><a href="#">6</a></li>
	        <li class=" "><a href="#">7</a></li>
	        <li class=" "><a href="#">8</a></li>
	        <li class=" "><a href="#">9</a></li>
	        <li class=" "><a href="#">10</a></li>
	        <li class="ava_next "><a href="#">Próxima »</a></li>
        </ul>
        -->

        <br/>
    </div>
    <div style="clear:both;"></div>
</div>
