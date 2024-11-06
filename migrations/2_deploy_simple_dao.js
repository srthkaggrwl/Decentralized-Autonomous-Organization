const SimpleDAO = artifacts.require("SimpleDAO");

module.exports = function (deployer) {
  // Deploy the SimpleDAO contract
  deployer.deploy(SimpleDAO);
};
