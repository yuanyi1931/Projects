import './Footer.css';

function Footer() {
    return(
    <footer className="footer">
        <h3 className="footer-title">Cats of the Internet</h3>
        <ul className="footer-place-list">
          <li className="footer-place-item">
            <a className="footer-place-link" href="https://visitseattle.org/">
                Seattle
            </a>
          </li>
          <li className="footer-place-item">
            <a className="footer-place-link" href="https://www.boston.com/">
                Boston
            </a>
          </li>
        </ul>
        <ul className="footer-link-list">
          <li className="footer-link-item">
            <a className="footer-link-link" href="https://policies.google.com/">
                Privacy Policy
            </a>
          </li>
          <li className="footer-link-item">
            <a className="footer-link-link" href="https://www.seattlehumane.org/adoption/">
                Adoption
            </a>
          </li>
          <li className="footer-link-item">
            <a className="footer-link-link" href="https://www.petsafe.net/learn/the-truth-behind-cat-naps">
                Naps
            </a>
          </li>
        </ul>
        <ul className="footer-social-list">
          <li className="footer-social-item">
            <a className="footer-social-link" href="https://www.facebook.com/iLoveCatss/">
                Facebook
            </a>
          </li>
          <li className="footer-social-item">
            <a className="footer-social-link" href="https://www.instagram.com/catsofinstagram/">
                Instagram
            </a>
          </li>
        </ul>
    </footer>
    );
}
export default Footer;