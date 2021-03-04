import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../Challenges.json';  

import { LevelUpModal } from '../components/levelUpModal';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContexData {
     level: number;
     currentExperience: number;
     challengesCompleted: number;
     activeChallenge:Challenge;
     expirenceToNextLevel:number
     leveUp: () => void;
     startNewChallenge: () => void;
     resetChallenge: () => void;
     completeChallenge: () => void;
     closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
    level:number;
    currentExperience: number;
    challengesCompleted: number;
      
}

export const ChallengContext = createContext({} as ChallengesContexData);

export function ChallengesProvider({ 
     children,
        ...rest
    }: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperince] = useState(rest.currentExperience ??0);
    const [ challengesCompleted, setChallegesCompleted] = useState(rest.challengesCompleted ??0);

    const [activeChallenge, setActiveChallenge] = useState(null)
    const [ isLevelUpModalOpen, setIsLevelUpModalOpen ] = useState(false)

    const expirenceToNextLevel = Math.pow((level + 1 )* 4, 2)

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    }, [level, currentExperience, challengesCompleted]);

    function leveUp() {
      setLevel(level + 1);
      setIsLevelUpModalOpen(true);
    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false);
    }

    function startNewChallenge() {
       const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
       const challenge = challenges[randomChallengeIndex];

       setActiveChallenge(challenge)

       new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if ( finalExperience >= expirenceToNextLevel) {
            finalExperience = finalExperience - expirenceToNextLevel;
            leveUp(); 
        }

        setCurrentExperince(finalExperience);
        setActiveChallenge(null);
        setChallegesCompleted(challengesCompleted + 1);
    }

    return (
        <ChallengContext.Provider 
        value={{
             level,
             currentExperience,
             challengesCompleted, 
             leveUp,
             startNewChallenge, 
             activeChallenge,
             resetChallenge,
             expirenceToNextLevel,
             completeChallenge,
             closeLevelUpModal,
             }}
             >
            { children }

            { isLevelUpModalOpen && <LevelUpModal />}
        </ChallengContext.Provider>
    );
}
