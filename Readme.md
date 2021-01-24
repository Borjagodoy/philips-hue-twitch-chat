# Philips HUE in your twitch chat!

With this repo we will be able to connect any device connected to a Philips HUE Bridge to our twitch channel.

You can see the whole process in this [Notion](https://www.notion.so/remoteworkborja/Conectando-Philips-Hue-al-chat-de-Twitch-74006ac05ab54c769747222f465d7aaf).



# Get bridge IP and your user token

First we have to obtain the Ip of the bridge. To get it, being connected in the same network as the bridge, access this  [link](https://discovery.meethue.com).

Añadimos la Ip a ***credentials.json***

```json
{
	"username": "<your-username-created-in-your-bridge>",
	"ip": "<your-ip>"
}
```

Now we get the username, by logging into the philips developers console.

```https://<bridge ip address>/debug/clip.html```

We press the button on our HUE and in this console we make a request ```POST```  to  ```/api```with the body
```json  
{"devicetype":"my_hue_app#iphone peter"}
```
with this we get a new user and we add it to the file ***credentials.json***

## Set twitch channel

***index.js***
```js
const  client = new  tmi.Client({
	options: { debug:  true, messagesLogLevel:  "info"},
	connection: {

	reconnect:  true,

	secure:  true
},
	channels: ['<CHANEL_TO_LISTEN']
});
```

## Add new Actions
You have an array of actions you can start with, e.g. ***!on*** o ***!off*** are the commands heard in the action ```manageOnState```, to add new actions you have the Array ```ledsActions```

```js
const  ledsActions = {
	"!":  manageOnState,
	"?":  changeHueState
	...
}
```

## Install and Run
Install dependencies
```
npm install
```
Run script
```
node index.js
```
