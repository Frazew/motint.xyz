import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const AboutModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="À propos" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Basé sur une implémentation open source en React d'un certain jeu racheté par le NYT (on les déteste), avec pas mal de petites modifs.
        Déployé chez Scaleway avec Terraform -{' '}
        <a
          href="https://github.com/Frazew/motint.xyz"
          className="underline font-bold"
        >
          le code est dispo ici
        </a>{' '}
      </p>
    </BaseModal>
  )
}
