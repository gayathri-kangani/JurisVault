require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",

  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/JXkLXeD0b-1WhhZmj6v8_rMNDRIR_-mi',
      accounts: ['c45203af4d86b8f8ee79d52655a81a7eb6d72f26fdba3416b61d94dbd0e7ecfd'],
    },},
    
};
