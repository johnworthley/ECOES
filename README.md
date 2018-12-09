# Mainnet-deployable EOS Boilerplate DApp

# Overview
Dapp to Create, edit, delete, and like posts

- Node.js server [Demux](https://github.com/EOSIO/demux-js) monitors the state of the blockchain
- MongoDB database stores DApp data
- Reactjs UI
- Scatter Wallet (Interoperable with EOS and ETH Blockchains)
- EOSJS UI ->EOS [eosjs](https://github.com/EOSIO/eosjs)

 [Demux](https://github.com/EOSIO/demux-js) listens to and reads events from smart contract actions. MongoDB database stores data in the Docker container, thus reducing the cost of RAM required by storing into the contract's multi index table.

**Do not upload private keys in .env files**

Clone the repository:w
```sh
git clone https://github.com/johnworthley/ECOES
```
 http endpoints 

# Quick start - Run the DApp

**Clear Ports**
```sh
./restart.sh
```

**To start**
```sh
./quick_start.sh
```

The above command will execute the following in sequence:

1. `first_time_setup.sh`
2. `start_mongodb_docker.sh`

**To stop**, execute:
```sh
docker stop eosio_blog_container
docker stop mongo_blog_container
```

## Blockchain connection
Choose the testnet or mainnet

**API Endpoints**

Choose one
```sh
Jungle Test Net: https://jungle.eosio.cr:443
Mainnet: https://api.eosnewyork.io:443
```
Add link to:

```sh
backend/.env
frontend/.env 
```

In separate terminals execute the following to start the React app and the Node.js server

**To start the backend**
```sh
cd backend
npm start
```

**To start the frontend**
```sh
cd frontend
npm start
```


**To stop**, press `ctrl+c` on your keyboard

# Detailed guide

In this section we will describe in detail each script used to run the blog DApp environment.

## Initial setup

```sh
./first_time_setup.sh
```

This script will: 
- Executing the above shell script and verify that Docker and Node.js are installed
- Download the `mongo` docker image, and removes any previous instances of these docker containers
- Installs the node packages for the frontend React app and backend Node app



**Running the Node.js Server**

```sh
cd backend
npm start
```
This script will create an Express.js http server listening on port 4000 as well as a listen for websocket connections on port 4000


**Running the React Frontend**

For the fourth (frontend) terminal window, run:
```sh
cd frontend
npm start
```
This script will open a browser session connecting to http://localhost:3000/ showing the React app. You can try to add, remove, or edit the sample blog posts using one of the accounts in [accounts.json](https://github.com/EOSIO/eosio-project-demux-example/blob/master/eosio_docker/scripts/accounts.json) and modifying the **frontend/.env** for `REACT_APP_EOSIO_ACCOUNT` and `REACT_APP_EOSIO_PRIVATE_KEY` with the name and private key of the desired account. This React app will interact with the smart contract by broadcasting transactions, which are written to the blockchain by our locally running nodeos.

## Stopping DApp

**Stopping MongoDB**

In the second (MongoDB) terminal window, press `ctrl+c` on your keyboard, the log will stop printing. And then execute:
```sh
docker stop mongo_blog_container
```

This action will take a few seconds. The database will eventually be stopped.

**stopping the backend or frontend**

In the third (backend) or fourth(frontend) terminal window, press `ctrl+c` on your keyboard. The backend Node.js server or frontend React app will be stopped.


## Project structure

```js
eosio-project-demux-example // project directory
├── backend
│   ├── node_modules // generated after npm install
│   │   └── index.html // html skeleton for create react app
│   ├── src // generated after npm install
│   │   ├── routes // Express api routes
│   │   │   └── posts.js // defines routes relates to blog posts
│   │   ├── models // Mongoose (MongoDB object modeling library) model definitions
│   │   │   ├── block-index-state.model.js // defines the mongoose BlockIndexState model to update the last processed blocks for Demux
│   │   │   ├── index.js
│   │   │   └── post.model.js // defines the mongoose Post model to store blog posts
│   │   ├── services // services 
│   │   │   ├── demux // demux implementation
│   │   │   │   ├── effects // demux effects implementations - side effects outside of the blockchain that should be triggered when blockchain events related to our smart contract are read
│   │   │   │   ├── updaters // demux updaters implementations - updates the mongodb database when blockchain events related to our smart contract are read
│   │   │   │   ├── ActionHandler.js // implementation of the demux AbstractActionHandler that connects to the mongodb database and passes in the mongoose schemas to be used to update the database by the above updaters
│   │   │   │   └── index.js // exports the demux action watcher to start watching the blockchain when .watch() is called
│   │   │   └── post // blog post service
│   │   ├── utils
│   │   │   └── io.js // provider for Socket IO to allow websocket messages to be sent out to all connections
│   │   └── index.js // starts the express.js server to listen to http requests and uses socket io to listen for websocket connections. Also initiates demux to start watching the blockchain for events
│   ├── package-lock.json // generated after npm install
│   └── package.json // for npm packages
├── eosio_docker
│   ├── * contracts // this folder will be mounted into docker
│       └── blog
│           └── blog.cpp // the main smart contract
└── frontend
    ├── node_modules // generated after npm install
    ├── public
    │   └── index.html // html skeleton for create react app
    ├── src
    │   ├── CreatePost // react component with form to create new blog posts
    │   ├── Posts // react components related to a single post
    │   │   ├── EditPost // form to edit a post
    │   │   └── Post // blog post display
    │   ├── utils // utlities for the react app
    │   └── index.js // for react-dom to render the app
    ├── package-lock.json // generated after npm install
    └── package.json // for npm packages

* means the directory will be mount to the docker container. Whenever the file changes on the local machine, it will be automatically reflected in the docker environment.
```

## DApp development

The DApp consists of four parts. The MongoDB database, backend Node.js app, and frontend React app. These can be found in:

- mongodb_docker
    - mongodb database
        - mongodb://127.0.0.1/blog_platform
- frontend
    - node.js development environment
        - create-react-app: http://localhost:3000/
- backend
    - node.js development environment
        - Express.js server listening to port 4000 for http requests and websocket connections
        - Writes to the MongoDB database using mongoose to create schemas and execute queries

Users interact with the UI in client and sign transactions in frontend. The signed transaction is sent to the blockchain directly with eosjs. After the transaction is accepted in blockchain, the action is read by Demux and the MongoDB database is updated with the transaction data.

## Docker usage

We have already set the container working directory to `/opt/eosio/bin/`, you could run cleos command in this directory directly. For documentation of cleos: https://developers.eos.io/eosio-nodeos/docs/cleos-overview


To exit from inside the container bash:
```sh
exit
```

## Smart contract (Blockchain):

The smart contract can be found at `eosio_docker/contracts/blog/blog.cpp`, you can edit this smart contract. You will then need to compile and deploy the contract to the blockchain.

## Docker commands

If you are more familiar with docker, you could use the docker commands below to have better control with the whole environment. Below are the explanations of each of the commands:


Stop the container (see below troubleshoot section to see how to pause and continue the blockchain):
```sh
docker stop [container_id]
```


# Troubleshooting
If you are having issues running any of the docker containers you may want to try the following:

### To check all existing containers, volumes and images

- `docker container ls -a`
- `docker volume ls`
- `docker image ls`

### Remove all unused containers, volumes and images

- `docker system prune -a`
- `docker container prune`
- `docker volume prune`
- `docker image prune`

Boilerplate Forked from https://github.com/EOSIO/eosio-project-demux-example.git and simplified for mainnet use
