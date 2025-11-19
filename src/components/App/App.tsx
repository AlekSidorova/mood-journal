import React from "react";
import MoodForm from "../../pages/MoodForm/MoodForm";
import styles from "./App.module.css";

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <div className={styles.moodBackground}>
        <MoodForm />
      </div>
    </div>
  );
};

export default App;