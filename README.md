# Discord Task Progress Messages
Mainly used for my Discord Bots\
Just shows a simple checklist in Discord Messages
## Example:
![Example](http://g.recordit.co/uwoKYKJRuw.gif)

## Code Example:
```js
// Create Once
const dtl = new(require('discord-task-list'))('✅', '✖') // <= pass custom emojis/text here

const progress = dtl.newProgress(['task 1', 'task 2', 'launching rocket'], mesage); // message = discord.js message object 
await dtl.start();
// do stuff
await progress.next();
// do stuff
await progress.next();
// do stuff
await progress.next();
```