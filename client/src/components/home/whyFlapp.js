import React,{Component} from 'react';
import Paper from 'material-ui/Paper';
import IndexSVG from '../imgs/flappcards_1a.svg';
import Index2SVG from '../imgs/flappcards_2a.svg';
import Index3SVG from '../imgs/flappcards_3a.svg';


//css is disclaimer.css and is not done for making images fit within the parent parent div

class WhyFlappCards extends Component{

    render(){
        return(
            <Paper className="paperBody whyFlapp"  zDepth={2}>
                <div className="innerPaper">
                    <h1 className="titleUnderline">Why Use FlappCards?</h1>
                    <div className="svgContainer">
                        <div className="svgBox">
                            <img className="svgImg" src={IndexSVG} />
                        </div>
                        <div className="svgBox">
                            <img className="svgImg" src={Index2SVG} />
                        </div>
                        <div className="svgBox">
                            <img className="svgImg" src={Index3SVG} />
                        </div>
                    </div>
                </div>
            </Paper>
        )
    }
}

export default WhyFlappCards;