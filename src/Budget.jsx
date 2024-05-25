import React from "react";
import { useContext, useEffect } from "react";
import { Usercontext } from "./App";
import { v4 as uuidv4 } from "uuid";

function Budget() {
  const { state, dispatch } = useContext(Usercontext);
  // const additem = JSON.parse(localStorage.getItem("Expensearray"));
  // if (additem && state.Expensearray.length === 0) {
  //   // dispatch({ type: "addexpense", payload: additem })
  //   state.Expensearray = additem;
  // }
  // useEffect(()=>{

  // })
  const handlenmaeinput = (e) => {
    dispatch({ type: "nameinput", payload: e.target.value });
    // console.log(state.name);
  };
  const handlenumberinput = (e) => {
    dispatch({ type: "inputnumber", payload: e.target.value });
  };
  const addexpenses = () => {
    dispatch({
      type: "addexpense",
      payload: { name: state.name, amount: state.amount, id: uuidv4() },
    });
    // localStorage.setItem("user", JSON.stringify(state.Expensearray))
  };
  const handleremoveexpenses = (id) => {
    dispatch({ type: "removeexpense", payload: id });
  };
  return (
    <>
      <div className="w-[95%] m-auto mt-20">
        <h1 className="text-5xl font-semibold text-white">My Budget Planner</h1>
        <br />
        <br />
        <div className="flex justify-between mt-10 w-[90%] m-auto">
          <h1 className="text-2xl border-2 border-slate-400 px-4 py-2 text-slate-400">
            Budget Rs:{state.budget}
          </h1>
          <h1 className="text-2xl border-2 border-slate-400 px-4 py-2  text-slate-400">
            Spent so for:{state.spent}
          </h1>
          <h1 className="text-2xl border-2  border-slate-400 px-4 py-2  text-orange-200">
            Remaining Rs:{state.remaining}
          </h1>
        </div>
        <br />
        <div className="flex gap-10 mt-10 m-auto w-[95%]">
          <br />
          <input
            type="text"
            className=" w-[40%] py-1"
            onChange={(e) => handlenmaeinput(e)}
            placeholder="Expense Name"

          />
          <input
            type="number"
            className=" w-[40%] py-1"
            onChange={(e) => handlenumberinput(e)}
            placeholder="Amount"
          />
          <button
            onClick={addexpenses}
            className="bg-blue-400 px-4 rounded-2xl"
          >
            Add
          </button>
        </div>
        <br />
        <div className="mt-10">
          {
            state.Expensearray.length === 0 ? <h1 className='text-4xl font-bold text-center text-white m-auto'>No expenses</h1> :

              state.Expensearray.map((item) => {
                return (
                  <>
                    <div className="flex justify-between shadow-inner w-[90%] text-white rounded-3xl py-1 px-10 m-auto border-2 border-slate-400  ">
                      <h1 className="text-2xl ">{item.name}</h1>
                      <h1 className="text-2xl">{item.amount}</h1>
                      {/* <p>{ item.id }</p> */}
                      <button onClick={() => handleremoveexpenses(item.id)}>
                        ❌
                      </button>
                    </div>
                    <br />
                  </>
                );
              })
          }
        </div>
      </div>
    </>
  );
}

export default Budget;
