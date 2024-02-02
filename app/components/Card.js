import { useEffect, useRef } from 'react'

const Card = ({ children, link }) => {
  const cardRef = useRef()

  useEffect(() => {
    const cardRefCurrent = cardRef.current

    const handleClick = () => {
      window.open(link, '_blank')
    }

    cardRefCurrent.addEventListener('click', handleClick)
    return () => cardRefCurrent.removeEventListener('click', handleClick)
  }, [link])

  return (
    <div ref={cardRef} className='rounded-xl px-6 lg:px-12 py-3 lg:py-6 hover:bg-cyan-900/10 hover:transition cursor-pointer group'>
      {children}
    </div>
  );
}

export default Card;