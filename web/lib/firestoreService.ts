import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  doc, 
  getDoc, 
  updateDoc, 
  getDocs, 
  query, 
  where, 
  serverTimestamp,
  setDoc
} from 'firebase/firestore';

// Interface for score submission
interface ScoreSubmission {
  score: number;
  faculty: string;
}

// Interface for faculty statistics
interface FacultyStats {
  totalScore: number;
  count: number;
  avgScore: number;
}

// Interface for engineering score
interface EngineeringScore {
  score: number;
  timestamp: any;
}

// Interface for engineering statistics
interface EngineeringStats {
  totalScore: number;
  count: number;
  avgScore: number;
}

// Save a new score and update faculty statistics
export async function saveScore({ score, faculty }: ScoreSubmission): Promise<string> {
  try {
    // 1. Save individual score
    const scoreRef = await addDoc(collection(db, 'scores'), {
      score,
      faculty,
      timestamp: serverTimestamp()
    });

    // 2. Update faculty statistics
    await updateFacultyStats(faculty, score);
    
    return scoreRef.id;
  } catch (error) {
    console.error('Error saving score:', error);
    throw error;
  }
}

// Update faculty statistics when a new score is added
async function updateFacultyStats(faculty: string, newScore: number): Promise<void> {
  const facultyStatsRef = doc(db, 'facultyStats', faculty);
  const facultyStatsDoc = await getDoc(facultyStatsRef);
  
  if (facultyStatsDoc.exists()) {
    // Update existing faculty stats
    const stats = facultyStatsDoc.data() as FacultyStats;
    const newTotalScore = stats.totalScore + newScore;
    const newCount = stats.count + 1;
    const newAvgScore = Math.round(newTotalScore / newCount);
    
    await updateDoc(facultyStatsRef, {
      totalScore: newTotalScore,
      count: newCount,
      avgScore: newAvgScore
    });
  } else {
    // Create new faculty stats document
    await setDoc(facultyStatsRef, {
      totalScore: newScore,
      count: 1,
      avgScore: newScore
    });
  }
}

// Get average score for a specific faculty
export async function getFacultyAvgScore(faculty: string): Promise<number> {
  try {
    const facultyStatsRef = doc(db, 'facultyStats', faculty);
    const facultyStatsDoc = await getDoc(facultyStatsRef);
    
    if (facultyStatsDoc.exists()) {
      const stats = facultyStatsDoc.data() as FacultyStats;
      return stats.avgScore;
    }
    
    return 0; // Default if no scores exist for this faculty
  } catch (error) {
    console.error('Error getting faculty average score:', error);
    throw error;
  }
}

// Get all faculty statistics (updated version)
export async function getAllFacultyStats(): Promise<Record<string, any>> {
  try {
    const statsSnapshot = await getDocs(collection(db, 'facultyStats'));
    const allStats: Record<string, any> = {};
    
    statsSnapshot.forEach(doc => {
      // Convert first letter to uppercase for display
      const facultyName = doc.id.charAt(0).toUpperCase() + doc.id.slice(1);
      allStats[doc.id] = {
        ...doc.data(),
        displayName: facultyName
      };
    });
    
    return allStats;
  } catch (error) {
    console.error('Error getting all faculty stats:', error);
    throw error;
  }
}

// Get global average score
export async function getGlobalAvgScore(): Promise<number> {
  try {
    const allStats = await getAllFacultyStats();
    let totalScore = 0;
    let totalCount = 0;
    
    Object.values(allStats).forEach(stats => {
      totalScore += stats.totalScore;
      totalCount += stats.count;
    });
    
    return totalCount > 0 ? Math.round(totalScore / totalCount) : 0;
  } catch (error) {
    console.error('Error calculating global average score:', error);
    throw error;
  }
}

// Save a new engineering score and update statistics
export async function saveEngineeringScore(score: number): Promise<string> {
  try {
    // 1. Save individual score
    const scoreRef = await addDoc(collection(db, 'engineeringScores'), {
      score,
      timestamp: serverTimestamp()
    });

    // 2. Update engineering statistics
    await updateEngineeringStats(score);
    
    return scoreRef.id;
  } catch (error) {
    console.error('Error saving engineering score:', error);
    throw error;
  }
}

// Update engineering statistics when a new score is added
async function updateEngineeringStats(newScore: number): Promise<void> {
  const statsRef = doc(db, 'engineeringStats', 'overall');
  const statsDoc = await getDoc(statsRef);
  
  if (statsDoc.exists()) {
    // Update existing stats
    const stats = statsDoc.data() as EngineeringStats;
    const newTotalScore = stats.totalScore + newScore;
    const newCount = stats.count + 1;
    const newAvgScore = Math.round(newTotalScore / newCount);
    
    await updateDoc(statsRef, {
      totalScore: newTotalScore,
      count: newCount,
      avgScore: newAvgScore
    });
  } else {
    // Create new stats document
    await setDoc(statsRef, {
      totalScore: newScore,
      count: 1,
      avgScore: newScore
    });
  }
}

// Get average score for engineering
export async function getEngineeringAvgScore(): Promise<number> {
  try {
    const statsRef = doc(db, 'engineeringStats', 'overall');
    const statsDoc = await getDoc(statsRef);
    
    if (statsDoc.exists()) {
      const stats = statsDoc.data() as EngineeringStats;
      return stats.avgScore;
    }
    
    return 0; // Default if no scores exist
  } catch (error) {
    console.error('Error getting engineering average score:', error);
    throw error;
  }
} 