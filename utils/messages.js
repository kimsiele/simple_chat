const moment = require('moment');

function formatMessages(username, text_message) {
    return {
        username,
        text_message,
        time: moment().format('h:mm a')
    }
}
module.exports = formatMessages;