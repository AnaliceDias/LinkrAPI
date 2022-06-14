import joi from "joi"

const signupSchema = joi.object({
  name: joi.string().min(2).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  picture: joi.string().uri().required(),
})

export default signupSchema
