import React,{useState,useContext} from 'react'
import {Menu} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import { AuthContext } from '../context/auth';
export default function MenuBar() {

    const [activeItem,setActiveItem]=useState('anasayfa');
    const handleItemClick=(e,{name})=>setActiveItem(name)

    const {user,logout}=useContext(AuthContext)
    const menubar = user ? (
      <Menu tabular color="blue" size="large">
        <Menu.Item
          as={Link}
          to="/"
          name={user.username}
          active
          onClick={handleItemClick}
        />
        <Menu.Menu position="right">
          <Menu.Item
            as={Link}
            to="/login"
            name="çıkış"
            active={activeItem === "çıkış"}
            onClick={logout}
          />
        </Menu.Menu>
      </Menu>
    ) : (
      

      <Menu tabular color="blue" size="large">
              <Menu.Menu position="right">
          <Menu.Item
            as={Link}
            to="/login"
            name="giriş"
            active={activeItem === "giriş"}
            onClick={handleItemClick}
          />
          <Menu.Item
            as={Link}
            to="/register"
            name="üye ol"
            active={activeItem === "üye ol"}
            onClick={handleItemClick}
          />
        </Menu.Menu>
      </Menu>
    );
  return menubar
}
