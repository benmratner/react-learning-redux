import React, {PropTypes} from 'react'
import { Authenticate } from 'components'
import auth from 'helpers/auth'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as userActionCreators from 'redux/modules/users'

const AuthenticateContainer = React.createClass({
    propTypes: {
    	isFetching: PropTypes.bool.isRequired,
    	error: PropTypes.string.isRequired,
    },

    handleAuth() {
    	this.props.fetchingUser()
        auth().then((user) => {
        	this.props.fetchingUserSuccess(user.uid, user, Date.now())
        	this.props.authUser(user.uid)
            console.log(user)
        })
        .catch((error) => userActionCreators.fetchingUserFailure(error))
    },
    render() {
    	console.log(this.props);
        return (
            <Authenticate
		        onAuth={this.handleAuth}
		        isFetching={this.props.isFetching}
		        error={this.props.error} />
        )	
    },
})

function mapStateToProps(state){
	console.log(state);
	return {
		isFetching: state.isFetching,
		error: state.error
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(userActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticateContainer)
