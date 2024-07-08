import jwt from 'jsonwebtoken'

export const generateToken=(id)=>{
    const token=jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"1h"})
    console.log(token,"is the token")
    return token
}