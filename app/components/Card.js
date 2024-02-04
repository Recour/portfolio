import { useEffect, useRef } from 'react'

const Card = ({ children, link }) => {
  return (
    <a 
      href={link}
      target='_blank'
      rel='noreferrer noopener'
    >
      <div className='rounded-xl px-6 lg:px-12 py-3 lg:py-6 hover:bg-cyan-900/10 hover:shadow-xl transition-all cursor-pointer group'>
        {children}
      </div>
    </a>
  );
}

export default Card;