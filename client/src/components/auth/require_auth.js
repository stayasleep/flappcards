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
            if(!this.props.authenticated){
                this.context.router.push('/');
            }
        }

        componentWillUpdate(nextProps) {
            if(!nextProps.authenticated){
                this.context.router.push('/');
            }
        }

        render() {
            return <ComposedComponent {...this.props}/>
        }
    }

    function mapStateToProps(state) {
        return { authenticated: state.auth.authenticated };
    }

    return connect(mapStateToProps)(Auth);
}