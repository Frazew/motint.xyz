import { word_length } from '../../lib/words'
import { Cell } from './Cell'

type Props = {
  guess: string
}

export const CurrentRow = ({ guess }: Props) => {
  const splitGuess = guess.split('')
  const emptyCells = Array.from(Array(word_length - splitGuess.length))

  return (
    <div className="flex justify-center mb-1">
      {splitGuess.map((letter, i) => (
        <Cell key={i} value={letter} />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
