// Duplicate Detection Service using similarity algorithms
class DuplicateDetectionService {
  // Calculate Levenshtein distance between two strings
  static levenshteinDistance(str1, str2) {
    const track = Array(str2.length + 1).fill(null).map(() =>
      Array(str1.length + 1).fill(null));
    
    for (let i = 0; i <= str1.length; i += 1) {
      track[0][i] = i;
    }
    for (let j = 0; j <= str2.length; j += 1) {
      track[j][0] = j;
    }
    for (let j = 1; j <= str2.length; j += 1) {
      for (let i = 1; i <= str1.length; i += 1) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        track[j][i] = Math.min(
          track[j][i - 1] + 1, // deletion
          track[j - 1][i] + 1, // insertion
          track[j - 1][i - 1] + indicator, // substitution
        );
      }
    }
    return track[str2.length][str1.length];
  }

  // Calculate similarity percentage between two strings
  static stringSimilarity(str1, str2) {
    if (!str1 || !str2) return 0;
    
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const editDistance = this.levenshteinDistance(longer.toLowerCase(), shorter.toLowerCase());
    return ((longer.length - editDistance) / longer.length) * 100;
  }

  // Check if two dates are within a specific range (days)
  static datesAreSimilar(date1, date2, dayRange = 7) {
    if (!date1 || !date2) return false;
    
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2 - d1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays <= dayRange;
  }

  // Extract keywords from text
  static extractKeywords(text) {
    if (!text) return [];
    
    // Remove common words and extract meaningful keywords
    const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'is', 'was', 'are', 'been'];
    const words = text.toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .split(/\s+/)
      .filter(word => word.length > 2 && !stopWords.includes(word));
    
    return [...new Set(words)];
  }

  // Calculate keyword overlap percentage
  static keywordOverlap(text1, text2) {
    const keywords1 = this.extractKeywords(text1);
    const keywords2 = this.extractKeywords(text2);
    
    if (keywords1.length === 0 || keywords2.length === 0) return 0;
    
    const overlap = keywords1.filter(k => keywords2.includes(k));
    const totalKeywords = new Set([...keywords1, ...keywords2]).size;
    
    return (overlap.length / totalKeywords) * 100;
  }

  // Main duplicate detection function
  static detectDuplicates(newItem, existingItems) {
    const duplicates = [];
    
    existingItems.forEach(existingItem => {
      // Skip if same item ID or different status (lost vs found)
      if (existingItem.id === newItem.id || existingItem.status !== newItem.status) {
        return;
      }

      let similarityScore = 0;
      const factors = [];

      // Check name similarity (30% weight)
      const nameSimilarity = this.stringSimilarity(newItem.name, existingItem.name);
      if (nameSimilarity > 70) {
        similarityScore += nameSimilarity * 0.3;
        factors.push(`Name match: ${Math.round(nameSimilarity)}%`);
      }

      // Check category match (20% weight)
      if (newItem.category === existingItem.category && newItem.category) {
        similarityScore += 20;
        factors.push('Same category');
      }

      // Check location similarity (20% weight)
      const locationSimilarity = this.stringSimilarity(newItem.location, existingItem.location);
      if (locationSimilarity > 60) {
        similarityScore += locationSimilarity * 0.2;
        factors.push(`Location match: ${Math.round(locationSimilarity)}%`);
      }

      // Check date proximity (10% weight)
      if (this.datesAreSimilar(newItem.date, existingItem.date, 3)) {
        similarityScore += 10;
        factors.push('Similar date (within 3 days)');
      }

      // Check description similarity (20% weight)
      const descKeywordOverlap = this.keywordOverlap(newItem.description, existingItem.description);
      if (descKeywordOverlap > 40) {
        similarityScore += descKeywordOverlap * 0.2;
        factors.push(`Description keywords: ${Math.round(descKeywordOverlap)}%`);
      }

      // If similarity score is above threshold, mark as potential duplicate
      if (similarityScore >= 60) {
        duplicates.push({
          item: existingItem,
          score: Math.round(similarityScore),
          factors: factors,
          confidence: similarityScore >= 80 ? 'high' : similarityScore >= 70 ? 'medium' : 'low'
        });
      }
    });

    // Sort by similarity score descending
    duplicates.sort((a, b) => b.score - a.score);
    
    return duplicates;
  }

  // Check a single item against database
  static async checkForDuplicate(item) {
    // Get items from localStorage or your database
    const storedItems = JSON.parse(localStorage.getItem('lostAndFoundItems') || '[]');
    
    const duplicates = this.detectDuplicates(item, storedItems);
    
    return {
      hasDuplicates: duplicates.length > 0,
      duplicates: duplicates,
      topMatch: duplicates[0] || null
    };
  }

  // Merge duplicate items
  static mergeDuplicates(item1, item2) {
    // Combine information from both items
    return {
      ...item1,
      description: `${item1.description}\n\n[Merged from duplicate post]: ${item2.description}`,
      mergedFrom: [item1.id, item2.id],
      mergedAt: new Date().toISOString()
    };
  }
}

export default DuplicateDetectionService;
