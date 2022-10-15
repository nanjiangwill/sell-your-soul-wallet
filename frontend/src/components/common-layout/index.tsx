import classNames from 'classnames'
import styles from './index.module.scss'

export interface CommonLayoutProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const CommonLayout = ({ className, children, ...props }: CommonLayoutProps) => {
  return (
    <div className={classNames(styles.layout, className)} {...props}>
      <div className={styles.header}>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default CommonLayout