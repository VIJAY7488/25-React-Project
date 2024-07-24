import { useState } from "react";
import data from "./Data";

export default function Accordion() {

    const [selected, setSelected] = useState(null);
    const [enableMultipleSelect, setEnableMultipleSelect] = useState(false);
    const [multiselection, setMultiSelection] = useState([]);

    function handleSingleSelection(getCurrentId) {
        setSelected(getCurrentId === selected ? null : getCurrentId);
    }

    function handleMultiSelection (getCurrentId){
        let copyMultiple = [...multiselection];
        const findIndexOf = copyMultiple.indexOf(getCurrentId);

        if(findIndexOf === -1) copyMultiple.push(getCurrentId);
        else copyMultiple.splice(findIndexOf, 1);

        setMultiSelection(copyMultiple);
    }

    console.log(selected, multiselection);

    return (
        <div className="w-full max-w-2xl mx-auto py-4">
            <div className="flex justify-center mb-6">
              <button 
              onClick={() => setEnableMultipleSelect(!enableMultipleSelect)}
              className="border-2 border-black px-2 py-1 rounded-lg"
              >Enable Multi Select</button>
            </div>
            {
                data && data.length > 0 ?
                data.map((dataItems) => 
                <div key={dataItems.id} className="bg-orange-800 rounded-lg shadow-md mb-4">
                    <div 
                        className="flex justify-center items-center text-white text-lg px-4 py-3 cursor-pointer space-x-4"
                        onClick={
                            enableMultipleSelect ? 
                            () => handleMultiSelection(dataItems.id) : 
                            () => handleSingleSelection(dataItems.id)}
                    >
                        <h2 className="font-semibold">{dataItems.question}</h2>
                        <span className={`transform transition-transform duration-300 ${selected === dataItems.id ? 'rotate-45' : ''} text-3xl font-semibold`}>+</span>
                    </div>
                    {
                        enableMultipleSelect ? 
                        multiselection.indexOf(dataItems.id) !== -1 && (
                        <div className="text-white felx justify-center px-4 py-3 bg-orange-700">
                            <h2>{dataItems.answer}</h2>
                        </div>
                        ) : selected === dataItems.id && (
                        <div className="text-white felx justify-center px-4 py-3 bg-orange-700">
                        <h2>{dataItems.answer}</h2>
                        </div>
                        )
                    }
                    {/* {
                        selected === dataItems.id || 
                        multiselection.indexOf(dataItems.id) !== -1 ? 
                        <div className="text-white felx justify-center px-4 py-3 bg-orange-700">
                            <h2>{dataItems.answer}</h2>
                        </div> : null
                    } */}
                </div>) : <div>No data found</div>
            } 
        </div>
    );
}
