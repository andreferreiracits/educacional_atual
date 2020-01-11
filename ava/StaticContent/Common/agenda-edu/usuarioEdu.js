function UsuarioEdu(email,password){

    this.email = email;
    this.password = password;

}


function getToken(){
    
    var token = sessionStorage.getItem('token-agendaedu');
    
    return token;

    // return "UaQSbdjyj0208acElOhDfvOx5k0-TLFw0UV4_K8Hz7V69YDm6gkMUGC0L8SlqrLXs9syF0xzYoMVShYiXfG-ATEux7iqJ72zR_uAd14bj0We3mBzBBxsU1KLHkmw4yLJY5TWMw";
}

