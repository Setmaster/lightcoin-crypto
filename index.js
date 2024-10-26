class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    return this.transactions.reduce((acc, curr) => {
      return acc + curr.value;
    }, 0);
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    // Keep track of the time of the transaction
    this.time = new Date();
    // Add the transaction to the account
    if (this.isAllowed()) {
      this.account.addTransaction(this);
      return true;
    }
    return false;
    }

}

class Deposit extends Transaction {
  isAllowed(){
    return true;
  }

  get value() {
    return this.amount;
  }

}

class Withdrawal extends Transaction {
  isAllowed(){
    return this.account.balance >= this.amount;
  }

  get value() {
    return -this.amount;
  }

}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
// DRIVER CODE BELOW

const myAccount = new Account('billybob');

console.log('Starting Balance:', myAccount.balance);

const t1 = new Deposit(120.00, myAccount);
console.log(t1.commit());

const t2 = new Withdrawal(50.00, myAccount);
console.log(t2.commit())

const t3 = new Withdrawal(500000.00, myAccount);
console.log(t3.commit())
console.log('Ending Balance:', myAccount.balance);
