import Home from './Home';
import About from './About';
import Cats from './Cats';
import Gallery from './Gallery';
import Form from './Form';





function Main( { page, setPage} ) {
    return(
    <main id='main'>
      { (page === 'Home') && <Home/> }
      { (page === 'About') && <About/> }
      { (page === 'Cats') && <Cats setPage={setPage}/> }
      { (page === 'Gallery') && <Gallery/> }
      { (page === 'Form') && <Form/> }
      
  
    </main>
    );
}
export default Main;