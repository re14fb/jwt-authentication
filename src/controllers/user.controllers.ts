import { Request, Response} from "express";
import connection from "../db/connection";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const addUser = async (req: Request, res: Response) => {
    const { name, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    connection.query("INSERT INTO users SET ?", { name: name, password: hashedPassword},  (error, data) => {
        if (error) throw error;
        
        res.json({
            msg: "Add user"
        });
    });
}

export const loginUser = async (req: Request, res: Response) => {
    const { name, password } = req.body;

    connection.query(`SELECT * FROM ${process.env.TABLE_234} WHERE name = ` + connection.escape(name), (err, data) => {
        if(err) {
            throw err;
        } else {
            if(Array.isArray(data) && data.length === 0) {
                // No user in database
                res.json({
                    msg: "No user in database"
                });
            } else {
                // Exist user in database

                // Get database password
                const userPassword = data[0].password;

                // Compare database password with password
                bcrypt.compare(password, userPassword).then((result) => {
                    if(!result) {
                        // Passowod incorrect
                        res.status(404).json({
                            msg: "Password incorrect"
                        });
                        return
                    }

                    // Login exist - generate token
                    const token = jwt.sign({
                        name: name
                    }, process.env.SECRET_KEY || "secret123", {
                        expiresIn: "10000"
                    });


                    res.status(200).json({
                        token
                    });
                });
            }
        }
    });
}