const Hotel = require('../Model/Hotel');
const User = require('../Model/User');

async function getAll() {
    let products = await Hotel.find({}).lean();

    return products;
}

function getOne(id) {
    return Hotel.findById(id).lean();
}

function create(data) {
    return new Hotel(data).save();
}

function edit(id, data) {
    return Hotel.findByIdAndUpdate(id, data, {new: true});
}

function deleteHotel(id) {
    return Hotel.findByIdAndDelete(id);
}

async function bookRoom(hotelId, userId) {
    let hotel = await Hotel.findById(hotelId);
    let user = await User.findById(userId);
    hotel.bookers.push(user._id);
    return hotel.save();
}



module.exports = {
    getAll,
    getOne,
    create,
    edit,
    deleteHotel,
    bookRoom
}