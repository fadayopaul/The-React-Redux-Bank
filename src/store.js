import { createStore } from "redux";

// Create STate
const initiaState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

// Define the reducer function
function reducer(state = initiaState, action) {
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

      // LATER:
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

// import create store from redux and store in a variable
const store = createStore(reducer);

// dispatching the actions from the reducer function
// store.dispatch({ type: "account/deposit", payload: 500 });
// store.dispatch({ type: "account/withdraw", payload: 200 });

// store.dispatch({
// type: "account/requestLoan",
// payload: { amount: 1700, purpose: "Buy a Car" },
// });

// store.dispatch({ type: "account/payLoan" });
// console.log(store.getState());

// Action creators

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

console.log(store.getState());
