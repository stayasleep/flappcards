import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

export default function(ComposedComponent) {
    class Auth extends Component {
        static contextTypes = {
            router: PropTypes.object
        };

        //unauth means they dont have a guest token and w/o that they cant view search/stackoverview
        componentWillMount() {
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
            if(!nextProps.authenticated){
                this.context.router.push('/');
            }
        }

        render() {
            if(!this.props.authorized && !this.props.authenticated) return <div></div>;
            return <ComposedComponent {...this.props}/>
        }
    }

    function mapStateToProps(state) {
        return { authenticated: state.auth.authenticated, authorized: state.auth.authorized }; //added authorization for guest, hang with me here
    }

    return connect(mapStateToProps)(Auth);
}