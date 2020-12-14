import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return <div>
    <Link to='/'>index</Link>
    <br />
    <Link to='/home'>home</Link>
    <br />
    <Link to='/login'>login</Link>
  </div>;
}

export default Header;