// models/userModel.js

// Define the User class to represent user data
class User {
    constructor(id, name, email, pass, gender, style, fav_color) {
        this.id = id;               // User ID
        this.name = name;           // Username
        this.email = email;         // User email
        this.pass = pass;           // User password
        this.gender = gender;       // User gender
        this.style = style;         // User style preference
        this.fav_color = fav_color; // User favorite color
    }

    // Static method to create a User instance from a database row
    static fromRow(row) {
        return new User(
            row.user_id,   // Maps database 'user_id' to User's 'id'
            row.username,  // Maps database 'username' to User's 'name'
            row.email,     // Maps database 'email' to User's 'email'
            row.pass,      // Maps database 'pass' to User's 'pass'
            row.gender,    // Maps database 'gender' to User's 'gender'
            row.style,     // Maps database 'style' to User's 'style'
            row.fav_color  // Maps database 'fav_color' to User's 'fav_color'
        );
    }
}

module.exports = User; // Export the User class for use in other files
