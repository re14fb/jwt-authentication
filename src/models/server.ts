import express, { Application } from "express";
import connection from "../db/connection";
import routesProduct from "../routes/product.routes";
import routesDefault from "../routes/default.routes";
import routesUser from "../routes/user.routes";

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || "3000";
        this.listen();
        this.connectDB();
        this.middlewares();
        this.routes();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running http://localhost:${this.port}`);
        });
    }

    connectDB() {
        connection.connect((err) => {
            if(err) {
                console.log(err)
            } else {
                console.log("Connected database...")
            }
        });
    }

    routes() {
        this.app.use("/", routesDefault);
        this.app.use("/api/products", routesProduct);
        this.app.use("/api/users", routesUser);
    }

    middlewares() {
        this.app.use(express.json());
    }
}

export default Server;