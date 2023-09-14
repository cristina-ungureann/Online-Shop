const bcrypt = require('bcryptjs');

const db = require('../data/database');


class User {
    constructor(email, password, fullname, street, postal, city){
      this.email = email;  
      this.password = password;
      this.name = fullname;
      this.adress = {
        street: street,
        postalCode: postal,
        city: city
      };  
    }

getUserWithSameEmail(){
  return db.getDb().collection('users').findOne({email: this.email});
}  

hasMatchingPassword(hashedPassword){
 return bcrypt.compare(this.password, hashedPassword);
  
}


    async singup(){

        const hashedPassword = await bcrypt.hash(this.password, 12);
        await db.getDb().collection('users').insertOne({
            email: this.email,
            password: hashedPassword, 
            name: this.name,
            adress: this.adress

        });
    }
}

module.exports = User;