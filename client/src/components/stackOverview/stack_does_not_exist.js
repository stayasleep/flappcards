import React from 'react';

const DoesNotExist = (props) =>{
    return(
        <div>
            <div>
                <h1>Stack Not Found</h1>
            </div>
            <div>
                <h3>The stack you are looking for does not exist or may have recently been deleted</h3>
                <h3>Please try searching for another stack here on FlappCards</h3>
            </div>
        </div>
    )
};
export default DoesNotExist;