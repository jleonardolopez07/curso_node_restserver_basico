const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config');

class Server {
    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        //CONECTAR CON LA BASE DE DATOS
        this.conectarDB();

        //Middlewares
        this.middlewares();
        //Rutas de mi aplicacion
        this.routes();

    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        //CORS
        this.app.use(cors());

        //Lectura y parsep del body
        this.app.use(express.json());

        // directorio publico
        this.app.use(express.static('public'));
    }

    routes() {


        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/users'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('servidor coerriendo en puerto',
                this.port);
        });
    }
}






module.exports = Server;