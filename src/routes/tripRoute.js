const express = require('express');
const Trip = require('../modal/tripModal');

const router = express.Router();

router.get('/', (req, res) => {
    Trip.find()
        .then((trips) => {
            res.status(200).json(trips);
        })
        .catch((error) => {
            console.log('Failed to fetch trips: ', error);
            res.status(500).json({
                message: 'Failed to fetch trips ',
            });
        });
});

router.post('/', (req, res) => {
    const {
        date,
        from,
        to,
        busOwnerID,
        startTime,
        EndTime,
        category,
        SeatBooked,
        bus_no,
        amenities_list,
        busFare,
        busName,
    } = req.body;

    const trip = new Trip({
        date: new Date(date),
        from,
        to,
        busOwnerID,
        startTime: new Date(startTime),
        EndTime: new Date(EndTime),
        category,
        SeatBooked,
        bus_no,
        amenities_list,
        busFare,
        busName,
    });
    //   to save the document to the database
    trip.save()
        .then(() => {
            console.log('Your trip is saved:', trip);
            res.status(201).json({
                message: 'Trip added successfully',
            });
        })
        .catch((error) => {
            console.log('Failed to save the trip:', error);
            res.status(500).json({
                message: 'Failed to add trip',
            });
        });
});

module.exports = router;
