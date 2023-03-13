const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose')

 const errorController = require('./controllers/error');
// const sequelize = require('./util/database');
// const Product = require('./models/product');
 const User = require('./models/user');
// const Cart = require('./models/cart');
// const CartItem = require('./models/cart-item');
// const Order = require('./models/order');
// const OrderItem = require('./models/order-item');
const mongoconnect=require('./util/database').mongoConnect;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

 const adminRoutes = require('./routes/admin');
 const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('640efe5601422600cebf58a6')
    .then(user => {
      console.log("this s user in app");
      console.log(user)
      req.user =user;
      next();
    })
    .catch(err => console.log(err));
  //next()
});

 app.use('/admin', adminRoutes);
  app.use(shopRoutes);

app.use(errorController.get404);


// mongoconnect(()=>{
//   //console.log(client)
//   app.listen(3000)

// })

mongoose.connect('mongodb://localhost:27017/expenseTrac1')
.then(result=>{
  User.findOne().then(user=>{
    if(!user){
      const user=new User({
        name:'akash',
        email:'akak@gmail.com',
        cart:{
          items:[]
        }
      })
      user.save();

    }
  })

  app.listen(3000)
})
.catch(err=>{
  console.log(err)
})







