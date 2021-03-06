import Joi from "joi";

const customerValidation=(req,res,next)=>{

    const Schemas=Joi.object().keys({
        citizenNidNumber:Joi.number().min(16).required(),
        cbhiCollectionYear:Joi.number().min(4).required()

    })
    const { error } =Schemas.validate(req.body);
    if(error){
        return res.status(400).json({
            status:400,
            error: error.details[0].message,
        });
    }
    next();
}
export default customerValidation;