import React from 'react';
import Spinner from 'react-bootstrap/Spinner'
import classes from './Spinner.module.css'

const spinner = (props) => {
    let spnr = [];
    for (let i = 0; i < props.count; i++) {
        spnr.push(<Spinner className={classes.margin}
            key={i}
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
        />);
    }
    return (<div className={classes.spinner}>{spnr}</div>)
}

export default spinner;