import styles from "./card.module.scss";

export default function Card(
  props
  ) {
  return (
    <div className={styles.card} style={{ backgroundImage: `url( ${props.image} )` }} key={props.id}>
      <span>{props.name}</span>
    </div>
  );
}
