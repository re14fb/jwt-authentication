import { Request, Response} from "express";
import connection from "../db/connection";

export const getProducts = (req: Request, res: Response) => {
    connection.query("SELECT * FROM products", (error, data) => {
        if (error) console.log(error);

        res.json({ data });
    });
}