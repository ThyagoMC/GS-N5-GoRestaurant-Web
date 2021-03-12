import React from 'react';
import { Link, useHistory } from "react-router-dom";
import { FiPlusSquare, FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface IHeaderProps {
  openModal?: () => void;
  isAbout?: boolean
}

const Header: React.FC<IHeaderProps> = ({ openModal, isAbout }) => {
  const history = useHistory();

  return (<Container>
    <header>
      <img src={Logo} alt="GoRestaurant" />
      {
        openModal &&
        <nav>
          <div>
            <button
              type="button"
              onClick={() => {
                openModal();
              }}
            >
              <div className="text">Novo Prato</div>
              <div className="icon">
                <FiPlusSquare size={24} />
              </div>
            </button>
          </div>
          <div>
          <Link to="/about">
            <button>
              <div className="text">
                Sobre
              </div>
              <div className="icon">
                <FiChevronRight size={24} />
              </div>
              </button>
            </Link>
          </div>
        </nav>
      }
      {isAbout && 
      <nav className="goBack">
          <div>
          <button
          type="button"
          onClick={() => {
             history.goBack();  
          }}
          >
            <div className="icon">
                <FiChevronLeft size={24} />
              </div>
            <div className="text">Voltar</div>
          </button>
        </div>
      </nav>
      }

    </header>
  </Container>
  )
};
Header.defaultProps = {
  isAbout:false
}
export default Header;
