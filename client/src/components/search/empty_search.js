import React from 'react';

const NoResults =(props) => {
    return(
        <div className="search-result" style={{textAlign: "center"}}>
            <p>
                We&apos;re sorry, we found 0 stacks matching <em className="noMatchFound">{props.term}</em>.
            </p>
        </div>
    )
};
export default NoResults;