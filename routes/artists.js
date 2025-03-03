var express = require('express');
var router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/* GET artists listing. */
router.get('/', async function(req, res, next) {  // Marked this function as async
  try {
    const data = await prisma.artists.findMany(); 
    res.json(data);  // Return the artists as JSON
  } catch (error) {
    next(error);  // Pass any error to the error handling middleware
  }
});

router.post('/', (req, res, next) => {
  res.send("Just created new record");
});

module.exports = router;
