import Joi from "joi";

const AdminModel = {
    newEmployeeSchema = Joi.object().options({ abortEarly: false }).keys({
        surname: Joi.string().required(),
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
        county: Joi.string().valid('Ilfov', 'Cluj', 'Constanța', 'Dolj', 'Galați', 'Iași', 'Oradea', 'Sibiu', 'Timișoara').required(),
        type: Joi.string().valid('employee', 'admin', 'driver').required()
    }),
    validationEmail = Joi.object().options({ abortEarly: false }).keys({
        email: Joi.string().email().required()
    }),
    bestPrice = Joi.object().options({ abortEarly: false }).keys({
        price: Joi.number().required()
    })
}

export default AdminModel

