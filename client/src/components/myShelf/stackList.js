import React from 'react';
import {Link} from 'react-router';
import Avatar from 'material-ui/Avatar';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import {green500} from 'material-ui/styles/colors';
import DeleteStackConfirm from '../confirmActionModal/deleteStack'
import {subHeader, cardHeader, cardActions, cardText, stackSummaryDisplay} from '../utilities/stackSummaryStyle';
import {loadingIcon} from './../styles/myshelf.css';


const StackList = (props) =>{
    return(
        <div className="cards">
            <Card style={{overflow: "hidden",background:"white"}} zDepth={2}>
                <CardHeader
                    title={`Subject: ${props.item.subject}`}
                    titleStyle={{
                        fontSize: "1em",
                        fontWeight: "bold",
                        color: "white",
                        overflow: "hidden"}}
                    subtitleStyle={cardHeader}
                    subtitle={`Category: ${props.item.category}`}
                    avatar={<Avatar style={{float:"right",color:"black",background:"#797979",boxShadow:"rgba(0, 0, 0, 0.75) 0px 1px 6px, rgb(0, 0, 0) 0px 1px 4px"}}>{props.item.totalCards}</Avatar>}
                    style={cardHeader}
                />
                <CardActions style={cardActions}>
                    <IconButton containerElement={<Link to={`/stackOverview/${props.item.stack_id}`} name="stackOverview"/>}>
                        <RemoveRedEye hoverColor={green500}/>
                    </IconButton>
                    <DeleteStackConfirm stackID={props.item.stack_id}/>
                </CardActions>
                <CardText style={cardText}>{`Total Views: ${props.item.stackRating}`}</CardText>
            </Card>
        </div>
    )
};

export default StackList;