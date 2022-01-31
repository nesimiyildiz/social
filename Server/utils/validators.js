module.exports.validateRegisterInput=(
    username,
    email,
    password,
    repassword,
)=>{
    const validation={};
    if(username.trim()===""){
        validation.username="Kullanıcı Adı Boş Geçilemez"
    }
    if(email.trim()===""){
        validation.email="Email Boş Geçilemez"
    }
    if(password.trim()===""){
        validation.password="Parola Boş Geçilemez"
    }else if(password!=repassword){
        validation.repassword="Parola Tekrarı Aynı olmalı"
    }
   
    if(repassword.trim()===""){
        validation.repassword="Parola Tekrarı Boş Geçilemez"
    }

    return{
        validation,
        valid:Object.keys(validation).length<1
    }
    
}

module.exports.validateLoginInput=(username,password)=>{
    const validation={};
    if(username.trim()===""){
        validation.username="Kullanıcı Adı Boş Geçilemez"
    }
   
    if(password.trim()===""){
        validation.password="Parola Boş Geçilemez"
    }

    return{
        validation,
        valid:Object.keys(validation).length<1
    }
}