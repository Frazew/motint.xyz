import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'
import {
  max_challenges,
  word_length
} from '../../lib/words'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="Comment jouer" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Honnêtement c'est pas compliqué: il faut deviner un mot de {word_length} lettres en {max_challenges} essais ou moins.
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        La couleur de la lettre après validation donne un peu plus d'informations sur le mot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="S" status="correct" />
        <Cell value="A" />
        <Cell value="L" />
        <Cell value="U" />
        <Cell value="T" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        La lettre S est bien dans le mot, et au bon endroit.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="R" />
        <Cell value="O" />
        <Cell value="U" status="present" />
        <Cell value="G" />
        <Cell value="E" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        La lettre U est bien dans le mot, mais pas à cet endroit là.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="V" />
        <Cell value="A" />
        <Cell value="G" />
        <Cell value="U" />
        <Cell value="E" status="absent" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        La lettre E n'est pas du tout présente dans le mot.
      </p>
    </BaseModal>
  )
}
