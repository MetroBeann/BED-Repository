//Import Modules
const sql = require('mssql');
const dbConfig = require("../dbConfig");

//Define User
class User {
    constructor(id, username, email){
        this.id = id;
        this.username = username;
        this.email = email;
    }

    //createUser
    static async createUser(user){

        //Connect to database
        const connection = await sql.connect(dbConfig);

        //Create SQL INSERT
        const sqlQuery = `INSERT INTO Users (username, email) VALUES(@username, @email)`;

        //Execute query
        const request = connection.request();
        request.input("title", user.username);
        request.input("email", user.email);

        const result = await request.query(sqlQuery);

        connection.close();

        //Retrieve this new user using its ID
        return this.getUserById(result.recordset[0].id);
    }

    //getAllUsers()
    static async getAllUsers(){

        //Connect to database
        const connection = await sql.connect(dbConfig);

        //Create SQL SELECT
        const sqlQuery = `SELECT * FROM Users`;

        //Execute query
        const request = connection.request();

        const result = await request.query(sqlQuery);

        connection.close();

        //Retrieve this new user using its ID
        return result.recordset;
    }

    //getUserById(id)
    static async getUserById(id){

        //Connect to database
        const connection = await sql.connect(dbConfig);

        //Create SQL SELECT
        const sqlQuery = `SELECT * FROM Users WHERE id = @id`;

        //Execute query
        const request = connection.request();

        const result = await request.query(sqlQuery);

        connection.close();

        //Retrieve this new user using its ID
        if (result.recordset.length > 0){
            return result.recordset;
        }

        else {
            return null;
        }
        
    }

    //updateUser(id, updatedUser)
    static async updateUser(id, updatedUser){

        //Connect to database
        const connection = await sql.connect(dbConfig);

        //Create SQL SELECT
        const sqlQuery = `UPDATE Users SET username = @username, email = @email WHERE id = @id`;

        //Execute query
        const request = connection.request();
        request.input("id", id);
        request.input("username", updatedUser.username);
        request.input("email", updatedUser.email);

        const result = await request.query(sqlQuery);

        connection.close();

        //Retrieve this new user using its ID
        return result.recordset;
    }

    //deleteUser(id)
    static async deleteUser(id){

        //Connect to database
        const connection = await sql.connect(dbConfig);

        //Create SQL SELECT
        const sqlQuery = `DELETE FROM Users WHERE id = @id`;

        //Execute query
        const request = connection.request();
        request.input("id", id);
        request.input("username", updatedUser.username);
        request.input("email", updatedUser.email);

        const result = await request.query(sqlQuery);

        connection.close();

        //Retrieve this new user using its ID
        if (result.recordset.length > 0){
            return {message: "Deleted successfully"};
        }

        else{
            return {message: "Delete unsuccessful"};
        }
    }
}

module.exports = User;