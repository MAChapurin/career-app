import styles from './skeleton.module.css'

const Skeleton = (props) => {
  const {
    className = '',
    width,
    height,
    radius,
    mb
  } = props

  const style = {
    width,
    height,
    borderRadius: radius,
    marginBottom: mb
  }

  return (
    <div style={style} className={`${styles.skeleton} ${className ?? ''}`}></div>
  )
}

export default Skeleton