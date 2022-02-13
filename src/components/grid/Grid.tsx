import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import { EmptyRow } from './EmptyRow'
import { max_challenges } from '../../lib/words'

type Props = {
  guesses: string[]
  currentGuess: string
  isRevealing?: boolean
}

export const Grid = ({ guesses, currentGuess, isRevealing }: Props) => {
  const empties =
    guesses.length < max_challenges - 1
      ? Array.from(Array(max_challenges - 1 - guesses.length))
      : []

  return (
    <div className="pb-6">
      {guesses.map((guess, i) => (
        <CompletedRow
          key={i}
          guess={guess}
          isRevealing={isRevealing && guesses.length - 1 === i}
        />
      ))}
      {guesses.length < max_challenges && <CurrentRow guess={currentGuess} />}
      {empties.map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </div>
  )
}
