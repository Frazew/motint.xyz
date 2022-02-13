import { word_length } from '../../lib/words'
import { Cell } from './Cell'

export const EmptyRow = () => {
  const emptyCells = Array.from(Array(word_length))

  return (
    <div className="flex justify-center mb-1">
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
