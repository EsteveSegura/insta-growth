<p align=center>

  <img width=300 src="https://i.imgur.com/KsPRbGP.png"/>

  <br>
  <span><strong>insta-growth</strong> is a set of tools that help us to realize the <a href="https://www.garyvaynerchuk.com/instagram-for-business-180-strategy-grow-business-brand/">$1.80 strategy</a> in a simple way and as quickly as possible. </span><br />
<img src="https://img.shields.io/badge/NodeJS-10.13.0-green"> 
<img src="https://img.shields.io/badge/License-MIT-blue">
<a href="http://girlazo.com"><img src="https://img.shields.io/badge/Website-up-green"></a>
<img src="https://img.shields.io/badge/Version-0.0.1-blue">
</p>


<p align="center">
  <a href="#installation">Installation</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#configuration">Configuration</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#usage">Usage</a>
      &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#interface">Interface</a>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#how-does-it-work">How does it work</a>
</p>



## Installation

**NOTE**: NodeJS 10.13.0 or higher is required.

```bash
# clone the repo
$ git clone https://github.com/EsteveSegura/insta-growth.git

# change the working directory to insta-growth
$ cd insta-growth

# install NodeJS & npm if they are not installed

# install the requirements
$ npm install
```


## Configuration 
Before running the software we have to add a minimum configuration to our project.

First we are going to create a file that contains our **username** and **password** on **instagram**, this file must be located at the **src folder** of our project and we must call it **.env**  
``./src/.env``

``` env
IG_USERNAME=InstagramAccount   
IG_PASSWORD=InstagramPassword
```

And then we have to fine tune the options with which we want the application to interact with **instagram**. This file is located in the **src folder** and is called **config.json** we can edit it with the most appropriate options.

``` json
{
     "hashtags" : ["food","recipes","sushi"], 
     "maxFollows" : 1000, 
     "maxMediaCount" : 450,
     "maxFollowerCountToFollowUnfollow" : 500,
     "ratioFollowUnfollow" : 0.33
}
```
**hashtags :** Hashtags related to our account.  
**maxFollows :** Maximum followers of our targets.   
**maxMediaCount :** Maximum media of our targets.  
**maxFollowerCountToFollowUnfollow :** Maximum of followers that an account must have to start the follow/unfollow strategy
**ratioFollowUnfollow :** The ratio of following / followers required to start  follow/unfollow strategy

## Usage
**Now we are ready to run the software**. Open two different terminals, we will execute two separate processes
``` bash
# Terminal 1
$ cd src
$ node server
```
<p align="center">
     <img src="./src/frontend/public/img/gif/server.gif"/>
</p>

``` bash
# Terminal 2
$ cd src
$ node index
```

<p align="center">
     <img src="./src/frontend/public/img/gif/index.gif"/>
</p>

These two processes belong to a web interface and the system that connects directly to instagram. We can interact directly with the web interface by browsing at <a href="http: //localhost:5000">http://localhost:5000</a>


## Interface
We can choose between two types of interface.  

- **Graphical interface**
This graphic interface is designed to be able to see in real time the photographs that the system is filtering for us.
<p align="center">
     <img src="./src/frontend/public/img/gif/graphical.gif"/>
</p>

- **list interface**
This interface is simpler and only shows the links directly in list format, perfect if we want to use the system with a different account and then be able to use the links where we want
<p align="center">
     <img src="./src/frontend/public/img/gif/list.gif"/>
</p>

## How does it work
<strong>insta-growth</strong> navigates through the hashtags specified in our configuration file and applies certain filters when showing us posts. Offering relatively low account results or without much interaction.

To understand why this is relevant and important we must know how the 1.80 $ strategy works. <a href="https://youtu.be/8mVR5OZSgjw?t=198">Explanatory video here</a>

## License
MIT © insta-growth
