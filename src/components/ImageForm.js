import React from 'react'

const ImageForm = ({onInputChange, onSubmit}) => {
    return (
        <div className='d-flex justify-content-center align-items-center flex-column'>
            <h3>
                This Magic Brain will detect faces in your pictures, Git it a try.
            </h3>
            <div className='form d-flex justify-content-center p-4 rounded shadow mt-3'>
                <input className='fs-5 w-75 py-1 px-2 me-2' type='text' onChange={onInputChange} />
                <button className='w-25 fs-5 link py-1 px-2 bg-dark text-light' onClick={onSubmit}>Detect</button>
            </div>
        </div>
    )
}

export default ImageForm