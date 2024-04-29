// Import the User model and jwt package
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Define the createuser function
const createuser = async (req,res)=> {
    // Destructure the username and password from the request body
    const {username,password} = req.body;
    // Initialize feedback as a 404 error message
    let feedback = createFeedback(404, `${username} could not be created.`);

    // Check if username and password are not undefined
    if(typeof(username)!== 'undefined' && typeof(password)!== 'undefined'){
        try {
            // Try to create a new user with the given username and password
            const result = await User.create({username,password});
            // If the user is created successfully, update the feedback
            if(result) {
                feedback = createFeedback(200, `${username} was created!`,true, result);
            }
        } catch(error) {
            // If there's an error, update the feedback to a 409 error message
            feedback = createFeedback(409, `${username} could not be created!`, false, error)
        }
    }
    // Send the feedback as a JSON response with the appropriate status code
    res.status(feedback.statuscode).json(feedback);
}

// Define the deleteuser function
const deleteuser = async (req, res)=>{
    // Destructure the username from the request body
    const {username} = req.body;
    // Initialize feedback as a 404 error message
    let feedback = createFeedback(404, `User ${username} could not be deleted`);
    // Check if username is not undefined
    if(typeof(username)!=='undefined'){
        // Try to find and delete the user with the given username
        const result = await User.findOneAndDelete({username});
        // If the user is found and deleted, update the feedback
        if(result){
            feedback=createFeedback(200, `${username} was deleted!`, true, result);
        }
    }
    // Send the feedback as a JSON response with the appropriate status code
    res.status(feedback.statuscode).json(feedback);
}

// Define the authenticateuser function
const authenticateuser = async (req, res)=>{
    // Destructure the username and password from the request body
    const {username, password} = req.body;
    // Initialize feedback as a 401 error message
    let feedback=createFeedback(401, `${username} could not be authenticated`);

    // Try to log in the user with the given username and password
    const user = await User.login(username,password);
    // If the user is found and authenticated, create a JWT token and update the feedback
    if(user){
        //expiration: one hour
        const token = jwt.sign({user}, process.env.JWTSECRET, {expiresIn:1000*60*60});
        feedback=createFeedback(200, `${username} was authenticated`, true, {JWT: token})
    } 
    // Send the feedback as a JSON response with the appropriate status code
    res.status(feedback.statuscode).json(feedback);
}

/**
 * @param {*} req 
 * @param {*} res 
 * The function will look for title and description in the body of the request object.
 * If either of those variables is not present. Then a json object relaying the failure
 * will be rendered.
 */
const createTEMPLATE = async (req,res)=>{
    // Destructure the title, description, and user from the request body
    const {title, description, user}=req.body;
    // Initialize result as a 404 error message
    let result= createFeedback(404, 'Faulty inputdata');

    // Check if title, description, and user are not undefined
    if(typeof(title)!=='undefined'&&typeof(description)!=='undefined'&& typeof(user)!=='undefined'){
        // Create a new template object with the given title and description
        const TEMPLATE ={title,description};
        // Try to find the user by ID and update it with the new template
        const tempres = await User.findOneAndUpdate(
            {_id:user._id}, 
            {$push:{TEMPLATE:template}}
        );
        // If the user is found and updated, update the result
        result=createFeedback(200, 'Template was inserted to the database',true, tempres);
    }
    // Send the result as a JSON response with the appropriate status code
    res.status(result.statuscode).json(result);
}

/**
 * @param {*} statuscode has to be set manually
 * @param {*} feedback has to be set manually
 * @param {*} isSuccess defaults to false, must be overridden if true
 * @param {*} payload defaults to null
 * This factory method standardises the feedback from this API
 */
function createFeedback(statuscode, feedback, isSuccess=false,payload=null){
    return {
        statuscode,
        feedback,
        isSuccess,
        payload
    }
}

module.exports={
    createTEMPLATE,
    createuser,
    authenticateuser,
    deleteuser
}