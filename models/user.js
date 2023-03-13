const mongoose=require('mongoose');

const Schema=mongoose.Schema;
const Userschema=new Schema({
  name:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true
  },
  cart:{
    items:[
      {
        productId:{type:mongoose.Schema.Types.ObjectId,ref:'Product', required:true},
        quantity:{type:Number,required:true}
      },

    ]
  }

})

Userschema.methods.addToCart=function(product){
  
    const cartProductIndex=this.cart.items.findIndex(cp=>{
      return cp.productId.toString()===product._id.toString();
    });

    let newQuantity=1;
    const updateCartItems=[...this.cart.items];
    if(cartProductIndex >=0){

      newQuantity=this.cart.items[cartProductIndex].quantity+1;
      updateCartItems[cartProductIndex].quantity=newQuantity;

    }
    else{
      updateCartItems.push({
        productId:product._id,
        quantity:newQuantity})
    }
     
    const updateCart={items:updateCartItems};
    this.cart=updateCart;
    return this.save()


  }

  Userschema.methods.getCart=function(){
    const db=getdb();
        const productIds=this.cart.items.map(i=>{
          return i.productId;
        })
        return db.collection('products').find({_id:{$in:productIds}}).toArray()
        .then(products=>{
          return products.map(p=>{
            return {...p,quantity:this.cart.items.find(i=>{
              return i.productId.toString()===p._id.toString();
            }).quantity
          }
          })
        });
    
        return this.cart;

  }

  Userschema.methods.removeFromCart=function(productId){
    const updateCartItems=this.cart.items.filter(item=>{
    return item.productId.toString()!==productId.toString();
    });
    this.cart.items=updateCartItems;
    return this.save();


  }
  Userschema.methods.clearCart=function(){
    this.cart={items:[]};
    return this.save();

  }


module.exports=mongoose.model('User',Userschema)

// const getdb=require('../util/database').getdb;
// const mongodb=require('mongodb');
// class User{
//   constructor(name,email,cart,id){
//     this.name=name;
//     this.email=email;
//     this.cart=cart;
//     this._id=id;
//   }
//   save(){
//     const db=getdb();
//     return  db.collection('users')
//     .insertOne(this)
//     .then(result=>{
//      // console.log(result);
//       return result;
//     })
//     .catch(err=>{
//       console.log(err)

//     })


//   }
//   static findById(userId){
//     const db=getdb();
//     return db.collection('users')
//     .findOne({_id:new mongodb.ObjectId( userId)})
//     .then(product=>{
//      // console.log('ths is user id in fnd by user')
//       //console.log(product);
//       return product
//     })
//     .catch(err=>{
//       console.log(err);

//     })

//   }

//   addToCart(product){
//     const cartProductIndex=this.cart.items.findIndex(cp=>{
//       return cp.productId.toString()===product._id.toString();
//     });

//     let newQuantity=1;
//     const updateCartItems=[...this.cart.items];
//     if(cartProductIndex >=0){

//       newQuantity=this.cart.items[cartProductIndex].quantity+1;
//       updateCartItems[cartProductIndex].quantity=newQuantity;

//     }
//     else{
//       updateCartItems.push({productId:new Object(product._id),quantity:newQuantity})
//     }
     
//     const updateCart={items:updateCartItems};

//     const db=getdb();
//     return db.collection('users').updateOne(
//       {_id:new Object(this._id)},
//       {$set:{cart:updateCart}}
//     )


//   }

//   getCart(){
//     const db=getdb();
//     const productIds=this.cart.items.map(i=>{
//       return i.productId;
//     })
//     return db.collection('products').find({_id:{$in:productIds}}).toArray()
//     .then(products=>{
//       return products.map(p=>{
//         return {...p,quantity:this.cart.items.find(i=>{
//           return i.productId.toString()===p._id.toString();
//         }).quantity
//       }
//       })
//     });

//    // return this.cart;
//   }



//   deleteItemFromCart(productId){
//     const updateCartItems=this.cart.items.filter(item=>{
//       return item.productId.toString()!==productId.toString();
//     });
//     const db=getdb();
//     return db.collection('users').updateOne(
//       {_id:new Object(this._id)},
//       {$set:{cart:{items:updateCartItems}}}
//     )

//   }

//   addOrder(){
//     const db=getdb();
//     return this.getCart()
//     .then(products=>{
//       const order={
//         items:products,
//         user:{
//           _id:new Object(this._id),
//           name:this.name,
//           email:this.email
//         }
//       }
//       return db.collection('orders').insertOne(order)


//     })
  
    
//     .then(result=>{
//       this.cart={items:[]};
//       return db.collection('users').updateOne(
//         {_id:new Object(this._id)},
//         {$set:{cart:{items:[]}}}
//       )
//     })
//   }

//   getOrders(){
//     const db=getdb();
//     return db.collection('orders').find({'user._id':new Object(this._id)}).toArray()
    

//   }
// }


// module.exports = User;
