import express from "express";
import bodyParser from "body-parser";
//const mysql = require('mysql');
//const express = require('express');
//const bodyParser = require('body-parser');
import mysql from "mysql";
import dotenv from 'dotenv'
dotenv.config()




const app = express();
const port = process.env.PORT || 5000

//app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({extended: true}));

//app.use(bodyParser.json())
app.use(express.json());

//mysql
/*const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs_test'
})*/

/*const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mini-erp'
})*/

/*const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'ams-ns1.greengeeks.com',
    user: 'sbconsu1_luish',
    password: 'LuisDenver24!',
    database: 'sbconsu1_mini-erp'
})*/


var pool = mysql.createPool({
    connectionLimit : 10,
    host     : '107.6.183.178',
    port     :  3306,
    user     : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE

});

//get all users
app.get('/', (req, res)=>{
    pool.getConnection((err, connection)=>{
        if(err) throw err
        console.log(`connection as id........ ${connection.threadId}`)

        //query(sqlString, callback)
        //connection.query('SELECT * from users', (err, rows)=>{
            connection.query('SELECT * from clients', (err, rows)=>{

            connection.release()//return the connection to pool

            if(!err){
                res.send(rows)
            }else{
                console.log(err)
            }
        })

    })
})


//get a user by ID
app.get('/:id', (req, res)=>{
    pool.getConnection((err, connection)=>{
        if(err) throw err
        console.log(`connection as id ${connection.threadId}`)

        //query(sqlString, callback)
        //connection.query('SELECT * from users WHERE user_id=?',[req.params.id], (err, rows)=>{
        connection.query('SELECT * from clients WHERE CLIENT_ID=?',[req.params.id], (err, rows)=>{

            connection.release()//return the connection to pool

            if(!err){
                res.send(rows)
            }else{
                console.log(err)
            }
        })

    })
})


//Add a record / User
app.post('/', (req, res)=>{
    pool.getConnection((err, connection)=>{
        if(err) throw err
        console.log(`connection as id ${connection.threadId}`)

        const params = req.body


        //query(sqlString, callback)
        connection.query('INSERT INTO users SET ?',params , (err, rows)=>{
            connection.release()//return the connection to pool

            if(!err){
                res.send(`User name as: ${params.user_firstname} has been added`)
            }else{
                console.log(err)
            }
        })

        console.log(req.body)

    })
})



//update a record / User
app.put('/', (req, res)=>{
    pool.getConnection((err, connection)=>{
        if(err) throw err
        console.log(`connection as id ${connection.threadId}`)

        //const params = req.body
        const {user_id, user_firstname, user_lastname, user_email, user_Image} = req.body


        //query(sqlString, callback)
        connection.query('UPDATE users SET user_firstname = ?, user_lastname =?  WHERE user_id= ?',[user_firstname, user_lastname, user_id] , (err, rows)=>{
            connection.release()//return the connection to pool

            if(!err){
                res.send(`User name: ${user_firstname} has been Modified`)
            }else{
                console.log(err)
            }
        })

        console.log(req.body)

    })
})

//listen on enviroment port or 5000
app.listen(port, () => console.log(`Listen on port ${port}`))


