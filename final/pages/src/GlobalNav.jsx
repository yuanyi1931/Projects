import menu from './menu';
import  { useState } from 'react';
import './GlobalNav.css';




function GlobalNav({className, setPage}) {
    const[ showMenu, setShowMenu ] = useState(false);

    const list = menu.map( item =>{
        return(
            <li className="global-nav-item" key={item.name}>
              <a 
                className="global-nav-link" 
                href="{item.path}"
                onClick={ (e) =>{
                    e.preventDefault();
                    setPage(item.name)
                }}
                >
                {item.name}
              </a>
            </li>
        );
    });
    
    const menuClass = showMenu ? 'global-nav-list-open' : '';
    return(
      <nav className={`global-nav ${className}`}>
        <button 
        className="global-nav-toggle"
        onClick={ () => {
            setShowMenu(!showMenu);
        }}
        >
          { showMenu ? "Close Menu" : "Open Menu" }
        </button>
        <ul className= {`global-nav-list ${menuClass}`}>
            {list}
        </ul>
      </nav>
    );
}
export default GlobalNav;