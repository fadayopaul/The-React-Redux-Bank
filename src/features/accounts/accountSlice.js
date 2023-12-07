// create state
const initiaStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

// Define the reducer function for Accounts
export default function accountReducer(state = initiaStateAccount, action) {
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

// Action creators for Account
// deposit action
export function deposit(amount) {
  return {
    type: "account/deposit",
    payload: amount,
  };
}

//  withdraw action
export function withdraw(amount) {
  return {
    type: "account/withdraw",
    payload: amount,
  };
}

// requesrLoan action
export function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: {
      amount,
      purpose,
    },
  };
}

//  payLoan action
export function payLoan() {
  return {
    type: "account/payLoan",
  };
}
