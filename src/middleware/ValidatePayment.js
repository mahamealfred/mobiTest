import Joi from "joi";

const paymentValidation=(req,res,next)=>{

    const Schemas=Joi.object().keys({
        amount:Joi.string().required(),
        householdnid:Joi.string().required(),
        payername:Joi.string().required(),
        fiscal_year:Joi.string().required()

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
export default paymentValidation;