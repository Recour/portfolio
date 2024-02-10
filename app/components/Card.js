import { useEffect, useRef } from 'react'

const Card = ({ children, link }) => {
  return (
    <a 
      href={link}
      target='_blank'
      rel='noreferrer noopener'
    >
      <div className='rounded-xl lg:px-6 lg:py-6 lg:hover:bg-cyan-900/10 lg:hover:shadow-xl transition-all cursor-pointer group'>
        {children}
      </div>
    </a>
  );
}

export default Card;