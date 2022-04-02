import { StatusCodes } from "http-status-codes"
import { AdminModel } from "../models/index.js"

module.exports = {
    modifyCar: (req, res) => {
        if (req.accountType != `admin`) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                error: "Doar adminul poate executa aceasta comanda!"
            })
        }
        if (!req.body) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                error: `missing body`
            })
        }
        const { error, value } = AdminModel.modifyCarSchema.validate(req.body)
        if (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                error: error.message
            })
        }
        req.db.searchCar(req.body.registration_number, (err, results) => {
            if (err) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    err: err.message
                })
            } else if (!results) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    data: `Mașina nu există în baza de date.`
                })
            } else {
                req.db.modifyCar(req.body, (err, results) => {
                    if (err) {
                        res.status(StatusCodes.BAD_REQUEST).json({
                            success: false,
                            err: err.message
                        })
                    } else {
                        res.status(StatusCodes.OK).json({
                            success: true,
                            data: `Mașina a fost modificată cu succes.`
                        })
                    }
                })
            }
        })


    },
    addNotification: (req, res) => {
        if (req.accountType != `admin`)
            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                error: "doar adminul poate executa aceasta comanda!"

            })
        if (!req.body)
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                error: `missing body`
            })

        const { error, value } = AdminModel.newNotificationSchema.validate(req.body)
        if (error)
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                error: error
            })
        if (!req.body.expiry_date)
            req.body.expiry_date = null
        req.db.addNotification(req.body, (err, results) => {
            if (err) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    err: err.message
                })
            } else res.status(StatusCodes.OK).json({
                success: true,
                data: "notificarea a fost adaugata cu succes!"
            })
        })
    },
    deleteNotification: (req, res) => {

        if (req.accountType == `admin`) {
            if (!req.body)
                return res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    error: `missing body`
                })
            const { error, value } = AdminModel.deleteNotificationSchema.validate(req.body)
            if (error)
                return res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    error: error
                })
            req.db.searchNotification(req.body.id, (err, results) => {
                if (err) {
                    res.status(StatusCodes.BAD_REQUEST).json({
                        success: false,
                        err: err.message
                    })
                } else if (!results) {
                    res.status(404).json({
                        success: false,
                    })
                } else {
                    req.db.deleteNotification(req.body.id, (err, results) => {
                        if (err) {
                            res.status(StatusCodes.BAD_REQUEST).json({
                                success: false,
                                err: err.message
                            })
                        } else res.status(StatusCodes.OK).json({
                            success: true,
                            message: "Notificarea a fost stearsa cu succes!"
                        })
                    })
                }
            })
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({
                success: 0,
                error: "doar adminul poate executa aceasta comanda!"
            })
        }
    }
}