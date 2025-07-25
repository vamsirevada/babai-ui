import {useLocation} from 'react-router-dom'
import {useEffect} from 'react'

const NotFound = () => {
		const location = useLocation()

		useEffect(() => {
				console.error(
						'404 Error: User attempted to access non-existent route:',
						location.pathname
				)
		}, [location.pathname])

		return (
				<div className="min-h-screen flex items-center justify-center bg-background">
						<div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md">
								<h1 className="text-6xl font-extrabold text-primary mb-4">404</h1>
								<p className="text-lg text-muted-foreground mb-6">
										Sorry, the page <span className="font-mono">{location.pathname}</span> does not exist.
								</p>
								<a
										href="/"
										className="inline-block px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition"
								>
										Go to Home
								</a>
						</div>
				</div>
		)
}

export default NotFound