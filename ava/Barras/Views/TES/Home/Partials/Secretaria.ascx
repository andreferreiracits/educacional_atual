<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<h3 class="bloco_tit">Secretaria</h3>

<div class="bloco_conteudo" id="div_cont_secre">
	<ul class="sct_abas">
		<li class="" style="display:none" >
			<a href="javascript:void(0)"  >Ferramentas</a>
		</li>
		<li class="ativo" style="display:none">
			<a href="javascript:void(0)">Filhos</a>
			<ul class="">
			</ul>
		</li>
	</ul>

	<div id="tabs-1" class="sct_lista_itens aba_ferramentas" style="display: none;">
		<ul>
		</ul>
	</div>

	<div id="tabs-2" class="sct_lista_itens aba_filhos" style="display: ;">
		<div class="css-panes">
		</div>
	</div>
</div>
