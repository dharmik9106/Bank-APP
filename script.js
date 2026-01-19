class Bank {
  constructor(name, balance) {
    this.name = name;
    this.balance = balance;
  }

  add(amount) {
    this.balance += amount;
    return `✅ ₹${amount} added. Balance: ₹${this.balance}`;
  }

  info() {
    return `👤 ${this.name} | Balance: ₹${this.balance}`;
  }
}

class Savings extends Bank {
  withdraw(amount) {
    if (this.balance - amount < 500) {
      return "⚠ Minimum ₹500 balance required";
    }
    this.balance -= amount;
    return `✅ Withdraw ₹${amount}. Balance: ₹${this.balance}`;
  }
}

class Current extends Bank {
  withdraw(amount) {
    if (amount > this.balance + 1000) {
      return "❌ Overdraft limit exceeded";
    }
    this.balance -= amount;
    return `✅ Withdraw ₹${amount}. Balance: ₹${this.balance}`;
  }
}

let account = null;

function create() {
  const name = document.getElementById("name").value.trim();
  const start = Number(document.getElementById("start").value);
  const type = document.getElementById("accountType").value;

  if (!name || start < 0 || !type) {
    result.innerText = "⚠ Fill all details correctly";
    return;
  }

  if (type === "savings" && start < 500) {
    result.innerText = "⚠ Savings needs minimum ₹500";
    return;
  }

  account = type === "savings"
    ? new Savings(name, start)
    : new Current(name, start);

  result.innerText = `🎉 Account created for ${name}`;
}

function deposit() {
  if (!account) {
    result.innerText = "⚠ Create account first";
    return;
  }

  const amt = Number(document.getElementById("amount").value);
  if (amt <= 0) {
    result.innerText = "⚠ Enter valid amount";
    return;
  }

  result.innerText = account.add(amt);
}

function withdraw() {
  if (!account) {
    result.innerText = "⚠ Create account first";
    return;
  }

  const amt = Number(document.getElementById("amount").value);
  if (amt <= 0) {
    result.innerText = "⚠ Enter valid amount";
    return;
  }

  result.innerText = account.withdraw(amt);
}

function status() {
  if (!account) {
    result.innerText = "⚠ Create account first";
    return;
  }

  result.innerText = account.info();
}
