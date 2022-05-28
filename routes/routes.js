const mssql = require('mssql');
const config = require('../data/config');

//ruta de la app
const router = app => {
    //mostrar mensaje de bienvenida en el root
    app.get('/', (request, response) => {
        response.send({
            message: 'Bienvenido a Node.js Express REST API!'
        });
    });
    //mostrar todos los usuarios
    app.get('/users', (request, response) => {
        mssql.connect(config, function(err){
            if(err) console.log(err);

            var request = new mssql.Request();

            request.query('select * from users', function (err, recordset){
                if(err) console.log(err)

                response.send(recordset);
            });
        });
    });

    app.get('/users/:id', (request, response) => {
        mssql.connect(config, function(err){

            const id = request.params.id;

            if(err) console.log(err);

            var req = new mssql.Request();

            req.query("select * from users where id = " + id, function (err, results){
                if(err) console.log(err)

                response.send(results);
            });
        });
    });
//Insertar un nuevo usuario
    app.post('/users', (request, response) => {
        mssql.connect(config, function(err){

            if(err) console.log(err);

            var req = new mssql.Request();

            const id = request.body.id;
            const nombre = request.body.nombre;
            const apellido = request.body.apellido;

            console.log(id+nombre+apellido);

            req.query("insert into users(nombre, apellido) values("+"'"+nombre+"','"+apellido+"')", function (err, results){
                if(err) console.log(err)

                response.status(201).send(`User added`);
            });
        });
    });
//Modificar un usuario
    app.put('/users/:id', (request, response) => {
        mssql.connect(config, function(err){

            const id = request.params.id;
            const nombre = request.body.nombre;
            const apellido = request.body.apellido;

            if(err) console.log(err);

            var req = new mssql.Request();

            req.query("update users set nombre = "+"'"+nombre+"', apellido = "+"'"+apellido+"'"+"WHERE id = "+id, function (err, results){
                if(err) console.log(err)

                response.send('User updated succesfully');
            });
        });
    });
//Eliminar un usuario
    app.delete('/users/:id', (request, response) => {
        mssql.connect(config, function(err){

            const id = request.params.id;

            if(err) console.log(err);

            var req = new mssql.Request();

            req.query("DELETE FROM users WHERE Id = "+id, function (err, results){
                if(err) console.log(err)

                response.send('User deleted');
            });
        });
    });

}

//importar el router
module.exports = router;