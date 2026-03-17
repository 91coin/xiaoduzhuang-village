import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { MapPin, Heart, Users, Sun, Moon, Star, ArrowDown, Menu, X, ChevronRight, Leaf, Home, BookOpen, Utensils, TrendingUp } from 'lucide-react'

// 导航栏组件
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: '首页', href: '#home' },
    { name: '历史', href: '#history' },
    { name: '风情', href: '#culture' },
    { name: '美食', href: '#food' },
    { name: '发展', href: '#future' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="text-2xl font-bold text-gradient"
            whileHover={{ scale: 1.05 }}
          >
            小杜庄
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, i) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-soil-dark hover:text-brick-red transition-colors font-medium"
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-soil-dark"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-6 py-4 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-soil-dark hover:text-brick-red"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

// 英雄区组件
function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 200])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero">
      {/* 装饰背景 */}
      <div className="absolute inset-0 decoration-grain opacity-50" />
      
      {/* 浮动元素 */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-wheat-gold rounded-full"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}

      <motion.div 
        className="relative z-10 text-center px-6"
        style={{ y, opacity }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <MapPin className="text-brick-red" size={24} />
            <span className="text-earth-brown font-medium">河南省西华县逍遥镇</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold mb-6"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <span className="text-gradient">小杜庄村</span>
        </motion.h1>

        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-earth-brown mb-8 max-w-2xl mx-auto"
        >
          千年古镇 · 淳朴乡风 · 振兴之路
        </motion.p>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <a href="#history" className="btn-primary inline-flex items-center">
            探索村庄 <ChevronRight size={20} className="ml-2" />
          </a>
          <a
            href="#culture"
            className="px-8 py-3 rounded-full border-2 border-earth-brown text-earth-brown font-medium hover:bg-earth-brown hover:text-white transition-all"
          >
            风土人情
          </a>
        </motion.div>
      </motion.div>

      {/* 滚动提示 */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <ArrowDown className="text-earth-brown" size={32} />
      </motion.div>
    </section>
  )
}

// 历史区块
function History() {
  const features = [
    { icon: BookOpen, title: '千年渊源', desc: '源自古代杜姓聚居，历史悠久，文化底蕴深厚' },
    { icon: MapPin, title: '逍遥镇辖', desc: '隶属闻名遐迩的逍遥镇，共享千年古镇文化' },
    { icon: Users, title: '淳朴民风', desc: '世代农耕，邻里和睦，传承中原传统美德' },
  ]

  return (
    <section id="history" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            <span className="text-gradient">历史渊源</span>
          </h2>
          <p className="text-earth-brown text-lg">千年传承 · 文化积淀</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="card card-hover p-8 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full gradient-wheat flex items-center justify-center">
                <feature.icon className="text-soil-dark" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-soil-dark">{feature.title}</h3>
              <p className="text-earth-brown">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* 时间线 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-wheat-gold to-brick-red" />
            
            {[
              { era: '古代', event: '杜姓先祖定居于此，形成村落' },
              { era: '明清', event: '纳入逍遥镇管辖，商贸繁荣' },
              { era: '近代', event: '传承农耕文化，民风淳朴' },
              { era: '现代', event: '乡村振兴，迈向新征程' },
            ].map((item, i) => (
              <motion.div
                key={item.era}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className={`relative flex items-center mb-8 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`w-1/2 ${i % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                  <h4 className="text-2xl font-bold text-brick-red mb-2">{item.era}</h4>
                  <p className="text-earth-brown">{item.event}</p>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-wheat-gold rounded-full border-4 border-white shadow-lg" />
                <div className="w-1/2" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// 风情区块
function Culture() {
  const activities = [
    { title: '传统农耕', desc: '世代传承的农耕文化，春种秋收', icon: Leaf },
    { title: '节庆活动', desc: '春节、元宵、中秋等传统节庆', icon: Star },
    { title: '邻里互助', desc: '守望相助，淳朴乡情', icon: Heart },
    { title: '乡村生活', desc: '日出而作，日落而息', icon: Sun },
  ]

  return (
    <section id="culture" className="py-24 gradient-hero">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            <span className="text-gradient">风土人情</span>
          </h2>
          <p className="text-earth-brown text-lg">淳朴乡风 · 温暖家园</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="card card-hover p-6 text-center cursor-pointer"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full gradient-earth flex items-center justify-center">
                <item.icon className="text-white" size={28} />
              </div>
              <h3 className="text-lg font-bold mb-2 text-soil-dark">{item.title}</h3>
              <p className="text-earth-brown text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* 乡村生活展示 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 card p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4 text-soil-dark" style={{ fontFamily: 'var(--font-display)' }}>
                田园诗意生活
              </h3>
              <p className="text-earth-brown mb-6 leading-relaxed">
                小杜庄村保持着传统的乡村生活方式。清晨，鸡鸣犬吠唤醒村庄；
                白日，田间地头忙碌的身影；傍晚，炊烟袅袅，家人团聚。
                这里没有城市的喧嚣，只有宁静与祥和。
              </p>
              <div className="flex flex-wrap gap-3">
                {['宁静', '淳朴', '和谐', '自然'].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-full bg-wheat-light/30 text-earth-brown text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden gradient-wheat flex items-center justify-center">
              <Home className="text-soil-dark/20" size={120} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-soil-dark font-medium">村庄风光</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// 美食区块
function Food() {
  const foods = [
    {
      name: '逍遥镇胡辣汤',
      desc: '闻名全国的逍遥镇胡辣汤，香辣浓郁，回味无穷',
      ingredients: ['牛肉', '面筋', '粉条', '花生', '二十余种香料'],
      featured: true,
    },
    {
      name: '农家炖菜',
      desc: '柴火慢炖，原汁原味，家乡的味道',
      ingredients: ['土鸡', '排骨', '时令蔬菜'],
      featured: false,
    },
    {
      name: '手工面食',
      desc: '手擀面、馒头、包子，传统手艺',
      ingredients: ['优质小麦', '传统发酵'],
      featured: false,
    },
  ]

  return (
    <section id="food" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            <span className="text-gradient">特色美食</span>
          </h2>
          <p className="text-earth-brown text-lg">逍遥味道 · 舌尖乡愁</p>
        </motion.div>

        {/* 主打美食 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="card card-hover p-8 md:p-12 mb-12 gradient-hero"
        >
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-16 h-16 rounded-full gradient-wheat flex items-center justify-center flex-shrink-0">
              <Utensils className="text-soil-dark" size={32} />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-soil-dark mb-2">{foods[0].name}</h3>
              <p className="text-earth-brown">{foods[0].desc}</p>
            </div>
          </div>
          
          <div className="bg-white/60 rounded-xl p-6">
            <h4 className="font-bold text-soil-dark mb-3">精选食材</h4>
            <div className="flex flex-wrap gap-2">
              {foods[0].ingredients.map((ing) => (
                <span
                  key={ing}
                  className="px-3 py-1 rounded-full bg-brick-red/10 text-brick-red text-sm"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 其他美食 */}
        <div className="grid md:grid-cols-2 gap-6">
          {foods.slice(1).map((food, i) => (
            <motion.div
              key={food.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="card card-hover p-6"
            >
              <h3 className="text-xl font-bold text-soil-dark mb-2">{food.name}</h3>
              <p className="text-earth-brown mb-4">{food.desc}</p>
              <div className="flex flex-wrap gap-2">
                {food.ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="px-2 py-1 rounded bg-wheat-light/30 text-earth-brown text-xs"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// 发展区块
function Future() {
  const plans = [
    { icon: TrendingUp, title: '产业振兴', desc: '发展特色农业，带动村民增收' },
    { icon: Home, title: '基础设施', desc: '改善村容村貌，提升生活品质' },
    { icon: Users, title: '人才培养', desc: '吸引青年返乡，注入新活力' },
    { icon: Leaf, title: '生态保护', desc: '绿水青山，可持续发展' },
  ]

  return (
    <section id="future" className="py-24 gradient-earth text-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            乡村振兴
          </h2>
          <p className="text-wheat-light text-lg">美好未来 · 共同缔造</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-wheat-gold flex items-center justify-center mb-4">
                <plan.icon className="text-soil-dark" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
              <p className="text-wheat-light/80">{plan.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* 愿景 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="card p-8 md:p-12 inline-block">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-soil-dark">
              让小杜庄成为
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {['宜居宜业的美丽乡村', '传承文化的魅力村庄', '共同富裕的幸福家园'].map((vision) => (
                <div
                  key={vision}
                  className="px-6 py-3 rounded-full gradient-wheat text-soil-dark font-medium"
                >
                  {vision}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// 页脚
function Footer() {
  return (
    <footer className="py-12 bg-soil-dark text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            小杜庄村
          </h3>
          <p className="text-wheat-light mb-6">
            河南省西华县逍遥镇小杜庄村
          </p>
          <div className="flex items-center justify-center space-x-2 text-wheat-light/60 text-sm">
            <Heart size={16} />
            <span>Made with love for 小杜庄</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

// 主应用
function App() {
  return (
    <div className="antialiased">
      <Navbar />
      <main>
        <Hero />
        <History />
        <Culture />
        <Food />
        <Future />
      </main>
      <Footer />
    </div>
  )
}

export default App
