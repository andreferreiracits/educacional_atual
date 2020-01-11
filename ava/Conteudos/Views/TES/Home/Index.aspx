<%@ Page Language="C#" debug="true" MasterPageFile="~/Views/TES/Shared/SiteMeio.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage" %>
<asp:Content ContentPlaceHolderID="ContentPlaceHolderDadosMeio" ID="ContentArea" runat="server">
<%
    string materia = ViewData["strMateria"].ToString();

    int serie = Convert.ToInt32(ViewData["intSerie"]);
%>
<script>
    jQuery(function ($) {
        IniciaIndex('<%=materia %>', <%=serie %>);
    });
</script>

	<div id="ava_wrap" class="centralizaclass">
		<section id="ava_container" class="as1">               
			<!--Player Atividades-->
			<div class="topo_titulo topo_conteudo" id="Hcaminhos">
				<h1 class="blokletters left">Ciências da Natureza / </h1>
				<h2 class="blokletters left"> Biologia.</h2>
				<a href="javascript:void(0);" class="btn_cinza right">Veja os demais conteúdos de Biologia</a>
			</div>
			<div class="clearfix"></div>
			<aside class="menu_conteudo">
				<div class="pesquisa_Conteudo">
					<h3>Pesquisa</h3>
					<form>
                        <select style="margin-bottom:5px;" id="IdPapelEnsino" name="IdPapelEnsino" onchange="mudarDisciplinas(document.getElementById('IdPapelEnsino').options[selectedIndex].value);">
					        <option value="0" selected="">Todos os níveis</option>
					        <option value="1010101">Fundamental I</option>
					        <option value="1010201">Fundamental II</option>
					        <option value="1020001">Ensino Médio</option>
				        </select>
                        <select style="margin-bottom:5px;" id="idDisciplina" name="idDisciplina" disabled="disabled">
                            <option value="0" selected="selected">Todas as disciplinas</option>
                        </select>
                    <!--
						<ul class="combo">
							<li class="opt_nivel">
								<a href="javascript:void(0)" intValorNivel="0" class="nivel niveis_tdos">Todos os níveis<span>&#9660;</span></a>
								<ul class="option nivel">
									<li><a href="javascript:void(0)" intValorNivel="1010101">Fundamental 1</a></li>
                                    <li><a href="javascript:void(0)" intValorNivel="1010201">Fundamental 2</a></li>
									<li><a href="javascript:void(0)" intValorNivel="1020001">Ensino Médio</a></li>
								</ul>
							</li>
						</ul>
						<ul class="combo">
							<li class="opt_ano">
								<a href="javascript:void(0)" intValorDisciplinas="0" class="ano anos_todos">Todos os anos<span>&#9660;</span></a>
								<ul class="option ano anos_combo">

								</ul>
							</li>
						</ul>
                    -->
						<input id="strPesquisa" type="text" placeholder="Digite a palavra-chave"/>
						<button id="btnBusca" type="button" class="busca right"><span class="icon-search"></span></button>
					</form>
				</div>
                <div id="accordion_conteudos" class="sep_menu_conteudo">
                     <h3>Ensino Fundamental I<span class="icon-sort-down"></span></h3>
                     <div>
                        <ul>
                            <li><a href="javascript:void(0)" onclick="BuscaCM('arte', '1010101', '0', 'Fundamental I/Arte')">Arte</a></li>
                            <li><a href="javascript:void(0)" onclick="BuscaCM('6', '1010101', '0', 'Fundamental I/Ciências')">Ciências</a></li>
                            <li><a href="javascript:void(0)" onclick="BuscaCM('8', '1010101', '0', 'Fundamental I/Educação Física')">Educação Física</a></li>
                            <li><a href="javascript:void(0)" onclick="BuscaCM('11', '1010101', '0', 'Fundamental I/Geografia')">Geografia</a></li>
						    <li><a href="javascript:void(0)" onclick="BuscaCM('12', '1010101', '0', 'Fundamental I/História')">História</a></li>
                            <li><a href="javascript:void(0)" onclick="BuscaCM('16', '1010101', '0', 'Fundamental I/Língua Portuguesa')">Língua Portuguesa</a></li>
						    <li><a href="javascript:void(0)" onclick="BuscaCM('73', '1010101', '0', 'Fundamental I/Língua Inglesa')">Língua Inglesa</a></li>
                            <li><a href="javascript:void(0)" onclick="BuscaCM('15', '1010101', '0', 'Fundamental I/Matemática')">Matemática</a></li>
					    </ul>
                     </div>
                     <h3>Ensino Fundamental II<span class="icon-sort-up"></span></h3>
                     <div>
                        <ul>
						    <li><a href="javascript:void(0)" onclick="BuscaCM('arte', '1010201', '0', 'Fundamental II/Arte')">Arte</a></li>
						    <li><a href="javascript:void(0)" onclick="BuscaCM('6', '1010201', '0', 'Fundamental II/Ciências')">Ciências</a></li>
                            <li><a href="javascript:void(0)" onclick="BuscaCM('8', '1010201', '0', 'Fundamental II/Educação Física')">Educação Física</a></li>
						    <li><a href="javascript:void(0)" onclick="BuscaCM('10', '1010201', '0', 'Fundamental II/Física')">Física</a></li>
                            <li><a href="javascript:void(0)" onclick="BuscaCM('11', '1010201', '0', 'Fundamental II/Geografia')">Geografia</a></li>
						    <li><a href="javascript:void(0)" onclick="BuscaCM('12', '1010201', '0', 'Fundamental II/História')">História</a></li>
						    <li><a href="javascript:void(0)" onclick="BuscaCM('73', '1010201', '0', 'Fundamental II/Língua Inglesa')">Língua Inglesa</a></li>
						    <li><a href="javascript:void(0)" onclick="BuscaCM('16', '1010201', '0', 'Fundamental II/Língua Portuguesa')">Língua Portuguesa</a></li>
                            <li><a href="javascript:void(0)" onclick="BuscaCM('15', '1010201', '0', 'Fundamental II/Matemática')">Matemática</a></li>
                            <li><a href="javascript:void(0)" onclick="BuscaCM('19', '1010201', '0', 'Fundamental II/Química')">Química</a></li>
					    </ul>
                     </div>
                     <h3>Ensino médio <span class="icon-sort-up"></span></h3>
                     <div>
                        <ul>
						    <h4>Matemática e suas Tecnologias</h4>
						    <li><a href="javascript:void(0)" onclick="BuscaCM('15', '1020001', '0', 'Ensino Médio/Matemática')">Matemática</a></li>
					    </ul>	
					    <ul>
						    <h4>Ciências da Natureza</h4>
						    <li><a href="javascript:void(0)" onclick="BuscaCM('7', '1020001', '0', 'Ensino Médio/Biologia')">Biologia</a></li>
						    <li><a href="javascript:void(0)" onclick="BuscaCM('10', '1020001', '0', 'Ensino Médio/Física')">Física</a></li>
						    <li><a href="javascript:void(0)" onclick="BuscaCM('19', '1020001', '0', 'Ensino Médio/Química')">Química</a></li>
					    </ul>	
					    <ul>
						    <h4>Linguagens e Códigos</h4>
                            <li><a href="javascript:void(0)" onclick="BuscaCM('arte', '1020001', '0', 'Ensino Médio/Arte')">Arte</a></li>
                            <li><a href="javascript:void(0)" onclick="BuscaCM('8', '1020001', '0', 'Ensino Médio/Educação Física')">Educação Física</a></li>
						    <li><a href="javascript:void(0)" onclick="BuscaCM('73', '1020001', '0', 'Ensino Médio/Língua Inglesa')">Língua Inglesa</a></li>
						    <li><a href="javascript:void(0)" onclick="BuscaCM('16', '1020001', '0', 'Ensino Médio/Língua Portuguesa')">Língua Portuguesa</a></li>
					    </ul>	
					    <ul>
						    <h4>Ciências Humanas</h4>
						    <li><a href="javascript:void(0)" onclick="BuscaCM('filosofia', '1020001', '0', 'Ensino Médio/Filosofia')">Filosofia</a></li>
                            <li><a href="javascript:void(0)" onclick="BuscaCM('11', '1020001', '0', 'Ensino Médio/Geografia')">Geografia</a></li>
						    <li><a href="javascript:void(0)" onclick="BuscaCM('12', '1020001', '0', 'Ensino Médio/História')">História</a></li>
                            <li><a href="javascript:void(0)" onclick="BuscaCM('sociologia', '1020001', '0', 'Ensino Médio/Sociologia')">Sociologia</a></li>
					    </ul>
                     </div>
                </div>
                <!--
                <div class="sep_menu_conteudo accordion_conteudos">
					<h3>Ensino Fundamental I<span class="icon-sort-down"></span></h3>
                    <ul>
						<h4>Matemática e suas Tecnologias</h4>
						<li><a href="javascript:void(0)" onclick="BuscaCM('15', '1010101', '0')">Matemática</a></li>
					</ul>	
					<ul>
						<h4>Ciências da Natureza</h4>
						<li><a href="javascript:void(0)" onclick="BuscaCM('6', '1010101', '0')">Ciências</a></li>
					</ul>	
					<ul>
						<h4>Linguagens e Códigos</h4>
						<li><a href="javascript:void(0)" onclick="BuscaCM('73', '1010101', '0')">Língua Inglesa</a></li>
						<li><a href="javascript:void(0)" onclick="BuscaCM('16', '1010101', '0')">Língua Portuguesa</a></li>
					</ul>	
					<ul>
						<h4>Ciências Humanas</h4>
						<li><a href="javascript:void(0)" onclick="BuscaCM('11', '1010101', '0')">Geografia</a></li>
						<li><a href="javascript:void(0)" onclick="BuscaCM('12', '1010101', '0')">História</a></li>
						<li><a href="javascript:void(0)" onclick="BuscaCM('8', '1010101', '0')">Educação Física</a></li>
					</ul>
				</div>
                <div class="sep_menu_conteudo accordion_conteudos">
					<h3>Ensino Fundamental II<span class="icon-sort-down"></span></h3>
					<ul>
						<h4>Matemática e suas Tecnologias</h4>
						<li><a href="javascript:void(0)" onclick="BuscaCM('15', '1010201', '0')">Matemática</a></li>
					</ul>	
					<ul>
						<h4>Ciências da Natureza</h4>
						<li><a href="javascript:void(0)" onclick="BuscaCM('6', '1010201', '0')">Ciências</a></li>
						<li><a href="javascript:void(0)" onclick="BuscaCM('10', '1010201', '0')">Física</a></li>
						<li><a href="javascript:void(0)" onclick="BuscaCM('19', '1010201', '0')">Química</a></li>
					</ul>	
					<ul>
						<h4>Linguagens e Códigos</h4>
						<li><a href="javascript:void(0)" onclick="BuscaCM('73', '1010201', '0')">Língua Inglesa</a></li>
						<li><a href="javascript:void(0)" onclick="BuscaCM('16', '1010201', '0')">Língua Portuguesa</a></li>
					</ul>	
					<ul>
						<h4>Ciências Humanas</h4>
						<li><a href="javascript:void(0)" onclick="BuscaCM('11', '1010201', '0')">Geografia</a></li>
						<li><a href="javascript:void(0)" onclick="BuscaCM('12', '1010201', '0')">História</a></li>
						<li><a href="javascript:void(0)" onclick="BuscaCM('8', '1010201', '0')">Educação Física</a></li>
					</ul>
				</div>
				<div class="sep_menu_conteudo accordion_conteudos">
					<h3>Ensino médio <span class="icon-sort-up"></span></h3>
					<ul>
						<h4>Matemática e suas Tecnologias</h4>
						<li><a href="javascript:void(0)" onclick="BuscaCM('15', '1020001', '0')">Matemática</a></li>
					</ul>	
					<ul>
						<h4>Ciências da Natureza</h4>
						<li><a href="javascript:void(0)" onclick="BuscaCM('7', '1020001', '0')">Biologia</a></li>
						<li><a href="javascript:void(0)" onclick="BuscaCM('10', '1020001', '0')">Física</a></li>
						<li><a href="javascript:void(0)" onclick="BuscaCM('19', '1020001', '0')">Química</a></li>
					</ul>	
					<ul>
						<h4>Linguagens e Códigos</h4>
						<li><a href="javascript:void(0)" onclick="BuscaCM('73', '1020001', '0')">Língua Inglesa</a></li>
						<li><a href="javascript:void(0)" onclick="BuscaCM('16', '1020001', '0')">Língua Portuguesa</a></li>
					</ul>	
					<ul>
						<h4>Ciências Humanas</h4>
						<li><a href="javascript:void(0)" onclick="BuscaCM('11', '1020001', '0')">Geografia</a></li>
						<li><a href="javascript:void(0)" onclick="BuscaCM('12', '1020001', '0')">História</a></li>
						<li><a href="javascript:void(0)" onclick="BuscaCM('8', '1020001', '0')">Educação Física</a></li>
					</ul>						
				</div>
                -->
			</aside>
			<div id="paginacao_conteudos" class="cont_Conteudos container">
                
            
			</div>
           
			
		</section>
    </div><!-- #principal -->
	<div class="clearfix"></div>
</asp:Content>

