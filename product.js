const getdb=require('../util/database').getdb;
const mongodb=require('mongodb');
class Product{
  constructor(title,imageUrl,price,description,id,userId){
    this.title=title;
    this.price=price;
    this.description=description;
    this.imageUrl=imageUrl;
    this._id=id?new mongodb.ObjectId( id):null;
    this.userId=userId;

  }

  save(){
    const db=getdb();
    let dbop;
    if(this._id){
      dbop= db.collection('products').updateOne({_id :this._id},{$set: this});

    }
    else{
      dbop=db.collection('products').insertOne(this)

    
    }

    return dbop
    .then(result=>{
      console.log(result);
    })
    .catch(err=>{
      console.log(err)
    })
  
    
  }

  static fetchAll(){
    const db=getdb();
    return db.collection('products').find().toArray()
    .then(products=>{
      console.log(products);
      return products;
    })
    .catch(err=>{
      console.log(err)
    })
  }
  static findById(prodId){
    const db=getdb();
    return db.collection('products')
    .find({_id:new mongodb.ObjectId( prodId)})
    .next()
    .then(product=>{
      console.log(product);
      return product
    })
    .catch(err=>{
      console.log(err);

    })
  }
  static deleteproduct(prodId){
    const db=getdb();
    return db.collection('products')
    .deleteOne({_id:new mongodb.ObjectId( prodId)})
    .then(response=>{
      return response;
    })
    .catch(err=>{
      console.log(err);
  })


  }

}



// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const Product = sequelize.define('product', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   title: Sequelize.STRING,
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// });

module.exports = Product;
