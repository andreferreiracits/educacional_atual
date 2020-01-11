<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews "%>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<style>
    body
    {
        font-family:Arial, Helvetica, sans-serif;
    }
    table{
        width:100%;
    }

    /* cabecalho */
    .cabecalho
    {
        font-family:Arial, Helvetica, sans-serif;
        font-size: 12px;
        color: #000;
    }
    .cabecalhoH1
    {
        font-size: 14px;
        font-weight: bold;
    }
    .cabecalhoP
    {
        font-weight: bold;
    }
    .cabecalhoPSpan
    {
        font-weight: normal;
    }

    /* intro */
    .introducaoTitulo
    {
        border-top: 1px solid black;
        font-size: 12px;
        font-weight: bold;
        font-style: italic;
        padding: 10px 10px 0px 10px;
    }
    .introducaoConteudo
    {
        border-bottom: 1px solid black;
        padding: 0px 10px 10px 10px;
    }
    
    /* enunciado base */
    .enunciadobaseTitulo
    {
        font-size: 12px;
        font-weight: bold;
        margin: 10px 0px 10px 0px;
        font-style: italic;
    }
    .enunciadobaseConteudo
    {
        font-size: 12px;
    }
    /*questoes*/
    .questaoInfo
    {
        font-size: 10px;
        font-weight: normal;
        font-style: italic;
        text-align: left;
        vertical-align: top;
    }
    .questaoIndice
    {
        font-size: 12px;
        font-weight: bold;
        vertical-align: top;
        width: 120px;
    }
    .questaoNota
    {
        font-size: 8px;
        font-weight: bold;
        font-style:italic;
        text-align: right;
        vertical-align: top;
    }
    .questaoBase
    {
         font-size: 12px;
         padding: 10px 20px 0px 20px;
         
    }
    .questaoConteudo
    {
         font-size: 12px;
         padding: 0px 20px 10px 20px;
    }
    .questaoEnunciado
    {
        margin: 0px 20px 20px 20px;
    }

    /*alternativas */
    .alternativaMargin
    {
        width:20px;
    }
    .alternativaMarc
    {
        width: 35px;
        vertical-align: top;
        text-align: left;
    }
    .alternativaLetra
    {
        font-weight: bold;
        vertical-align: top;
        text-align: left;
        width: 35px;
        margin-top: 2px;
    }
    .alternativaConteudo
    {
         vertical-align: top;
         margin-bottom: 20px;
    }
    .alternativaSoma
    {
        vertical-align: top;
        font-weight: bold;
    }
    
    .alternativaDiscursivaTR
    {
        height: 25px;
    }

    .tblDiscursivaBranca
    {
        border: 2px solid black;
    }
    .tblDiscursivaBrancaTD
    {
        font-size: 12px;
    }
    .tblDiscursivaPautada
    {
        border-top: 2px solid black;
        border-left: 2px solid black;
        border-right: 2px solid black;
        border-bottom: 1px solid black;
    }
    .tblDiscursivaPautadaTD
    {
        border-bottom: 1px solid black;
        font-size: 12px;
    }
    .tblDiscursivaQuadriculada
    {
        border-top: 2px solid black;
        border-left: 2px solid black;
        border-right: 1px solid black;
        border-bottom: 1px solid black;
    }
    .tblDiscursivaQuadriculadaTD
    {
        border-bottom: 1px solid black;
        border-right: 1px solid black;
        width: 25px;
        heigth: 25px;
        font-size: 12px;
    }
    .linhasFinal
    {
        font-size: 12px;
    }
    .alternativaAssEsquerda
    {
        width: 50%;
    }
    .alternativaAssDireita
    {
        width: 50%;
    }
    /*gabarito*/
    .gabaritoTitulo
    {
        font-size: 14px;
        font-weight: bold;
        margin: 10px 0px 10px 0px;
        padding: 0px;
        font-style: italic;
    }
    .gabaritoLinhaRecorte
    {
    }
    
    .gabaritoContent
    {
        margin-top: 20px;
        font-size: 12px;
    }
    
    .gabaritoLetra
    {
        font-weight: bold;
        font-size: 12px;
    }

    .textoComentario
    {
        color: Gray;
        vertical-align: top;
        margin-bottom: 3px;
    }
    .respostaSomatoria
    {
        border: 2px solid black;
        padding: 3px 15px;
        margin-left: 5px;
    }
    .associativaBoxDireita
    {
        border: 2px solid black;
        width: 23px;
        height: 25px;
        display: table-cell;
        text-align: center;
        vertical-align: center;
    }
    .lacunaResposta
    {
        /*border: 2px solid black;*/
        width: 110px;
        padding: 2px 5px;
        height: 25px;
        /*display: inline-block;*/
        text-decoration: underline;
    }
    .tblDiscursivaBrancaResposta
    {
        border: 2px solid black;
        padding: 2px 5px;
    }
    .tituloComentario
    {
        font-weight: bold;
        margin: 0px;
    }
</style>