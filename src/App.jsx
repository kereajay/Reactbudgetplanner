import { useReducer, createContext, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
// import {  } from 'react'
import Budget from "./Budget";

export const Usercontext = createContext();

const initialstate = {
  // id:uuidv4(),
  name: "",

  amount: 0,
  Expensearray: [],
  budget: 2000,
  spent: 0,
  remaining: 2000,
};
const reducerfn = (state, action) => {
  switch (action.type) {
    case "nameinput":
      return {
        ...state,
        name: action.payload,
      };
    case "inputnumber":
      return {
        ...state,
        amount: action.payload,
      };
    case "addexpense":
      return {
        ...state,
        // budget : state.budget - action.payload.amount,
        spent: state.spent + Number(action.payload.amount),
        remaining: state.remaining - action.payload.amount,
        Expensearray: [...state.Expensearray, action.payload],

        // localStorage.setItem("Expensearray", JSON.stringify([...state.Expensearray, action.payload]))
      };
    case "removeexpense":
      const Expensearrayc = state.Expensearray.filter(
        (item) => item.id == action.payload
      );
      const deletedamount = Number(Expensearrayc[0].amount);

      // localStorage.setItem("Expensearray", JSON.stringify(state.Expensearray.filter((item) => item.id != action.payload)))

      return {
        ...state,
        Expensearray: state.Expensearray.filter(
          (item) => item.id != action.payload
        ),
        spent: state.spent - deletedamount,
        remaining: state.remaining + Number(deletedamount),

        // Expensearray: [...state.Expensearray],
      };
    default:
      return state;
  }
};
function App() {
 
  const [state, dispatch] = useReducer(
    reducerfn,
   
   JSON.parse(localStorage.getItem("expense")) || initialstate,
  );
  useEffect(() => {
    localStorage.setItem("expense", JSON.stringify(state));
  }, [state])
  // console.log(state.Expensearray);


  return (
    <>
      <Usercontext.Provider value={{ state, dispatch }}>
        <Budget />
      </Usercontext.Provider>
    </>
  );
}

export default App;
