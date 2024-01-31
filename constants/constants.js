//Constants.js file will contain the constants 

module.exports = { 
// endpoint 
CREATE_USER_ENDPOINT : "/create-user",
LOGIN_USER_ENDPOINT : "/login-user",
VALIDATE_USER_ENDPOINT : "/validate-user",

//mongo success msgs
MONGODB_SUCCESS : "MongoDB connected successfully",

//Json response messages
CREDENTIALS_REQUIRED : "Username and password are required",
INVALID_CREDENTIALS : "Invalid username or password",
LOGIN_ERROR : "Error logging in",
VALID_TOKEN : "Token is valid",
LOGIN_SUCCESS: "Logged in successfully",
USER_EXIST: "User already exists",
USER_CREATED_SUCCESS : "User created successfully",
INTERNAL_SERVER_ERROR : "Internal Server Error"
}
