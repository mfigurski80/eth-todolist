const TodoList = artifacts.require("TodoList");

module.exports = (deployer) => {
  deployer.deploy(TodoList);
};
