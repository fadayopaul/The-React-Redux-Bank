import { combineReducers, createStore } from "redux";

// Create STate
const initiaStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initiaStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

// Define the reducer function for Accounts
function accountReducer(state = initiaStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };

    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };

    case "account/requestLoan":
      if (state.loan > 0) return state;

      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };

    case "account/payLoan":
      return {
        ...state,
        balance: state.balance - state.loan,
        loanPurpose: "",
        loan: 0,
      };
    default:
      return state;
  }
}

// Define the reducer function for customers
function customerReducer(state = initiaStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomers":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };

    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload,
      };

    default:
      return state;
  }
}

/* import create store from redux and store in a variable, 
then pass the reducer function as an argument into the  `createStore()` function, making it the thr root reducer :
const store = createStore(accountReducer);

but

if we have two or more reducers, we can combine using the `combineReducers()`, which will receive the reducers as objects and stored into a vairiable. the variable is then passed into the createStore()
*/

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);
// dispatching the actions from the reducer function

// store.dispatch({ type: "account/deposit", payload: 500 });
// store.dispatch({ type: "account/withdraw", payload: 200 });

// store.dispatch({
// type: "account/requestLoan",
// payload: { amount: 1700, purpose: "Buy a Car" },
// });

// store.dispatch({ type: "account/payLoan" });
// console.log(store.getState());

/*
older codebase

const ACCOUNT_DEPOSIT = "account/deposit"

in the reducer function: 

case ACCOUNT_DEPOSIT:
      return {
        ...state,
        balance: state.balance + action.payload,
      };


      in the action creator:
      function deposit(amount) {
  return {
    type: ACCOUNT_DEPOSIT,
    payload: amount,
  };
}
store.dispatch(deposit(1000));
 */

// Action creators for Account
// deposit action
function deposit(amount) {
  return {
    type: "account/deposit",
    payload: amount,
  };
}
store.dispatch(deposit(1000));

//  withdraw action
function withdraw(amount) {
  return {
    type: "account/withdraw",
    payload: amount,
  };
}
store.dispatch(withdraw(500));

// requesrLoan action
function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: {
      amount,
      purpose,
    },
  };
}
store.dispatch(requestLoan(200, "Setting up a business"));

//  payLoan action
function payLoan() {
  return {
    type: "account/payLoan",
  };
}
store.dispatch(payLoan());

// console.log(store.getState());

//
// Action creators for customers
// create customers
function createCustomers(fullName, nationalID) {
  return {
    type: "customer/createCustomers",
    payload: {
      fullName,
      nationalID,
      createdAt: new Date().toISOString(),
    },
  };
}
store.dispatch(createCustomers("Paul Fadayo", "Nigerian"));
console.log(store.getState());

// update customer name
function updateName(fullName) {
  return {
    type: "customer/updateName",
    payload: fullName,
  };
}
store.dispatch(updateName("Jegede Olasunkanmi"));
console.log(store.getState());
