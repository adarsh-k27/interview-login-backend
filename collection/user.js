const {
    default: mongoose
} = require('mongoose')
const UserModel = require('../model/useerSchema')
const bcrypt = require('bcrypt')
exports.SignIn = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.query
        //console.log("query",email,password);
        const ValidEmail = await UserModel.findOne({
            email
        })

        if (ValidEmail) {
            const CheckPassword = await bcrypt.compare(password, ValidEmail.password)
            if (CheckPassword) {
                const {
                    password,
                    ...other
                } = ValidEmail._doc

                return res.status(200).json({
                    message: "succes",
                    user: other
                })
            } else return res.status(400).json({
                message: "Password Is Incorrect"
            })
        } else return res.status(400).json({
            message: "Email Not Correct"
        })
    } catch (error) {
        console.log(error);
    }
}

exports.SignUp = async (req, res) => {
    try {
        const {
            email,
            name,
            password
        } = req.query
        //console.log("bo",req.body);
        const AlreadyRegistered = await UserModel.findOne({
            email
        })
        if (AlreadyRegistered) {
            return res.status(400).json({
                message: "User Already Exist"
            })
        } else {
            const create = UserModel.create({
                email,
                password,
                name
            })
            const fff = create
            console.log(fff);
            const {
                passsword,
                ...other
            } = create._doc
            return res.status(200).json({
                message: "success",
                user: other
            })
        }
    } catch (error) {
        console.log(error);
    }
}

exports.AddDetails = async (req, res) => {
    try {
        const {
            age,
            mobile,
            dob,
            gender,
            email
        } = req.query
        console.log(req.query);
        const uPDATE = await UserModel.findOneAndUpdate({
            email
        }, {
            age,
            gender,
            mobile,
            dob,
        }, {
            new: true
        })
        console.log("wslkjhs", uPDATE);
        const {
            password,
            ...other
        } = uPDATE._doc
        if(uPDATE) {
            return res.status(200).json({
                message: "succes",
                Update: other
            })
        }
    } catch (error) {
        console.log(error);
    }
}