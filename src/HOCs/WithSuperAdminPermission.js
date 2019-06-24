//protected routes
import React, { PropTypes } from 'react';  
import { connect } from 'react-redux';  
import { toggleShow, authenticated } from "../redux/actions/actions"
import { Route, Redirect } from 'react-router'

export default function (ComposedComponent) {  
  const  WithSuperAdminPermission =(props) =>{
 
  
    if(props.user.role === "superAdmin")
      return <ComposedComponent {...props} />
    
    return <span></span>;
    }
  
   

  const mapStateToProps = (state) => ({
      user: state.user.user
    })
  

  
 
return connect(
    mapStateToProps
      )(WithSuperAdminPermission);
}
