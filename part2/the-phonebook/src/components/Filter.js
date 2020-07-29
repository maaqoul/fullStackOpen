import React from 'react';

const Filter = ({ search, handleOnSearch }) => {
    return (
        <div>
            filter shown with : <input type="text" value={search} onChange={handleOnSearch} />
        </div>
    )
}

export default Filter