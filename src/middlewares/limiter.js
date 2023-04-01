const rateLimit = require('express-rate-limit');

// Set daily download/upload limit to 1GB
const dailyDataLimit = 1024 * 1024 * 1024; // in bytes

const limiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  max: dailyDataLimit,
  message: 'You have exceeded the daily data limit. Please try again tomorrow.',
  handler: (req, res, next) => {
    res.status(429).json({
      message:
        'You have exceeded the daily data limit. Please try again tomorrow.',
    });
  },
  keyGenerator: req => {
    return req.ip; // Use the client's IP address as the key
  },
});

module.exports = limiter;
