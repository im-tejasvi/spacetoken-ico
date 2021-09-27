var PeaceToken = artifacts.require("./PeaceToken.sol");

contract("PeaceToken", function (accounts) {
  var tokenInstance;

  it("initializes the contract with the correct values", function () {
    return PeaceToken.deployed()
      .then(function (instance) {
        tokenInstance = instance;
        return tokenInstance.name();
      })
      .then(function (name) {
        assert.equal(name, "Peace Token", "has the correct name");
        return tokenInstance.symbol();
      })
      .then(function (symbol) {
        assert.equal(symbol, "PEACE", "has the correct symbol");
        return tokenInstance.standard();
      })
      .then(function (standard) {
        assert.equal(standard, "Peace Token v1.0", "has the correct standard");
      });
  });

  it("sets the total supply upon deployment", function () {
    return PeaceToken.deployed()
      .then(function (instance) {
        tokenInstance = instance;
        return tokenInstance.totalSupply();
      })
      .then(function (totalSupply) {
        assert.equal(
          totalSupply.toNumber(),
          1000000,
          "sets the total supply to 1,000,000"
        );
        return tokenInstance.balanceOf(accounts[0]);
      })
      .then(function (adminBalance) {
        assert.equal(
          adminBalance.toNumber(),
          1000000,
          "it allocates the initial supply to the admin account"
        );
      });
  });

  it("should send coin correctly", () => {
    let meta;

    // Get initial balances of first and second account.
    const account_one = accounts[0];
    const account_two = accounts[1];

    let account_one_starting_balance;
    let account_two_starting_balance;
    let account_one_ending_balance;
    let account_two_ending_balance;

    const amount = 10;

    return PeaceToken.deployed()
      .then((instance) => {
        meta = instance;
        return meta.getBalance.call(account_one);
      })
      .then((balance) => {
        account_one_starting_balance = balance.toNumber();
        return meta.getBalance.call(account_two);
      })
      .then((balance) => {
        account_two_starting_balance = balance.toNumber();
        return meta.transfer(account_two, amount, { from: account_one });
      })
      .then(() => meta.getBalance.call(account_one))
      .then((balance) => {
        account_one_ending_balance = balance.toNumber();
        return meta.getBalance.call(account_two);
      })
      .then((balance) => {
        account_two_ending_balance = balance.toNumber();

        assert.equal(
          account_one_ending_balance,
          account_one_starting_balance - amount,
          "Amount wasn't correctly taken from the sender"
        );
        assert.equal(
          account_two_ending_balance,
          account_two_starting_balance + amount,
          "Amount wasn't correctly sent to the receiver"
        );
      });
  });
});
