import classNames from 'classnames'
import styles from './index.module.scss'

export interface ButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary' | 'special'
  size?: 'large' | 'medium' | 'small'
}

const Button = ({
  variant = 'primary',
  size = 'large',
  className,
  ...props
}: ButtonProps) => {
  return (
    <div
      className={classNames(
        styles.button,
        {
          [styles.primary]: variant === 'primary',
          [styles.secondary]: variant === 'secondary',
          [styles.special]: variant === 'special',
          [styles.large]: size === 'large',
          [styles.medium]: size === 'medium',
          [styles.small]: size === 'small',
        },
        className,
      )}
      {...props}
    />
  )
}

export default Button