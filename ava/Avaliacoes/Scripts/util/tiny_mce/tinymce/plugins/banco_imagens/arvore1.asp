<!--#Include Virtual = "/Recursos/SessionMan/SessionMan.asp"-->
<%
	strNomeCampo = request("NomeCampo")
	strNomeForm = request("NomeForm")
	strNomeFuncao = request("NomeFuncao")
%>

<html>
<head>
<title>Inserir Imagem - Banco de Imagens </title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">

</head>
<script src="../../tiny_mce_popup.js"> </script>
<script src='itens.js'> </script>

<script>

ed = tinyMCEPopup.editor;

function insertImagem(caminho, flash, x, y) {
	
	
	if (flash == 1){
	
		
		h = '<img src="/avaliacoes/tinymce/jscripts/tiny_mce/plugins/banco_imagens/img/trans.gif"' ;
		
		h += ' class="mceAnimacaoBI"';
		h += ' title="\'src\' : \'' + caminho + '\', \'x\' : \''+x+'\', \'y\' : \''+y+'\'"';
		h += ' width="'+x+'"';
		h += ' height="'+y+'"';
		h += ' align="' + 'center' + '"';
	
		h += ' />';
		
		ed.execCommand('mceInsertContent', true, h);
	
	} else
	{
	
		var fe, f = document.forms[0], h;
	
		tinyMCEPopup.restoreSelection();
		fe = ed.selection.getNode();		
		h = '<img src="'+ caminho +'"' ;			
		h += ' class="mceBanco_Imagem"';	
		h += ' />';
		
		ed.execCommand('mceInsertContent', false, h);
	}	
		
	tinyMCEPopup.close();
	
}
</script>
<script>
<!--
function inicio()
{
Aberta[0]=true;
remonta();
}

function remonta()
{
	var npag =  "<html> <body bgcolor='#FFFFCC'><style type='text/css'><!--.tree { FONT-FAMILY: Verdana, Arial, Helvetica, sans-serif; FONT-SIZE: 10px; white-space: nowrap } A:link{color: #000000; text-decoration: none} A:visited {color: #000000; text-decoration: none} A:active {color: #000000; text-decoration: none} A:hover {color: #990000; text-decoration: none }--></style> <p class='tree'>";
	npag += Mostra(0,"") ;
	npag += "</p> </bo" + "dy> </html>";
	arvore.document.open();
	arvore.document.write(npag);
	arvore.document.close();
}

function chaveia(codigo)
{
	var pos = arvore.pageYOffset;  // NS
	if (pos==null) pos = arvore.document.body.scrollTop; // IE
	Aberta[codigo]=!Aberta[codigo];
	remonta();
	if (pos!=0) arvore.scrollTo(0,pos);
}

function Mostra(codigo, espaco)
{
	var	retorno ="";
	var cont =0;
	if (Filhos[codigo]!= null)
	{ 
		if (Aberta[codigo])
		{
			while (Filhos[codigo][cont]!=-1)
			{
				retorno += espaco + sinal(Filhos[codigo][cont]) + "<a href='javascript:parent.sel(" + Filhos[codigo][cont] + ")'>" +  Assuntos[Filhos[codigo][cont]] + "</a><BR>";
				retorno += Mostra(Filhos[codigo][cont], espaco + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")
				cont++;
			}
		}
	}
	return(retorno);
}

function sinal(codigo)
{
	var	retorno ="&nbsp;&nbsp;&nbsp;";
	if (Filhos[codigo]!= null)
	{ 
		if (Aberta[codigo])
			retorno = "<a href='javascript:parent.chaveia(" + codigo + ")'>&#150;</a>&nbsp;";
		else
			retorno = "<a href='javascript:parent.chaveia(" + codigo + ")'>+</a>&nbsp;";
	}
	return(retorno);
}

function sel(codigo)
{
	if (Filhos[codigo]!= null)
	{ 
		chaveia(codigo)
		imagens.document.location.href = "javascript:parent.branco()";
		
	}
	else
	{
	    imagens.document.location.href = "/recursos/tinymce/plugins/banco_imagens/selecionaImagem.asp?assunto=" + cod[codigo] + "&descrassunto=" + Assuntos[codigo];
	}
}

function branco()
{
	return("<htm><" + "script" + ">function retorna(nomeArquivo){}</" + "script" + "><body bgcolor='#FFFFCC'><table width=100% height=100%  border=0> <tr><td valign=middle align=center style='FONT-FAMILY: Verdana, Arial, Helvetica, sans-serif; FONT-SIZE: 12px;'> Selecione um grupo de imagem.</td></tr></table></body></html>");
}
function cabeca()
{
	
	return("<htm><body topmargin=10 bgcolor='#FFFFCC' style='FONT-FAMILY: Verdana, Arial, Helvetica, sans-serif; FONT-SIZE: 12px;'>Gupos de imagem:</body></html>");
}

	function retorna(nomeArquivo, flash, x, y)
	{
		
		insertImagem(nomeArquivo, flash, x, y)	
	}

</script>


</html>


<frameset cols="*" rows="*,48" onload = "inicio()" border=0> 
	<frameset cols="198,*" rows="*" > 
	  <frameset cols="*" rows="30,*">
	     <frame src="javascript:parent.cabeca()" scrolling=no>
	  	 <frame src="javascript:parent.branco()" name="arvore">
	  </frameset> 
	  <frame src="javascript:parent.branco()" name="imagens" scrolling=no >
	</frameset>
	<frame src="botoes.htm" name="botoes"  scrolling=no>
</frameset><noframes></noframes>
