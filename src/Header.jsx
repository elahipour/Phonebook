import styles from "./assets/Header.module.css";

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <h1>PhoneBook</h1>
        <p>
          <span>Blue PhoneBook</span> | <span>Reactjs</span>
        </p>
      </div>
    </div>
  );
}

export default Header;
