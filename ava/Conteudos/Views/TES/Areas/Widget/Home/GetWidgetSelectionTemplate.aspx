<%@ Page Language="C#" MasterPageFile="~/Views/TES/Shared/SimpleContent.Master" Inherits="PositivoFramework.Web.Mvc.Theme.ThemedViewPage"%>
<asp:Content ContentPlaceHolderID="ContentArea" ID="ContentArea" runat="server">
<style type="text/css">
    #add-widget-window
    {
    	position: absolute;
    	background: #fff;
    	width: 180px;
    	height: 50px;
    	border-width: 10px;
    	border-color: #111;
    	display: none;
    	-moz-border-radius: 5px;
        -webkit-border-radius: 5px;
    }
    
    #add-widget-window fieldset
    {
    	padding: 1em;
        background: #fff;
    }
    
    #add-widget-window fieldset label
    {
        white-space: nowrap;
        margin-right:0.5em;
        padding-top:0.2em;
        text-align:right;
        font-weight:bold;
        background: #fff;
    }
    
    #add-widget-window .add-widget-window-title
    {
        height: 20px;
        font-weight: bold;
        display: block;
        text-align: right;
    }
    
    #add-widget-window-fechar
    {
        float: right;
        padding:2px 3px; 
        -moz-border-radius: 5px;
        -webkit-border-radius: 5px; 
        border:1px solid #bcbcbc; 
        text-decoration:none;  
        font-weight:bold  
    }
</style>

<a href="#" id="add-widget" class="bt mleft" style="float:right; position:relative; top:-11px;"><img src="<<themeUrlRoot>>/extend.png" alt="" /> <%=this.Resource("add_components")%></a>

<div id="add-widget-window" class="add-widget-window"> 
    <div id="add-widget-window-conteudo" style="padding: 6px; background-color:White"> 
        <a href="#" id="add-widget-window-fechar" class="close-window"> X </a>
        {.repeated section @}
            <label for="positivo-widget-{IdWgtWidget}"><input type="checkbox" name="positivo-widget-{IdWgtWidget}" title="{IdWgtWidget}" value="positivo-widget-{IdWgtWidget}" class="add-widget-link"/>&nbsp;&nbsp;{strNome}</label><br />
        {.end}
    </div> 
</div>

<script type="text/javascript">
    jQuery(function () {
        $("#add-widget-window-conteudo").fancyBorder();
    });
</script>

</asp:Content>