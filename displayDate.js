const moment = require('moment-timezone');

// ...existing code...

function displayDateInBDTimeZone() {
    const bdTime = moment().tz('Asia/Dhaka').format('YYYY-MM-DD HH:mm:ss');
    console.log('Current date and time in BD time zone:', bdTime);
}

// Call the function to display the date
displayDateInBDTimeZone();

// ...existing code...
