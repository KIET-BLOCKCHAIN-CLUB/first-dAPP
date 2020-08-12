const Migrations = artifacts.require("show_num");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
