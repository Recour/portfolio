import styles from '../page.module.css'

const TechnologyTag = ({ technology }) => {
  return (
    <div className="rounded-full bg-cyan-400/10 text-cyan-300 text-xs font-medium px-3 py-1">{technology}</div>
  );
};

export default TechnologyTag;