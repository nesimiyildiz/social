const User=require('../../models/User');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken');
const {SECRET_KEY}=require('../../config');
const {UserInputError}=require('apollo-server');
const {validateRegisterInput,validateLoginInput}=require('../../utils/validators')

module.exports={
    Mutation:{
        async register(_,{registerInput:{username,email,password,repassword}}){

            //FIXME: validation control
            const {validation,valid}=validateRegisterInput(username,email,password,repassword);

            if(!valid){
                throw new UserInputError('Errors',{validation})
            }
            //FIXME: user control

            const user=await User.findOne({username});
            if(user) {
                throw new UserInputError("Kayıtlı Kullanıcı Adı",{validation:{username:"kullanıcı ad zaten kayıtlı"}})
            }

            password=await bcrypt.hash(password,12);
            const newUser=new User({
                email,
                username,
                password,
                createdDate:new Date().toISOString()
            })
            const res=await newUser.save();
            const token=jwt.sign({
                id:res.id,
                email:res.email,
                username:res.username
            },SECRET_KEY,{expiresIn:'1h'});

            return{
                ...res._doc,
                id:res._id,
                token
            }



        },
        async login(_,{username,password}){

            //FIXME: Validation Control
            const {validation,valid}=validateLoginInput(username,password);
            if(!valid){
                throw new UserInputError('Hatalı İşlem',{validation})
            }

            //FIXME:User Contorl

            const user=await User.findOne({username});

            if(!user){
                validation.general="Kullanıcı Bulunamadı";
                throw new UserInputError('Hatalı İşlem',{validation})
            }

            //FIXME:Password control

            const passwordControl=await bcrypt.compare(password,user.password);

            if(!passwordControl){
                validation.general="Parola Hatalı"
                throw new UserInputError('Hatalı İşlem',{validation})
            }
            const token=jwt.sign({
                id:user.id,
                email:user.email,
                username:user.username
            },SECRET_KEY,{expiresIn:'1h'});

            return{
                ...user._doc,
                id:user._id,
                token
            }


        }
    }
}