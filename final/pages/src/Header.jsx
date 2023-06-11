import './Header.css';
import GlobalNav from './GlobalNav';


function Header( { setPage }) {
    return(
    <header className="header">
      <img
        src="https://images.unsplash.com/photo-1583083527882-4bee9aba2eea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjN8fGNhdHxlbnwwfDF8MHx8&auto=format&fit=crop&w=700&q=60"
        className="header-logo"
        alt="Feline Overlords Logo"
      />
      <h1 className="header-title">
        Welcome to our MEOW MEOW Planet
      </h1>
      <a href="#main" className="skip">Skip to main content</a>
      <GlobalNav className="header-nav" setPage={setPage}/>
    </header>
    );
}
export default Header;