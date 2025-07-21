import { Link } from 'react-router-dom'

const PrefetchLink = ({ prefetch, to, ...props }) => {
  const handleMouseEnter = () => {
    if (prefetch) {
      prefetch()
    }
  }

  return <Link to={to} onMouseEnter={handleMouseEnter} {...props} />
}

export default PrefetchLink
