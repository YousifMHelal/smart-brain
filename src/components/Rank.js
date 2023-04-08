import React from 'react'

const Rank = ({name, entries}) => {
    return (
        <div className='d-flex flex-column'>
            <h3 className='text-light text-center'>
                {`${name}, your current rnak is ...`}
            </h3>
            <p className='fs-1 text-light text-center'>
                #{entries}
            </p>
        </div>
    )
}

export default Rank