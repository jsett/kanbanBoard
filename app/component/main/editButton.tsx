export function EditButton({editable, setTask, setEditable, markdown}){

    const finishEdit = function(){
        if (editable){
            document.getElementById("textEditorForm").requestSubmit();
            setTask((pre) => ({...pre, text: markdown}))
        }
    }

    return <div 
        className="tooltip"
        data-tip="Edit"
        onClick={() => { finishEdit(); setEditable((val) => !val ); }}
        >
        {editable ?
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                className='h-7 w-7 fill-base-content'
            >
                <path d="m381-240 424-424-57-56-368 367-169-170-57 57 227 226Zm0 113L42-466l169-170 170 170 366-367 172 168-538 538Z" />
            </svg>
            :
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                className='h-7 w-7 fill-base-content'
            >
                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
            </svg>
        }
</div>
}