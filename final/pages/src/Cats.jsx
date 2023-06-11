import './Cats.css';
import catList from './catList';


function Cats({setPage}) {
  const list = catList.map(item => {
    return (
        <div className="card" key={item.id}>
          <h2 className="card-title">{item.name}</h2>
          <img
              className="card-image"
              src={item.image}
              alt={item.name}/>
          <p className="card-text">{item.text}</p>
          {item.link !== "" && <p className="card-text"
          >
            Back to{" "}
          <a 
            className="card-link" 
            href="{item.link}"
            onClick={ (e) =>{
                e.preventDefault();
                setPage(item.link)
            }}
            >
            {item.link}
          </a></p>}

        </div>
    );
  });

  return(
    <div className="cards">
        {list} 
    </div>
    
  );
    
}
export default Cats;