import React from 'react';


export const Statistics = ({ text, value }) => {

    return (
        <tr>
            <td>{text}</td>
            <td>
                {value}
            </td>
        </tr>
    )

}