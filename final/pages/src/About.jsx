import './About.css';
import aboutList from './aboutList';
import AccordionSection from './AccordionSection';

function About() {
  const list = aboutList.map(item => {
    return (
        <div className="about" key={item.id}>
          <h2 className="about-title">{item.name}</h2>
          <p className="about-text">{item.text}</p>
        </div>
    );
  });

  return(
    <div className="about-cats">
        {list}
      <AccordionSection title="Who takes care of community cats?">
      An estimated 10-12% of the American public feed community cats. In addition to providing daily meals and fresh water, these cat caregivers may provide dedicated shelter to protect the cats in inclement weather and provide medical care if the cats become sick or are injured.
      </AccordionSection>

      <AccordionSection title="Why are there so many cats outdoor?">
      Overpopulation is a serious concern with an estimated 30 to 40 million community cats in the United States. Some cats have lived outside for generations, while others adapted to living outdoors after being lost or abandoned.
      </AccordionSection>
    </div>
  );
    
}
export default About;