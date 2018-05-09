import {User} from '../models/user.model';

module.exports = (passport, router) => {

    router.post('/register', (req, res, next) => {
        var username = req.body.username;
        var password = req.body.password;
        console.log(req.body);
        if (!username || !password) {
            console.log("Username and password is required.")
            return res.status(500).send('Username and password is required.');
        } else {
            var user = new User({username: username, password: password});
            user.save();
            console.log("User registered " + username)
            res.status(200).send('Registration successful');
        }
    });

    router.post('/login', (req, res, next) => {
        console.log(req.body)
        passport.authenticate('login', (error, user) => {
            console.log("user.route.ts: login:" + user)
            if (error) {
                console.log("user.route.ts: login: Error:" + error)
                res.status(500).send('ERROR');
            } else {
                req.logIn(user, (error) => {
                    if (error) {
                        console.log("user.route.ts: login: Error:" + error)
                        return res.status(500).send('Request login failed');
                    } else {
                        console.log("Free to pass")
                        return res.status(200).send(user);
                    }
                })
            }
        })(req, res, next);
    });

    router.post('/logout', (req, res, next) => {
        if (req.isAuthenticated()) {
            req.logout();
            res.status(200).send('Logout successful');
        } else {
            res.status(500).send('You have no right');
        }
    });

    router.get('/greeting', (req, res, next) => {
        if (req.isAuthenticated()) {
            return res.status(200).send('hello!');
        } else {
            return res.status(500).send('stop that');
        }
    });

    return router;
}
//curl -X POST http://localhost:5000/rest/user/login -H "ContentType: application/x-www-form-urlencoded" -d "username=larry&password=123451"