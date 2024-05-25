//Import User from user.js
const User = require('../models/user');

//createUser - Week3 Part5
const createUser = async (req, res) => {

    //extract user data
    const { id, username, email } = req.body;

    try {
        //call user method to save new user
        const user = await User.createUser(id, username, email);
        res.status(201).json(user);
    }

    catch (error){
        console.error(error);
        res.status(500).send("Error creating user");
    }
};

//getAllUsers
const getAllUsers = async (req, res) => {
    try {
        //call user method to find all user
        const user = await User.getAllUsers(id, username, email);
        res.json(user);
    }

    catch (error){
        console.error(error);
        res.status(500).send("Error getting all user");
    }
};

//getUserById
const getUserById = async (req, res) => {

    //extract user data
    const userId = parseInt(req.params.id);

    try {
        //call user method to find user
        const user = await User.getUserById(userId);
        res.json(user);
    }

    catch (error){
        console.error(error);
        res.status(500).send("Error retrieving user");
    }
};

//updateUser
const updateUser = async (req, res) => {

    //extract user data
    const userId = parseInt(req.params.id);
    const newData = req.body;

    try {
        //call user method to find user
        const updatedUser = await User.updateUser(userId, newData);

        if (!updatedUser){
            return res.status(404).send("User not found");
        }
        res.json(updatedUser);
    }

    catch (error){
        console.error(error);
        res.status(500).send("Error updating user");
    }
};

//deleteUser
const deleteUser = async (req, res) => {

    //extract user data
    const userId = parseInt(req.params.id);

    try {
        //call user method to find user
        const success = await User.deleteUser(userId);

        if (!success){
            return res.status(400).send("User not found");
        }
        res.status(204).send();
    }

    catch (error){
        console.error(error);
        res.status(500).send("Error deleting user");
    }
};

async function searchUsers(req, res) {
    const searchTerm = req.query.searchTerm; // Extract search term from query params
  
    try {    
      const users = await User.searchUsers(searchTerm);
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error searching users" });
    }
  };

  async function getUsersWithBooks(req, res) {
    try {
      const users = await User.getUsersWithBooks();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching users with books" });
    }
  };
  

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser, 
    deleteUser,
    searchUsers,
    getUsersWithBooks,
};