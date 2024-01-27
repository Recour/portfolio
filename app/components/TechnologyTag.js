import styles from '../page.module.css'

const TechnologyTag = ({ technology }) => {
  return (
    <div className={styles.technology_tag}>{technology}</div>
  );
};

export default TechnologyTag;