import React from "react"
import { Spinner } from 'reactstrap';
import "./spinner.css"
const withLoading = (Component) => {
    return props => props.isLoading ? <div className="spinner"><Spinner color="#feb800" /></div> : <Component {...props} />
}
export default withLoading
