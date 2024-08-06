const {verify} = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    // gets accessToken from passed in frontend through header format
    const accessToken = req.header("accessToken");

    // Will execute if accessToken is empty or nonexistent
    if (!accessToken){
        return res.json({ error: "User not logged in"})
    }

    // Verifying that token is valid
    try {
    // Compare the two secret values since we initialized importantsecret whenever you create a token
        const validToken = verify(accessToken, "importantsecret");

        if (validToken) {
            return next();
        }
    } catch {
        return res.json({ error: err});
    }
}


// So other routes have access to this function
module.exports = { validateToken };





