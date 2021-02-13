const { Router } = require("express");
const jwt = require('jsonwebtoken');
const hotelService = require("../services/hotelService");
const router = Router();

router.get("/", (req, res) => {
  hotelService
    .getAll()
    .then((hotels) => {
      res.render("home", { title: "Hotels", hotels });
    })
    .catch(() => res.status(500).end());
});

router.get('/profile', (req, res) => {
  res.render('profile', { title: 'Profile Page' });
});

router.get('/book/:hotelId', async (req, res) => {
  let hotel = await hotelService.getOne(req.params.hotelId);
  let user = await res.locals.user._id;
  
  hotelService.bookRoom(hotel._id, user)
    .then(() => res.redirect('/'))
    .catch(() => res.status(403).end());
});

router.get("/details/:hotelId", async (req, res) => {
  const hotel = await hotelService.getOne(req.params.hotelId);
  const userId = await res.locals.user._id;
  let iHaveBookedIt = await false;
  
  
  try {
    if (hotel.bookers[0].toString().includes(userId)) {
      iHaveBookedIt = true;
    } else {
      iHaveBookedIt = false;
    }  
  } catch (error) {
    console.log(error);
  }
  
  let result = JSON.stringify(req.body, null, 4);

  res.render("details", { title: "Hotel Details", hotel, iHaveBookedIt });
});

router.get("/edit/:hotelId", async (req, res) => {
  let hotel = await hotelService.getOne(req.params.hotelId);
  res.render("edit", { title: "Edit Hotel", hotel });
});

router.get('/delete/:hotelId', async (req, res) => {
  hotelService.deleteHotel(req.params.hotelId)
    .then(() => res.redirect('/'))
    .catch(() => res.status(500).end());
});

router.get("/create", (req, res) => {
  res.render("create");
});


router.post("/create", (req, res) => {
  hotelService
    .create(req.body)
    .then(() => res.redirect("/"))
    .catch((err) => {
      console.log(err);
    });
});

router.post("/edit/:hotelId", async (req, res) => {
  hotelService
    .edit(req.params.hotelId, req.body)
    .then(() => res.redirect(`/details/${req.params.hotelId}`))
    .catch(() => res.status(500).end());
    
});

module.exports = router;
