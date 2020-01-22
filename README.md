<div align="center">
  <img alt="Logo" src="https://raw.githubusercontent.com/abdelshok/moira/master/assets/images/lmfaoLogo.png" width="100" />
</div>
<h1 align="center">
  The first chat app for the terminal
</h1>
<p align="center">
  lmfao.tech
</p>

<div align="center">
  <img alt="lmfaoGif" src="https://raw.githubusercontent.com/abdelshok/moira/master/assets/gifs/lmfaoLoginGif3.gif"/>
</div>


## 🛠 Installation & Set Up

1. Install the lmfao CLI

   ```sh
    npm install -g lmfao
   ```

2. Start the application by running lmfao in your terminal 

   ```sh
    lmfao
   ```

## 🐉 Current Features

- Users can join any amount of public or private channels that can each hold up to 1,000 concurrent users and have a conversation with their friends or coworkers while looking like they're working
- Users can retrieve a list of all public channels around the world and see how many people are currently live in these channels
- Users can create password protected private channels and have a conversation with their friends while being ensured that no one else will be able to join

## 🚀 Resources & How to 

* Before anything, two terminal windows or panes need to be used in order to chat through the lmfao CLI.
* For a better user experience, I personally recommend downloading [iTerm2](https://iterm2.com/), which is more customizable. In this case, running `command + click` on iTerm2 will allow you to split the terminal window into two **panes** horizontally, which will enable you to send message to one channel from one pane and see all incoming messages from the other pane and which would look like this.

<br>

<div align="center">
  <img alt="lmfaoGif" src="https://raw.githubusercontent.com/abdelshok/moira/master/assets/images/Chat.png"/
  width=700
  >
</div>

<br>

Now, in order to get started:
<br>
1. First sign up or login using your existing credentials. 
<br>
2. Once you get to the "Main menu" page, you'll have the option to join existing public channels, create a new public or private password-protected channel, or search through the list of existing private channels - which would then ask you to input the correct channel's password, assuming that the private channel exists
<br>
<br>
<div align="center">
  <img alt="initial" src="https://raw.githubusercontent.com/abdelshok/moira/master/assets/images/Initial.png"/
  width=500
  >
</div>
<br>
3. Let's say you pick the first option, you'll find yourself choosing from a display of all the existing public channels and their live number of participants
<br>
<br>
<div align="center">
  <img alt="channel" src="https://raw.githubusercontent.com/abdelshok/moira/master/assets/images/Channel.png"/
  width=500
  >
</div>
<br>
4. Assuming that you choose the channel named `asap_mob`, you'll then be redirected to the final page below.
<br>
<br>
<div align="center">
  <img alt="connect" src="https://raw.githubusercontent.com/abdelshok/moira/master/assets/images/Connect.png"/
  width=500
  >
</div>
<br>
5. In one of your windows or panes, pick *Connect to channel feed *, which will turn that terminal window / pane into an interface that'll display incoming messages. 
<br>
6. In the other window or pane, pick *Message on channel*, which will display an interface that'll allow you to send a message to the specified channel.
<br>
7. At this point you should have two windows or panes with the two interfaces below:
<br>
<br>
<div align="center">
  <img alt="connect2" src="https://raw.githubusercontent.com/abdelshok/moira/master/assets/images/Connect2.png"/
  width=500
  >
</div>

<div align="center">
  <img alt="message2" src="https://raw.githubusercontent.com/abdelshok/moira/master/assets/images/Message2.png"/
  width=500
  >
</div>
<br>
8. Or two window panes like this: 
<br>
<br>
<div align="center">
  <img alt="chat" src="https://raw.githubusercontent.com/abdelshok/moira/master/assets/images/Chat.png"/
  width=700
  >
</div>
<br>
9. In order to join another channel, you can type 'exitexit' in both windows or panes, which will bring you to the main menu. You can follow the same steps in order to join another public or private channel, or in order to create a new channel.

## 🚨 Technical Details 

- Firebase is used for Authentication and Firebase is used as a NoSQL Firestore
- The purpose of this application is to allow people to chat and give the impression that they are working while also allowing them to do so privately, without being tracked.
- As a result, no conversations are being saved. 
- The emails are only stored in order to provide validation down the line
- Phone numbers are stored so that group members receive text messages when someone enters their private chat
- Other than that, no data is being tracked. No ip address, no keywords, nothing. 
  - Disclaimer: IP addresses might be used down the line and stored in local computer storage or cloud storage (AWS or Google Cloud) in order to provide faster login for the users when they run `lmfao`

## 🥊  Remaining to do:

- [ ] Implement end to end encryption
- [ ] Allow users to sign in using their username
- [ ] Use local storage or cloud storage to allow users to sign in automatically if user is already signed in one terminal window / pane
- [ ] See if you can automatically split the terminal into certain proportions (like a multiplexer) when user signs in, in order to provide better UX
- [ ] Re-implement text notifications for private chat entry

