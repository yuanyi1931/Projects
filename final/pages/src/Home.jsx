import './Home.css';
import panelList from './panelList';

function Home() {
    const list = panelList.map(item => {
        return (
            <div className="panel" key={item.id}>
              <img
                  className="panel-image"
                  src={item.image}
                  alt={item.name}/>
              <p className="panel-text">{item.text}</p>
            </div>
        );
      });
    
      return(
        <div className="panels">
            {list}
        </div>
      );
        
    }
    export default Home;