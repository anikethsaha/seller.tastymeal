const bcrypt = require('bcrypt');
const oauth = {
    GOOGLE_CLIENT_KEY : "AIzaSyD8BrmWjoDYxC5k6PTRe4hPB4LyiFu6pq8",
    GOOGLE_CLIENT_ID : "435688172698-2qe44p1lj68lg498luklaa7sul225inm.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET :"l-gL6ZtvYH1eogCef2eE6F3g",
    GOOGLE_CLIENT_CALLBACK : "/auth/google/callback",

    FACEBOOK_APP_ID : "230154881095726",
    FACEBOOK_APP_SECRET : "67e11c0110c78a265f94d1f99db00e17",
    FACEBOOK_APP_CALLBACK : "/auth/facebook/callback"
}
module.exports = {
    port : 5000,
    sessionSecretKey : bcrypt.hashSync("SECRET_KEY", 2),
    oauth,
    salt : "__salt__"

}