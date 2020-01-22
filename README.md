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

## 🚀 Resources & How to 

* Before anything, two terminal windows need to be used in order to chat through the lmfao CLI. For a **better user experience**, I personally recommend downloading [iTerm2](https://iterm2.com/), which is more customizable. In this case, running `command + click` on iTerm2 will allow you to split the pane horizontally, which will enable you to send message to one channel from one pane and see all incoming messages from the other pane, which would give you this.

<div align="center">
  <img alt="lmfaoGif" src="https://raw.githubusercontent.com/abdelshok/moira/master/assets/images/Chat.png"/
  width=500
  >
</div>

Now, in order to get started:

1. First sign up or login using your existing credentials. 
2. Once you get to the "Main menu" page, you'll have the option to join existing public channels, create a new public or a private password-protected channel, or search through the list of existing private channels, which will then ask you to input the correct channel's password, assuming that the private channel exists

<div align="center">
  <img alt="initial" src="https://raw.githubusercontent.com/abdelshok/moira/master/assets/images/Initial.png"/
  width=500
  >
</div>

3. Let's say you pick the first option, you'll find yourself choosing from a list of public channels with their live number of participants

<div align="center">
  <img alt="channel" src="https://raw.githubusercontent.com/abdelshok/moira/master/assets/images/Channel.png"/
  width=500
  >
</div>

4. Assuming that you choose the channel named `asap_mob`, you'll then be redirected to the final page below.

<div align="center">
  <img alt="connect" src="https://raw.githubusercontent.com/abdelshok/moira/master/assets/images/Connect.png"/
  width=500
  >
</div>

5. In one of your windows or panes, pick *Connect to channel feed *, which will turn that terminal window / pane into an interface that'll display incoming messages. 
6. In the other window or pane, pick *Message on channel*, which will display an interface that'll allow you to send a message to the specified channel.
7. At this point you should have two windows or panes with these two interfaces:

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

8. Or two window panes like this: 

<div align="center">
  <img alt="chat" src="https://raw.githubusercontent.com/abdelshok/moira/master/assets/images/Chat.png"/
  width=500
  >
</div>

9. In order to join another channel, you can type 'exitexit' in the messaging interface (the second one above), which will bring you to the main menu. 


## 🚨 Details

- Firebase is used for Authentication and Firebase is used as a NoSQL Firestore
- The purpose of this application is to allow people to chat and give the impression that they are working while also allowing them to do so privately, without being tracked.
- As a result, no conversations are being saved. 
- The emails are only stored in order to provide validation down the line
- Phone numbers are stored so that group members received text messages when someone enters their private chat
- Other than that, no data is being tracked. No ip address, no keywords, nothing.

## 🥊 To do:

- [ ] Implement end to end encryption
- [ ] Allow users to sign in using their username
- [ ] Use local storage or cloud storage to allow users to sign in automatically if user is already signed in one terminal window / pane
- [ ] See if you can automatically split the terminal into certain proportions (like a multiplexer) when user signs in, in order to provide better UX
- Implement text notifications for private chat entry

