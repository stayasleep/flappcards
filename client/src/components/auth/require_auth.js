import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

export default function(ComposedComponent) {
    class Auth extends Component {
        static contextTypes = {
            router: PropTypes.object
        };

        // if this.props.authenticated is false, !(this.props.authenticated) = true
        // So if they're not authenticated they'll get pushed to the index route (?)
        componentWillMount() {
            console.log('reqauth will mount',this.props);
            if(!this.props.authenticated){
                this.context.router.push('/');
            }
            //if not authorized, cant access the routes below
            if(!this.props.authorized){
                if(['home','createCards','myShelf','profile'].indexOf(this.props.route.path)!== -1){
                    this.context.router.push('/');
                }
            }
        }

        componentWillUpdate(nextProps) {
            console.log('reqauth next props',nextProps);
            if(!nextProps.authenticated){
                this.context.router.push('/');
            }
        }

        render() {
            return <ComposedComponent {...this.props}/>
        }
    }

    function mapStateToProps(state) {
        return { authenticated: state.auth.authenticated, authorized: state.auth.authorized }; //added authorization for guest, hang with me here
    }

    return connect(mapStateToProps)(Auth);
}