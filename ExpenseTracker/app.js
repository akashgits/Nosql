const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
const dotenv=require('dotenv')
const SignUp_SignInRoutes=require('./Backend/routes/SignUp_SignIn')
const premiumController=require('./Backend/routes/premuim')
const User=require('./Backend/Models/user');
const Expense=require('./Backend/Models/expense');
const DownloadList=require('./Backend/Models/DownloadList')
const forgetPassword=require('./Backend/Models/forgetpassword')
const sequelize=require('./Backend/util/database')
const premiumFeatureRoutes=require(`./Backend/routes/premiumfeatures`);
const Order=require('./Backend/Models/Order');
const helmet=require('helmet');
const compression=require('compression')
const morgan=require('morgan');
const fs=require('fs')
const path = require('path');
const mongoose=require('mongoose')


app.use(bodyParser.urlencoded({extended:false}))
app.use(cors());
dotenv.config();
const accesslogs=fs.createWriteStream(path.join(__dirname,'accesslogs'),{flags:'a'});


app.use(helmet());
app.use(compression());
app.use(morgan('combined',{stream:accesslogs}))


 app.use(express.json())
app.use(SignUp_SignInRoutes);
// app.use(premiumController);
// app.use(premiumFeatureRoutes);
app.use('/m',(req,res,next)=>{
    res.json('okkk')
})

mongoose.connect('mongodb://localhost:27017/realexpensetracker')
.then(response=>{
    app.listen(2121);
})

