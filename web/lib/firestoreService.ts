import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  doc, 
  getDoc, 
  updateDoc, 
  getDocs,  
  serverTimestamp,
  setDoc,
  increment,
  runTransaction
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

interface EngineeringStats {
  totalScore: number;
  count: number;
  avgScore: number;
}

// Save a new score and update faculty statistics
export async function saveScore({ score, faculty }: ScoreSubmission): Promise<string> {
  try {

    const scoreRef = await addDoc(collection(db, 'scores'), {
      score,
      faculty,
      timestamp: serverTimestamp()
    });


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
    
    return 0;
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

    const scoreRef = await addDoc(collection(db, 'engineeringScores'), {
      score,
      timestamp: serverTimestamp()
    });


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
    
    return 0;
  } catch (error) {
    console.error('Error getting engineering average score:', error);
    throw error;
  }
}

export async function saveSuggestion(suggestion: string, type: 'regular' | 'engineering'): Promise<string> {
  try {
    const collectionName = type === 'regular' ? 'promptSuggestions' : 'engineeringSuggestions';
    
    // Save the suggestion to Firestore
    const suggestionRef = await addDoc(collection(db, collectionName), {
      suggestion,
      timestamp: serverTimestamp(),
      status: 'pending'
    });
    
    console.log(`${type} suggestion saved with ID: ${suggestionRef.id}`);
    return suggestionRef.id;
  } catch (error) {
    console.error(`Error saving ${type} suggestion:`, error);
    throw error;
  }
}

// Add a new function to save suggestions for any faculty type
export async function saveFacultySuggestion(
  suggestion: string, 
  faculty: 'commerce' | 'nursing' | 'health' | 'regular' | 'engineering'
): Promise<string> {
  try {
    // Map faculty to collection name
    const collectionMap = {
      regular: 'promptSuggestions',
      engineering: 'engineeringSuggestions',
      commerce: 'commerceSuggestions',
      nursing: 'nursingSuggestions',
      health: 'healthScienceSuggestions'
    };
    
    const collectionName = collectionMap[faculty];
    
    // Save the suggestion to Firestore
    const suggestionRef = await addDoc(collection(db, collectionName), {
      suggestion,
      timestamp: serverTimestamp(),
      status: 'pending'
    });
    
    console.log(`${faculty} suggestion saved with ID: ${suggestionRef.id}`);
    return suggestionRef.id;
  } catch (error) {
    console.error(`Error saving ${faculty} suggestion:`, error);
    throw error;
  }
}

// Track page view with properly encoded paths - skip results pages
export async function trackPageView(path: string) {
  try {
    if (!path) return;
    
    // Skip tracking results pages to prevent database spam
    if (path.includes('/results') || path.includes('/engineering/results')) {
      console.log(`Skipping tracking for results page: ${path}`);
      return;
    }
    
    // Encode the path to be Firestore-safe (replace / with _ and other invalid chars)
    const encodedPath = path.replace(/[/\[\].~*]/g, '_');
    const date = new Date().toISOString().split('T')[0];
    const analyticsRef = doc(db, 'analytics', 'pageviews');
    
    await runTransaction(db, async (transaction) => {
      const docSnap = await transaction.get(analyticsRef);
      
      if (!docSnap.exists()) {
        // Initialize document with minimal structure
        transaction.set(analyticsRef, {
          total: 1,
          paths: { [encodedPath]: { count: 1, path } },
          daily: { [date]: { total: 1 } },
          lastUpdated: serverTimestamp()
        });
      } else {
        const data = docSnap.data();
        
        // Update total count
        transaction.update(analyticsRef, {
          total: increment(1),
          lastUpdated: serverTimestamp()
        });
        
        // Update path-specific count
        if (data.paths && data.paths[encodedPath]) {
          transaction.update(analyticsRef, {
            [`paths.${encodedPath}.count`]: increment(1)
          });
        } else {
          transaction.update(analyticsRef, {
            [`paths.${encodedPath}`]: { count: 1, path }
          });
        }
        
        // Only update daily total, not individual paths
        if (data.daily && data.daily[date]) {
          transaction.update(analyticsRef, {
            [`daily.${date}.total`]: increment(1)
          });
        } else {
          transaction.update(analyticsRef, {
            [`daily.${date}`]: { total: 1 }
          });
        }
      }
    });
    
    console.log(`Tracked page view for: ${path}`);
  } catch (error) {
    console.error("Analytics error:", error);
  }
}

// Track unique visitors - limit fingerprint storage
export async function trackVisitor(fingerprint: string) {
  if (!fingerprint) return;
  
  try {
    const date = new Date().toISOString().split('T')[0];
    const visitorsRef = doc(db, 'analytics', 'visitors');
    
    await runTransaction(db, async (transaction) => {
      const docSnap = await transaction.get(visitorsRef);
      
      if (!docSnap.exists()) {
        // Initialize document without storing all fingerprints
        transaction.set(visitorsRef, {
          total: 1,
          daily: { [date]: { count: 1 } },
          lastUpdated: serverTimestamp()
        });
      } else {
        const data = docSnap.data();
        
        // Generate a date-specific key to limit fingerprint storage
        // Store up to 5 fingerprints per day for sampling
        const dailyKey = `fp_${date}_${Math.floor(Math.random() * 20)}`;
        
        // Update total count if it's a new visitor for the day
        if (!data.daily || !data.daily[date]) {
          transaction.update(visitorsRef, {
            total: increment(1),
            lastUpdated: serverTimestamp()
          });
          
          // Create new daily entry
          transaction.update(visitorsRef, {
            [`daily.${date}`]: { 
              count: 1,
              [dailyKey]: fingerprint.substring(0, 8) // Store truncated fingerprint as sample
            }
          });
        } else {
          // Check if we've tracked fewer than 100 visitors today
          const currentCount = data.daily[date].count || 0;
          if (currentCount < 100) {
            transaction.update(visitorsRef, {
              [`daily.${date}.count`]: increment(1)
            });
          }
        }
      }
    });
  } catch (error) {
    console.error("Visitor tracking error:", error);
  }
} 