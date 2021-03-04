import { useContext } from 'react';
import { ChallengContext } from '../contexts/ChallengeContex';

import styles from '../styles/components/Profile.module.css';

export function Profile() {
    const {level} = useContext(ChallengContext);

    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/Robsonhx.png" alt="Robson Barros"/>
            <div>
                <strong>Robson Barros</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level {level}

                </p>
            </div>
        </div>
    );
}