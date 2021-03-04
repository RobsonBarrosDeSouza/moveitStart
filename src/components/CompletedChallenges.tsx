import { useContext } from 'react';
import { ChallengContext } from '../contexts/ChallengeContex';
import styles from '../styles/components/CompletedChallenges.module.css';

export function CompletedChallenges() {
    const { challengesCompleted } = useContext(ChallengContext);

    return(
        <div className={styles.completedChallengesContainer}> 
            <span>Desafios completos</span>
            <span>{ challengesCompleted }</span> 
        </div>
    );
}