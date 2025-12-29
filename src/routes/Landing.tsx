import { createFileRoute } from '@tanstack/react-router'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { motion } from 'motion/react'
import { IoArrowForward } from 'react-icons/io5'

export const Route = createFileRoute('/Landing')({
  component: Landing,
})

function Landing() {
  const navigate = useNavigate()
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, type: 'spring' as const, stiffness: 260, damping: 18 },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 text-gray-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-10 -left-20 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-32 -right-32 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
        />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative border-b border-gray-200/50 backdrop-blur-xl bg-white/40"
      >
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-black bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 bg-clip-text text-transparent cursor-pointer"
          >
            MenuMaker
          </motion.div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#f3f4f6' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate({ to: '/Login' })}
              className="px-6 py-2.5 text-sm font-semibold text-gray-700 hover:text-gray-900 rounded-lg transition duration-200"
            >
              Sign In
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(37, 99, 235, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate({ to: '/Signup' })}
              className="px-6 py-2.5 text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-lg shadow-blue-500/30"
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="relative max-w-6xl mx-auto px-6 py-28">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center "
        >
          {/* Left Content */}
          <motion.div variants={containerVariants} >
            <motion.h1
              variants={itemVariants}
              className="text-6xl lg:text-7xl font-black mb-8 text-gray-900 leading-tight"
            >
              Create Beautiful
              <span className="block bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 bg-clip-text text-transparent py-4"> Digital Menus</span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 mb-10 leading-relaxed font-medium"
            >
              Fast, elegant menu solutions for modern restaurants. Launch in minutes, not weeks.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex gap-4 flex-wrap"
            >
              <motion.button
                whileHover={{ scale: 1.06, boxShadow: '0 20px 40px rgba(37, 99, 235, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate({ to: '/Signup' })}
                className="px-8 py-4 text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/40 hover:shadow-xl inline-flex items-center gap-2 group"
              >
                Start Free
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <IoArrowForward size={20} />
                </motion.div>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.06, backgroundColor: '#f3f4f6', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 text-lg font-bold border-2 border-blue-600 text-blue-600 rounded-xl transition duration-300 hover:bg-blue-50"
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right - Animated Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 rounded-3xl blur-3xl"
            />
            <motion.div
              whileHover={{ y: -10 }}
              className="relative bg-gradient-to-br from-white via-blue-50/50 to-white rounded-3xl shadow-2xl shadow-blue-200/50 p-8 border border-blue-200/50 hover:shadow-2xl hover:shadow-blue-300/60 transition duration-500"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                <motion.div
                  animate={{ width: ['50%', '70%', '50%'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="h-4 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                />
                <motion.div
                  animate={{ width: ['80%', '60%', '80%'] }}
                  transition={{ duration: 3.5, repeat: Infinity, delay: 0.2 }}
                  className="h-3 bg-gray-300 rounded-full"
                />
                <motion.div
                  animate={{ width: ['70%', '85%', '70%'] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 0.4 }}
                  className="h-3 bg-gray-300 rounded-full"
                />
                <motion.div className="pt-8 space-y-4">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="flex justify-between items-center"
                    >
                      <motion.div
                        animate={{ width: [`${40 + i * 10}%`, `${50 + i * 10}%`, `${40 + i * 10}%`] }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                        className="h-3 bg-gray-300 rounded-full"
                      />
                      <motion.div
                        animate={{ backgroundColor: ['#2563eb', '#1d4ed8', '#2563eb'] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="h-3 w-12 rounded-full bg-blue-600"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative bg-gradient-to-b from-transparent via-white/50 to-transparent border-t border-gray-200/50">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-black text-center mb-4">Why MenuMaker?</h2>
            <p className="text-center text-gray-600 text-lg mb-20 font-medium">Powerful features designed for modern restaurants</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { icon: '✨', title: 'Beautiful Design', description: 'Professional templates that make your menu shine' },
              { icon: '⚡', title: 'Lightning Fast', description: 'Real-time updates across all your menus' },
              { icon: '📱', title: 'Mobile Friendly', description: 'Perfect on phones, tablets, and desktops' },
              { icon: '🔒', title: 'Secure', description: 'Enterprise-grade security for your data' },
              { icon: '📊', title: 'Analytics', description: 'Track customer engagement and preferences' },
              { icon: '🎯', title: 'Easy Sharing', description: 'QR codes and direct links for instant access' },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
                onMouseEnter={() => setHoveredFeature(idx)}
                onMouseLeave={() => setHoveredFeature(null)}
                whileHover={{ y: -8 }}
                className={`p-8 border rounded-2xl cursor-pointer transition duration-500 group ${
                  hoveredFeature === idx
                    ? 'bg-gradient-to-br from-blue-50 via-blue-100/50 to-blue-50 border-blue-400 shadow-2xl shadow-blue-300/40'
                    : 'bg-white/70 border-gray-200/50 shadow-lg shadow-gray-200/20 hover:border-blue-300'
                }`}
              >
                <motion.div
                  animate={{
                    scale: hoveredFeature === idx ? 1.2 : 1,
                    rotate: hoveredFeature === idx ? 10 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-5xl mb-4 inline-block"
                >
                  {feature.icon}
                </motion.div>
                <h3 className={`text-2xl font-bold mb-3 transition duration-300 ${hoveredFeature === idx ? 'text-blue-600' : 'text-gray-900'}`}>
                  {feature.title}
                </h3>
                <p className={`transition duration-300 leading-relaxed ${hoveredFeature === idx ? 'text-gray-700' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredFeature === idx ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 h-1 bg-gradient-to-r from-blue-600 to-blue-400 origin-left"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative max-w-6xl mx-auto px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            animate={{
              y: [0, -20, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-blue-700/10 rounded-3xl blur-2xl"
          />
          <div className="relative">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-5xl font-black mb-6"
            >
              Ready to get started?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 mb-12 font-medium"
            >
              Join thousands of restaurants already using MenuMaker
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.button
                whileHover={{ scale: 1.08, boxShadow: '0 25px 50px rgba(37, 99, 235, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate({ to: '/Signup' })}
                className="px-12 py-5 text-xl font-bold bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 text-white rounded-xl shadow-2xl shadow-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/60 inline-flex items-center gap-3 group"
              >
                Create Your Menu Today
                <motion.div
                  animate={{ x: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <IoArrowForward size={24} />
                </motion.div>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="border-t border-gray-200/50 bg-gradient-to-b from-white/50 to-slate-50 py-12 px-6"
      >
        <div className="max-w-6xl mx-auto text-center text-gray-600 font-medium">
          <p>&copy; 2025 MenuMaker. All rights reserved.</p>
        </div>
      </motion.footer>
    </div>
  )
}
