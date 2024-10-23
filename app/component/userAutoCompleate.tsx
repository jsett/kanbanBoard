import { useRef, useState } from "react";

export function UserAutoCompleate(){
    const [user, setUser] = useState("");
    //id of the user being selected.
    const [userID, setUserID] = useState(0);
    //list of suggestion
    const [suggest, setSuggest] = useState([]);
    //is the suggest box open or closed
    const [suggestActive, setSuggestActive] = useState(false);
    //index of the currently selected user
    const [suggestIndex, setSuggestIndex ] = useState(0);
    //inputs ref to set values on
    const inputRef = useRef(null);

    //update the list of values
    const updateUserList = (val) => {
        setUser(val);
        if (val != ""){
            const formData = new FormData();
        
            formData.append("searchString", val);

            //go fetch the auto compleat suggesions
            fetch('/api/search/user', {
                method: 'post',
                body: formData,
            }).then((res) => {
                res.json().then((ret) => {
                    setSuggestActive(true);
                    setSuggest(ret)
                });
            });
            
        } else {
            //empty search string close the box and clear suggestions.
            setSuggestActive(false);
            setSuggest([])
        }
    }

    //a suggesion is clicked
    const clickedSuggestion = (sug) => {
        setUserID(sug.id); 
        setSuggestActive(false); 
        inputRef.current.value = sug.name
    }

    // generated list of suggesion elements
    const suggestList = suggest.map((sug, idx) => {
        return <li key={`sug-${sug.id}`} className={suggestIndex==idx ? "font-bold" : ""} onClick={() => clickedSuggestion(sug)}>{sug.name}</li>
    })

    // handle key up/down/enter events to update the selection index.
    const keyevent = (e) => {    
        if (e.keyCode == '38') {
            // up arrow
            if (suggestIndex == 0){
                setSuggestIndex(suggest.length-1)
            } else {
                setSuggestIndex((pre) => pre-1)
            }
        }
        else if (e.keyCode == '40') {
            // down arrow
            if (suggestIndex == (suggest.length-1)){
                setSuggestIndex(0)
            } else {
                setSuggestIndex((pre) => pre+1)
            }
            console.log("down")
        }
        else if (e.keyCode === 13) {
            //enter
            setUserID(suggest[suggestIndex].id); 
            setSuggestActive(false); 
            inputRef.current.value = suggest[suggestIndex].name
            e.preventDefault();
        }
    }
    
 
    //generate the open or closed suggest box.
    const suggestComp = suggestActive ? <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
        {suggestList}
    </ul> : <></>;
//onBlur does not work because the suggest box uses css transforms to place elements.
//onBlur={() => setSuggestActive(false)}
    return <div className="dropdown dropdown-open w-full" >
    <div tabIndex={0} className="mb-1">
        <input type="hidden" name="assignedUser" value={userID} />
        <input ref={inputRef} type="text" placeholder="Assign To User" onKeyDown={keyevent} onChange={e => updateUserList(e.target.value)} className="input input-bordered w-full" />
    </div>
    {suggestComp}
  </div>
}