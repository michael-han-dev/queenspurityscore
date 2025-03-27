import { db } from './firebase';
import { collection, addDoc, query, where, getDocs, orderBy, limit } from 'firebase/firestore';

interface ScoreData {
  score: number;
  faculty: string;
}

/**
 * Submit a user's test score with faculty information
 */
export async function submitScore(scoreData: ScoreData): Promise<void> {
  try {
    await addDoc(collection(db, 'scores'), {
      ...scoreData,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Error submitting score:', error);
    throw error;
  }
}

/**
 * Submit a prompt suggestion
 */
export async function submitSuggestion(suggestionText: string): Promise<void> {
  try {
    await addDoc(collection(db, 'suggestions'), {
      text: suggestionText,
      timestamp: new Date(),
      reviewed: false
    });
  } catch (error) {
    console.error('Error submitting suggestion:', error);
    throw error;
  }
}

/**
 * Get analytics for scores, optionally filtered by faculty
 */
export async function getScoreAnalytics(faculty?: string) {
  try {
    const scoresRef = collection(db, 'scores');
    let scoreQuery;
    
    if (faculty) {
      scoreQuery = query(scoresRef, where('faculty', '==', faculty));
    } else {
      scoreQuery = query(scoresRef);
    }
    
    const querySnapshot = await getDocs(scoreQuery);
    const scores: number[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.score !== undefined) {
        scores.push(data.score);
      }
    });
    
    if (scores.length === 0) {
      return {
        average: null,
        lowest: null,
        total: 0
      };
    }
    
    const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    const lowest = Math.min(...scores);
    
    return {
      average: Math.round(average * 100) / 100,
      lowest,
      total: scores.length
    };
  } catch (error) {
    console.error('Error getting score analytics:', error);
    throw error;
  }
} 