import { CharStatus } from '../../lib/statuses'
import classnames from 'classnames'
import { REVEAL_TIME_MS } from '../../constants/settings'

type Props = {
  value?: string
  status?: CharStatus
  isRevealing?: boolean
  isCompleted?: boolean
  position?: number
}

export const Cell = ({
  value,
  status,
  isRevealing,
  isCompleted,
  position = 0,
}: Props) => {
  const isFilled = value && !isCompleted
  const shouldReveal = isRevealing && isCompleted
  const animationDelay = `${position * REVEAL_TIME_MS}ms`

  const classes = classnames(
    'w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-4xl font-bold rounded dark:text-white z-0',
    {
      'bg-white dark:bg-sky-900 border-sky-200 dark:border-sky-600':
        !status,
      'border-black dark:border-sky-100': value && !status,
      'absent shadowed bg-sky-400 dark:bg-sky-700 text-white border-sky-400 dark:border-sky-700':
        status === 'absent',
      'correct shadowed bg-rose-500 text-white border-rose-500':
        status === 'correct',
      'present shadowed bg-sky-400 dark:bg-sky-700 text-white border-sky-400 dark:border-sky-700 text-white':
        status === 'present',
      'cell-fill-animation': isFilled,
      'cell-reveal': shouldReveal,
    }
  )

  const shouldDisplayDot = status === 'present'
  const dotClasses = classnames(
    'rounded-full bg-yellow-500 h-12 w-12 absolute -z-10 ease-in-out',
    {
      'dot-reveal-animation': shouldDisplayDot && shouldReveal,
      'invisible': !shouldDisplayDot
    }
  )

  return (
    <div className={classes} style={{ animationDelay }}>
      <div className={ dotClasses } style={{ animationDelay }}></div>
      <div className="letter-container" style={{ animationDelay }}>
        {value}
      </div>
    </div>
  )
}
