const tmi = require('tmi.js');
const fetch = require('node-fetch');

const credentials = require('./credentials.json');
const client = new tmi.Client({
    options: { debug: true, messagesLogLevel: "info" },
    connection: {
        reconnect: true,
        secure: true
    },
    channels: ['borjagodoy']
});

const changeStateofLed = (state) => {
    fetch(`http://${credentials.ip}/api/${credentials.username}/lights/3/state`, {
        method: "PUT",
        body: JSON.stringify(state)
    })
        .then(res => res.json())
        .then(json => console.log(json));
}
//Method to change On/Off value
const manageOnState = (message) => {
    if (message.toLowerCase() === '!off') {
        changeStateofLed({ "on": false });
    } else if (message.toLowerCase() === '!on') {
        changeStateofLed({ "on": true });
    }
}
//Method to change Hue value, hue is the color
const changeHueState = (message) => {
    const hue = parseInt(message.replace("?", ""));
    changeStateofLed({ "on": true, "hue": hue });
}
//Array with diferent actions to do with Led
const ledsActions = {
    "!": manageOnState,
    "?": changeHueState
}
client.connect().catch(console.error);
client.on('message', (channel, tags, message, self) => {
    if (self) return;
    if (message[0] in ledsActions) {
        ledsActions[message[0]](message);
    }
});