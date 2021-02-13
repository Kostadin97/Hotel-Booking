const { Router } = require('express');
const authService = require('../services/authService');

const cookieName = "USER_SESSION";

const router = Router();

router.get("/login", (req, res) => {
  res.render("login", { title: 'Login Page' });
});

router.get("/register", (req, res) => {
  res.render("register", { title: 'Register Page' });
});

router.post('/register', async (req, res) => {
  const { email, username, password, repeatPassword } = req.body;
  
  if (password !== repeatPassword) {
    return res.render('register', { error: 'Passwords must be the same!' });
  }

  try {
    let user = await authService.register({ email, username, password });
    res.redirect('/auth/login');
  } catch (error) {
    res.render('register', { title: 'Register Page', error: 'Invalid credentials!'})
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    let token = await authService.login({ username, password });
    res.cookie(cookieName, token);
    res.redirect('/');
  } catch (error) {
    res.render('login', { error });
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie(cookieName);
  res.redirect('/');
});

module.exports = router;


  