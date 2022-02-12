import { getGuessStatuses } from './statuses'
import { solutionIndex } from './words'
import { GAME_TITLE } from '../constants/strings'

export const shareStatus = async (
  guesses: string[],
  lost: boolean,
  isHardMode: boolean
) => {
  const shareText = `${GAME_TITLE} ${solutionIndex} ${lost ? 'X' : guesses.length}/6\n\n` + generateEmojiGrid(guesses)
  if (navigator.share) {
    try {
      await navigator.share({
        title: "MotINT",
        url: "https://motint.xyz",
        text: shareText
      })
    } catch (error) {
      console.log(error)
    }
  }
  navigator.clipboard.writeText(shareText)
}

export const generateEmojiGrid = (guesses: string[]) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(guess)
      return guess
        .split('')
        .map((_, i) => {
          switch (status[i]) {
            case 'correct':
              return '🟥'
            case 'present':
              return '🟨'
            default:
              return '🟦'
          }
        })
        .join('')
    })
    .join('\n')
}
