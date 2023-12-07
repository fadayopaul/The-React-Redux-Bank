// Create State
const initiaStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

// Define the reducer function for customers
export default function customerReducer(state = initiaStateCustomer, action) {
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

// Action creators for customers
// create customers
export function createCustomers(fullName, nationalID) {
  return {
    type: "customer/createCustomers",
    payload: {
      fullName,
      nationalID,
      createdAt: new Date().toISOString(),
    },
  };
}

// update customer name
export function updateName(fullName) {
  return {
    type: "customer/updateName",
    payload: fullName,
  };
}
