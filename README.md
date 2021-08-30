## News-App-Frontend

News Today is a web app that users can create their personal accounts, write, comment and search for articles. This app was built with Next.js and the SWR library. In this app, there are also an example how to doing unit testing and a Wysiwyg editor has been provided for writing articles. Where the implementation of the editor is based on a draft.js. The [server side](https://github.com/deaedria/news-app-backend.git) created with Node.js and Express.js.

## Getting started

To get the React app running locally:

* Clone this repo with `git clone https://github.com/deaedria/news-app-frontend.git`
* `cd news-app-frontend`
* `npm install` to install all required dependencies
* Create a `next.config.js` file and reference the `next.config.js.example` file
* `npm run dev` to start the local server

## Folder Structure

    ├── components                   
    │   ├── Footer.js        
    │   ├── Navbar.js            
    │   ├── Title.js           
    ├── libs
    │   ├── fetcher.js
    │   ├── useAuth.js         
    ├── pages
    │   ├── article
    │   │   └── ...
    │   ├── category 
    │   │   └── ...
    │   ├── login  
    │   │   └── ...
    │   ├── notification
    │   │   └── ...
    |   ├── profile
    │   │   └── ...  
    |   └── register
    │   │   └── ...
    │   └── _app.js
    │   └── index.js
    ├── styles           
    │   ├── global.css
    │   └── style.css
    └── next.config.js
    └── ...
    
### **Image :**
```
User Page
```
| Dekstop  | 
| - |
|>**Login**||
|![Desktop](https://i.ibb.co/n11Ps45/Capture.png)|
|>**Dashboard**||
|![Desktop](https://i.ibb.co/2F5fpsg/Capture2.png)|
|>**Profile**||
|![Desktop](https://i.ibb.co/0tq9Ct1/Capture3.png)|
|>**Article**||
|![Desktop](https://i.ibb.co/hM9myrp/Capture4.png)|
```
