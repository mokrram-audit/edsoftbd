import { Link } from 'react-router-dom';
import { FaArrowLeft, FaHome } from 'react-icons/fa';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="notfound page-enter">
      <div className="notfound__inner">
        <div className="notfound__code" aria-hidden="true">404</div>
        <h1 className="notfound__title">Page Not Found</h1>
        <p className="notfound__text">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="notfound__actions">
          <Link to="/" className="btn btn-primary btn-lg">
            <FaHome aria-hidden="true" /> Back to Home
          </Link>
          <Link to="/contact" className="btn btn-outline-dark btn-lg">
            <FaArrowLeft aria-hidden="true" /> Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
