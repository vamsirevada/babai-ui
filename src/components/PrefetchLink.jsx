import {Link} from 'react-router-dom'
import {prefetch} from '../App.jsx'

const PrefetchLink = ({to, prefetch: prefetchKey, ...props}) => {
		const handleMouseEnter = () => {
				if (prefetchKey && prefetch[prefetchKey]) {
						prefetch[prefetchKey]()
				}
		}

		return <Link to={to} onMouseEnter={handleMouseEnter} {...props} />
}

export default PrefetchLink
