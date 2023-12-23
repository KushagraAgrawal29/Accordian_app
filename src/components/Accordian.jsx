import React, { useState } from "react";
import data from "./data";

const Accordian = () => {
    const [selected,setSelected] = useState(null);
    const [enableMultiSelection,setEnableMultiSelection] = useState(false);
    const [multiple,setMultiple] = useState([]);

    function handleSingleSelection(getCurrentId) {
        setSelected(getCurrentId === selected ? null : getCurrentId);
    }

    function handleMultiSelection(getCurrentId){
        let cpyMultiple = [...multiple];

        const findIndexOfCurrentId = cpyMultiple.indexOf(getCurrentId);
        console.log(findIndexOfCurrentId);


        if(findIndexOfCurrentId === -1){
            cpyMultiple.push(getCurrentId);
        }
        else{
            cpyMultiple.splice(findIndexOfCurrentId,1);
        }
        setMultiple(cpyMultiple);
    }

  return (
    <div className="flex flex-col mt-[200px] h-screen">
      <button className="flex flex-row items-center justify-center bg-amber-900 text-white p-4 rounded font-bold border-gray-600 border-2 cursor-pointer" onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        Enable Multi Selection
      </button>
      <div className="w-[500px] mt-5">
        {data && data.length > 0 ? (
            data.map((dataItem) => (
                <div className="bg-amber-900 py-10 px-10 mb-3">
                    <div onClick={enableMultiSelection ?
                    () => handleMultiSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                    } className="text-white flex justify-between items-center cursor-pointer">
                        <h3>{dataItem.question}</h3>
                        <span className="space-between">+</span>
                    </div>
                    {enableMultiSelection ? 
                     multiple.indexOf(dataItem.id) !== -1  && 
                     (
                        <div className="h-auto text-white">
                            {dataItem.answer}
                        </div>
                     ):selected === dataItem.id && (
                        <div className="h-auto text-white">
                            {dataItem.answer}
                        </div>
                     )}
                </div>
            ))
        ):(
            <div>No data found</div>
        )}
      </div>
    </div>
  );
};

export default Accordian;
