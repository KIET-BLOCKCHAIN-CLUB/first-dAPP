# First-dAPP
This is the first Basic Decentralized app to get started in ethereum

# Truffle
Truffle is an Ethereum [Smart contract](https://www.coindesk.com/learn/ethereum-101/ethereum-smart-contracts-work) development environment. 
It lets you write test cases for contracts and makes deploying your contracts fast and easy.
It can be installed through npm like so:
```sh
  npm install -g truffle
```  

# Ganache
Made by the same people that made Truffle, Ganache acts as a simulated Ethereum blockchain that automatically creates accounts loaded with Ether for development purposes. 
It also comes with a built-in blockchain explorer so you can really see whats going on when you’re fiddling with your contract.
Install [Ganache](https://www.trufflesuite.com/ganache)

# Metamask

MetaMask is a browser plug-in that lets you interact with dApps without having to host a full Ethereum node yourself. 
It also makes testing dApps on different networks from your personal computer incredibly easy.
Install [Meta mask](https://metamask.io/)

## Setting up your Development Environment

With all the above tools installed you’re finally ready to get your development environment up and running for this dApp.
Your project will need two directories: one to develop, debug, and deploy your smart contract code with Truffle and another to develop your dApp UI. Although the UI for this contract is just a single file (one HTML file with some embedded JavaScript), keeping everything in separate directories ensures things stay organized as the project grows larger. It also makes working with the http-server tool you install previously a lot easier as you’ll see later.
For the sake of simplicity, make two directories with the commands below in your terminal:

```sh
mkdir show_num
mkdir show_num_ui
```

show_num is where we’ll use Truffle for smart contract work while show_num_ui is where we’ll put the HTML file we need.
<br/>
Go ahead and navigate into your newly made show_num directory like so:

```sh
cd show_num
```

Truffle will set up a localized development environment within the folder like so:

```sh
truffle init
```
If it ran successfully, you should see something like this in your terminal:
<br/>
![truffle init](https://miro.medium.com/max/299/1*LEVB1sM9nTYjydHqGKmClw.png)
<br/>
```sh
ls
```

<br/>
<b>migrations</b> holds special configuration files that let you tell Truffle how to deploy your contract
<br/>
<b>test</b> can hold programs for testing your contracts before deployment, whether it be through Solidity or JavaScript.
<br/>
<b>truffle.js</b> and <b>truffle-config.js</b> give instructions to Truffle on where to deploy your contract, whether it be a local environment for the purposes of this tutorial or the actual mainnet. However, the files can also do a lot more to customize your environment. For the purposes of this tutorial, we only care about the location for contract deployment.
There’s one last thing we have to do before we consider the development environment complete: tell Truffle where the contract should go when you deploy it.

```sh
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    }
  }
};
```

<br/>
This tells Truffle is that we want to push our contract to Ganache, our Ethereum blockchain simulator. 
If you’d like to make sure the information is accurate and aligns properly with your Ganache installation, 
or change any values, you can launch Ganache and go to the Preferences panel to see the host, port, and network ID information for yourself:

For our purposes, the Network ID won’t be any problem as Truffle has the wildcard option set and will connect to any Network ID. 
If your Network ID isn’t the same as the one in the picture, you can safely ignore it.
For the example above, I have it set to “5777” which isn’t the default but you can tweak it as you wish.

## Part 2: Creating and Deploying your Smart Contract
With the development environment now successfully set up, we can really get into the nitty-gritty of writing the code for our contract.
Go ahead and open your text editor and make a file in the contracts directory called `show_num.sol` . It should be noted that all smart contracts for Ethereum end with .sol .
You might notice that there is another file already in the contracts called `Migrations.sol` . DO NOT REMOVE OR CHANGE THIS FILE! Truffle uses it to convert your smart contract into a more machine ready format that can be run by Web3 or Ganache.
Copy and paste the code below:

As promised, the dApp in question lets you submit and retrieve a number.
All Ethereum contracts start with `pragma` followed by the version of the compiler used. 
This prevents the file from failed to be compiled by future compilers should future compilers introduce incompatible changes.
All contracts start with the contract keyword followed by the name of the contract and enclosing curly brackets. 
Note how the name of the contract must match the name of file. This is a bit of a technicality with how Truffle works, 
but a good habit to practice nonetheless.
`uint num` declares an unsigned integer within the contract. `function set_num(uint x)` public declares a function that is publicly accessible and takes a `uint` as its argument. 
function `reveal_num () public view returns (uint)` declares a function that is publicly accessible and which returns a `uint`. 
The view keyword states that the function does not change the state of the contract ( it doesn’t modify any data ). 
This is opposed to our `set_num` function which does.
After saving your `show_num.sol` file with the code above we can finally get around to compiling and deploying the smart contract code!
Making sure that you’re still in the environment we set up with Truffle, run the command below:

```sh
truffle compile
```
```sh
cd ..
```
```sh
cd migrations
```

If you do an ls, you’ll notice that there’s one file already present there, `1_initial_migration.js` . 
This goes hand-in-hand with the previous `Migrations.sol` file you saw in the contracts directory. 
Make sure you, like `Migrations.sol` DO NOT tamper or remove the file as this can ruin the migration process
Make a new file called `2_show_num_deploy.js` and make its contents the following:

Note the "./show_num.sol" which tells Truffle to get compiled contract code for show_num . 
The following lines just tell Truffle to migrate the contract but just Truffle also offers a number of other ways to customize your migration to more complex needs which we won’t be exploring today for the sake of simplicity.
Go ahead and save the file. Now, launch your installation of Ganache, letting it run in the background. Run the following command:

```sh
truffle migrate
```

If you open up your Ganache instance running the background, you can tell that your contracts have been deployed because a quick glance at your accounts show that you’ve spent some Ethereum for deployment….
<br/>
…and that you have 4 new generated blocks, which Ganache created automatically from its automining feature which only mines when it detects any intended interaction (calling/deploying a contract)


