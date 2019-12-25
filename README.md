LMFAO is your favorite chat app for the terminal.

Through it's end to end encrypted network, it allows you to chat with your friends and coworkers on private or public channels. More importantly, you can use it at work and pretend like you're actually debugging code.

None of the conversations are stored anywhere, unlike an application I will not name (Slack), therefore none of what you say here can or will be used against you.

Rock on.
 
On a more serious note: 

This is the first prototype. Some specs might change, the details are still being worked on.

Stack include mainly: 
- Node.js
- Great NPM packages. Shout out to Inquirer, Chalk, Tupac.
- Cloud back-end (Firestore is the database used)

Notes:
The servers processing the messages, relaying them to the connected users, retrieving the channels are separated from the servers used for authentication and storing the user names and emails. The former utilize AWS, the latter Google Firestore. I figured this would increased security and make sure that the data is de-centralized, even from me :)


Current features:

Users are be able to create open channels, set the name of the channels, and chat on them.
The only information stored in the cloud database is the user email and user username. None of the chat messages are stored, which did take away a level of complexity from the project.

Future features:

- Users will be able to create private channels, set passwords, so that they can chat with their friends off the public channels and do so privately :)
- Users will also be asked for their phone number so that when users start using private channels and one user connects to one, it will automatically send a text message to all the users of that channel notifying that someone is logged on

