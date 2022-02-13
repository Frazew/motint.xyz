import { WORDS } from '../constants/wordlist'
import { VALID_GUESSES } from '../constants/validGuesses'
import { getGuessStatuses } from './statuses'

export const isWordInWordList = (word: string, length: number) => {
  const guess_length = word.toLowerCase().length
  return (
    WORDS[length - 3].includes(word.toLowerCase()) ||
    VALID_GUESSES.includes(word.toLowerCase()) ||
    (word.toLowerCase().substring(guess_length - 1) === "s" && VALID_GUESSES.includes(word.toLowerCase().substring(0, guess_length - 1)))
  )
}

export const isWinningWord = (word: string) => {
  return solution === word
}

// build a set of previously revealed letters - present and correct
// guess must use correct letters in that space and any other revealed letters
export const findFirstUnusedReveal = (word: string, guesses: string[]) => {
  const knownLetterSet = new Set<string>()
  for (const guess of guesses) {
    const statuses = getGuessStatuses(guess)

    for (let i = 0; i < guess.length; i++) {
      if (statuses[i] === 'correct' || statuses[i] === 'present') {
        knownLetterSet.add(guess[i])
      }
      if (statuses[i] === 'correct' && word[i] !== guess[i]) {
        return `Must use ${guess[i]} in position ${i + 1}`
      }
    }
  }

  for (const letter of Array.from(knownLetterSet.values())) {
    // fail fast, always return first failed letter if applicable
    if (!word.includes(letter)) {
      return `Guess must contain ${letter}`
    }
  }
  return false
}

export const getWordOfDay = () => {
  const epochMs = new Date('February 13, 2022 00:00:00').valueOf()
  const now = Date.now()
  const msInDay = 86400000 / 4
  const index = Math.floor((now - epochMs) / msInDay)
  const nextday = (index + 1) * msInDay + epochMs
  const lengthIndex = (Math.floor((now - epochMs) / msInDay) * 2) % WORDS.length

  return {
    solution: WORDS[lengthIndex][index % WORDS[lengthIndex].length].toUpperCase(),
    solutionIndex: index,
    tomorrow: nextday,
    word_length: 3 + lengthIndex,
    max_challenges: Math.min(3 + lengthIndex + 1, 8)
  }
}

export const { solution, solutionIndex, tomorrow, word_length, max_challenges } = getWordOfDay()
