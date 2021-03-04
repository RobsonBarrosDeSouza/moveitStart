import {  useContext } from 'react';
import { CountdownContex } from '../contexts/CountdownContex';
import styles from '../styles/components/Countdown.module.css';



export function Countdown() {
    const { minutes, 
        seconds, 
        hasFinished, 
        isActive, 
        startCountdown, 
        resetCountdown
    } = useContext(CountdownContex) 
    
    
    const [minuteLef, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondsteLef, secondsRight] = String(seconds).padStart(2, '0').split('');


    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLef}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondsteLef}</span>
                    <span>{secondsRight}</span>
                </div>
            </div>

            { hasFinished ? (
                 <button 
                    disabled
                    className={styles.countdownButton}  
              >
                  Ciclo encerrado 
             </button>    
            ) : (
                <>
                    
            { isActive ? (
             <button 
                type="button"
                className={ `${styles.countdownButton} ${styles.countdownButtonActive} ` }
                onClick={resetCountdown}
             >
                 Abandonar ciclo
            </button>    
         ) : (
             <button
                type="button"
                className={styles.countdownButton}
                onClick={startCountdown}
             >
                Iniciar um cicloar 
            </button>
            )}
                </>
            )}

            
        </div>
    );
}