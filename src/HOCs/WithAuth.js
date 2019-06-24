//protected routes
import React, { PropTypes } from 'react';  
import { connect } from 'react-redux';  
import { toggleShow, authenticated } from "../redux/actions/actions"
import { Route, Redirect } from 'react-router'

export default function (ComposedComponent) {  
  const  WithAuth =(props) =>{
 
  
    if(localStorage.token)
      return <ComposedComponent {...props} />
    props.toggle()
    return <Redirect to="/"/>
    }
  
   

  const mapStateToProps = (state) => ({
      isAuthenticated: state.user.isAuthenticated
    })
  
  const mapDispatchToProps = dispatch => ({
    toggle: () => dispatch(toggleShow()),
  })
  
 
return connect(
    mapStateToProps, 
    mapDispatchToProps
  )(WithAuth);
}
