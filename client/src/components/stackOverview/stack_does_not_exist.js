import React from 'react';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';

const DoesNotExist = (props) =>{
    return(
        <div>
            <Paper className="stack-unavailable" zDepth={2} style={{textAlign: "center", margin:"2em 0", padding:"2em 0"}}>
                <div className="unavailable-container" >
                    <h1 className="unavailable-title" style={{textDecoration: "underline"}}>Stack Not Found!</h1>
                </div>
                <div>
                    <h3>If you&apos;re looking for a stack, it&apos;s probably been deleted or may not have existed at all.</h3>
                    <p>If you&apos;re looking for some groovy stacks, check out our awesome <Link to={"/search"} name="search page">Flapp Community!</Link></p>
                </div>
            </Paper>
        </div>
    )
};
export default DoesNotExist;