import React from 'react'
import {
    withStyles,
    makeStyles
  } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const CssTextField = withStyles({
    root: {
      '& .MuiInput-underline:after': {
        color: 'white',
        borderBottomColor: '#ff6a00',
      },
      '& .MuiInputBase-root':{
        color: 'black'
      },
      '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
          borderColor: '#ff6a00',
        },
      },
    },
  })(TextField);

const useStyles = makeStyles((theme) => ({
root: {
    display: 'flex',
    flexWrap: 'wrap',
},
margin: {
    margin: theme.spacing(1),
},
}));


export default function Input(props) {

    const { name, label, value,error=null, onChange, ...other } = props;
    const classes = useStyles();
    return (
      <CssTextField
        variant="outlined"
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        className={classes.margin}
        {...other}
        {...(error && {error:true,helperText:error})}
      />
    )
}