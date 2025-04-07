import './Header.css';

import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();

  const handleGoTo = (to: string, replace?: boolean) => {
    return (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

      navigate(to, { replace });
    };
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="navbar-link" onClick={handleGoTo('/')}>
          Snipfy
        </span>
      </div>
      <ul className="navbar-links">
        <li>
          <span className="navbar-link" onClick={handleGoTo('/')}>
            홈
          </span>
        </li>
        <li>
          <span className="navbar-link" onClick={handleGoTo('/login')}>
            로그인
          </span>
        </li>
        <li>
          <span className="navbar-link" onClick={handleGoTo('/about')}>
            더보기
          </span>
        </li>
        <li>
          <span className="navbar-link" onClick={handleGoTo('/services')}>
            서비스
          </span>
        </li>
        <li>
          <span className="navbar-link" onClick={handleGoTo('/contact')}>
            1:1 문의
          </span>
        </li>
      </ul>
      <div className="navbar-toggle">
        <span className="navbar-toggle-icon">&#9776;</span>
      </div>
    </nav>
  );
};
