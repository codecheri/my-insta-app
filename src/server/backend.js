const express = require('express');
const firebase = require('firebase');
const moment = require('moment');

firebase.initializeApp({
    apiKey: "AIzaSyAES8QkjLL3XAcRgpWAFG58xEaDEDyMCls",
    authDomain: "my-insta-app.firebaseapp.com",
    databaseURL: "https://my-insta-app.firebaseio.com",
    projectId: "my-insta-app",
    storageBucket: "",
    messagingSenderId: "956486693431",
    appId: "1:956486693431:web:6b6e3bec976ba99c"
});

const api = express.Router();
const db = firebase.firestore();

/**
 * Registration and logins
 */
api.post('/user/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Sign in with email and pass.
    firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(function (response) {
            const data = {};

            db.collection('user')
                .doc(response.user.uid)
                .get()
                .then(user => {
                    if (!user.exists) {
                        res.json({
                            status: 200, data: data, message: 'User is authenticated'
                        });
                    } else {
                        data.user = user.data();
                        data.user.uid = response.user.uid;

                        res.json({
                            status: 200, data: data, message: 'User is authenticated'
                        });
                    }
                })
                .catch(error => {
                    throw Error(error);
                });
        })
        .catch(function (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                res.json({
                    status: 400, data: {}, message: 'Incorrect password has been used.'
                });
            } else {
                res.json({
                    status: 400, data: {}, message: errorMessage
                });
            }
        });
});

api.post('/user/register', async (req, res) => {
    console.log('Starting registration: ', req.body.email);

    const email = req.body.email;
    const password = req.body.password;
    const fullName = req.body.fullName;
    const userName = req.body.userName;

    firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(function (response) {
            console.info(`FirebaseAuth> Creating user with userName ${userName}`);
            const createdUser = {
                email: email,
                fullName: fullName,
                userName: userName,
                uid: response.user.uid,
                created: moment().format()
            };

            db.collection('users')
                .doc(response.user.uid)
                .set(createdUser)
                .then(function () {
                    res.json({
                        status: 200, data: createdUser, message: 'User has been created'
                    });
                })
                .catch(function (error) {
                    throw Error(error);
                });
        })
        .catch(function (error) {
            res.json({
                status: 400, data: {}, message: `User creation failed> ${error}`
            });
        });
});


/**
 * User profile
 */

api.get('/user/profile', async (req, res) => {
    const uid = req.query.uid || req.headers.uid;

    db.collection('users')
        .doc(uid)
        .get()
        .then(doc => {
            if (!doc.exists) {
                res.json({
                    status: 400, data: {}, message: 'User does not exist'
                });
            } else {
                res.json({
                    status: 200, data: { user: doc.data() }, message: 'User fetched'
                });
            }
        })
        .catch(error => {
            res.json({
                status: 400, data: {}, message: `Error fetching your user details:  ${error}`
            });
        });
});

api.get('/users', async (req, res) => {
    db.collection('users')
        .get()
        .then(doc => {
            const users = [];

            doc.forEach(user => {
                // Add each found user to the users list
                users.push(user.data())
            });
            
            res.json({
                status: 200, data: { users: users }, message: 'Users fetched'
            });
        })
        .catch(error => {
            res.json({
                status: 400, data: {}, message: `Error fetching your users:  ${error}`
            });
        });
});

module.exports = api;

