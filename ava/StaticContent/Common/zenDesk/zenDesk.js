
// COR PADRÃO DO BOTAO(laranja): #f37952;

function zenDeskLoad(){

jQuery(function ($) {
    window.zESettings = { 
                                webWidget: { 
                                    color: {
                                        theme: '#6e7b8c',
                                        launcher: '#6e7b8c',
                                        button: '#6e7b8c',
                                        resultLists: '#6e7b8c',
                                        header: '#6e7b8c',
                                        articleLinks: '#6e7b8c'
                                    },
                                    helpCenter: {
                                        filter: {
                                        category: '360000878631'
                                        }
                                    },
                                    contactForm: {
                                        tags: ['educacional']
                                    }
                                }
                        };
                    });

    setTimeout(function(){
        fillZEform();//ZENDESK    
    }, 2000);

    function fillZEform(){

            $.ajax({

                url: "/AVA/Mural/Home/GetDataZeDesk",
                async: true,
                method: "GET",
                success: function(zeObject){

                    // console.log(JSON.stringify( zeObject));

                    zE(function() {
                       
                        zE.identify({name: zeObject.Result.strNome,email: zeObject.Result.strEmailEducacional, organization: 'org'});
                         
                        zE.setHelpCenterSuggestions({ search: 'educacional', url: true });
                        
                    });

                },
                error: function(errorObj){

                }

            });

        

    }
}