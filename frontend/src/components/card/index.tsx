import classNames from 'classnames'
import styles from './index.module.scss'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = ({ className, ...props }: CardProps) => {
  return <div className={classNames(styles.card, className)} {...props} />
}

export default Card
