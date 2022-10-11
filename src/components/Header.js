import PropTypes from 'prop-types';
import Button from './Button';

const Header = ({title}) => {
    const onClick = () =>
    {
        console.log('Click')
    }
  return (
    <header className='header'>
      <h1>{title}</h1>
      <Button color='green' text='ADD' onClick = {onClick}/>
    </header>
  )
}
Header.defaultProps = {
    title:'Task Tracker',
}
Header.prototype = {
title : PropTypes.string.isRequired,
}

//CSS in JS
//const headingStyle ={
    
       // color:'blue',
    //backgroundColor:'black'
//}
export default Header
