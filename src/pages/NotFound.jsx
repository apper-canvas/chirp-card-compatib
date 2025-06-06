import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900 flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center"
        >
          <ApperIcon name="MessageCircle" className="text-white" size={64} />
        </motion.div>
        
        <h1 className="text-6xl font-bold text-surface-900 dark:text-surface-100 mb-4">
          404
        </h1>
        <p className="text-xl text-surface-600 dark:text-surface-400 mb-8">
          This chirp flew away!
        </p>
        <p className="text-surface-500 dark:text-surface-500 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist. Maybe it got lost in the timeline?
        </p>
        
        <Link 
          to="/"
          className="inline-flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200"
        >
          <ApperIcon name="Home" size={18} />
          <span>Back to Home</span>
        </Link>
      </motion.div>
    </div>
  )
}

export default NotFound