import { createSlice } from "@reduxjs/toolkit";

// create state
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance = state.balance + action.payload;
      state.isLoading = false;
    },

    withdraw(state, action) {
      state.balance = state.balance - action.payload;
    },

    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },

      reducer(state, action) {
        if (state.loan > 0) return state;

        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      },
    },

    payLoan(state) {
      state.balance = state.balance - state.loan;
      state.loanPurpose = "";
      state.loan = 0;
    },

    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

//  using Thunk with RTK
export function deposit(amount, currency) {
  if (currency === "USD")
    return {
      type: "account/deposit",
      payload: amount,
    };

  //Making API calls with middelware and Thunks
  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });

    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates["USD"];

    console.log(converted);

    dispatch({
      type: "account/deposit",
      payload: converted,
    });
  };
}

export default accountSlice.reducer;
/*
// Define the reducer function for Accounts
export default function accountReducer(state = initiaState, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
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

    case "account/convertingCurrency":
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }
}

// Action creators for Account
// deposit action (with middleware and Thunks)
export function deposit(amount, currency) {
  if (currency === "USD")
    return {
      type: "account/deposit",
      payload: amount,
    };

  //Making API calls with middelware and Thunks
  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });

    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;

    dispatch({
      type: "account/deposit",
      payload: converted,
    });
  };
}

//  withdraw action
export function withdraw(amount, balance) {
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

*/
