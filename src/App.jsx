import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MapPin, Heart, Users, Sun, Star, ArrowDown, Menu, X, ChevronRight, Leaf, Home, BookOpen, Utensils, TrendingUp, Sprout, Factory, Phone, Mail, Clock, Navigation, Sparkles } from 'lucide-react'

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
    { name: '农业', href: '#agriculture' },
    { name: '风情', href: '#culture' },
    { name: '美食', href: '#food' },
    { name: '发展', href: '#future' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="text-2xl font-bold"
            style={{ fontFamily: 'var(--font-calligraphy)', color: 'var(--soil-dark)' }}
          >
            小杜庄
          </motion.div>

          <div className="hidden md-flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-soil-dark hover:text-chinese-red transition-colors font-medium"
              >
                {item.name}
              </a>
            ))}
          </div>

          <button
            className="md-hidden text-soil-dark"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md-hidden glass border-t">
          <div className="px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-soil-dark hover:text-chinese-red"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </motion.nav>
  )
}

function Hero() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero">
      <motion.div 
        className="relative z-10 text-center px-6"
        style={{ y: y1, opacity }}
      >
        <div className="flex items-center justify-center space-x-3 mb-8">
          <MapPin className="text-chinese-red" size={32} />
          <span className="text-cinnamon font-medium text-lg">河南省西华县逍遥镇</span>
        </div>

        <motion.h1
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-6xl md-text-8xl lg-text-9xl font-black mb-10"
          style={{ 
            fontFamily: 'var(--font-calligraphy)',
            background: 'linear-gradient(135deg, #c44536 0%, #8b6f47 50%, #d4a056 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          小杜庄村
        </motion.h1>

        <motion.p
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-xl md-text-2xl text-cinnamon mb-16 tracking-widest"
          style={{ fontFamily: 'var(--font-classical)' }}
        >
          千年古镇 · 淳朴乡风 · 振兴之路
        </motion.p>

        <div className="flex flex-col md-flex-row items-center justify-center gap-6">
          <a href="#history" className="btn-primary">
            探索村庄 <ChevronRight size={20} className="ml-2" />
          </a>
          <a href="#culture" className="btn-secondary">风土人情</a>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-16 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <ArrowDown className="text-cinnamon" size={40} />
      </motion.div>
    </section>
  )
}

function Stats() {
  const stats = [
    { value: '1000+', label: '年历史', icon: BookOpen },
    { value: '500+', label: '常住人口', icon: Users },
    { value: '800', label: '亩耕地', icon: Sprout },
    { value: '95%', label: '粮食产量', icon: TrendingUp },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md-grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full gradient-wheat flex items-center justify-center shadow-lg">
                <stat.icon className="text-white" size={28} />
              </div>
              <div 
                className="text-5xl md-text-6xl font-black mb-3"
                style={{ 
                  fontFamily: 'var(--font-calligraphy)',
                  background: 'linear-gradient(135deg, #d4a056, #c9a962)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {stat.value}
              </div>
              <div className="text-cinnamon font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function History() {
  const features = [
    { icon: BookOpen, title: '千年渊源', desc: '源自古代杜姓聚居，历史悠久，文化底蕴深厚' },
    { icon: MapPin, title: '逍遥镇辖', desc: '隶属闻名遐迩的逍遥镇，共享千年古镇文化' },
    { icon: Users, title: '淳朴民风', desc: '世代农耕，邻里和睦，传承中原传统美德' },
  ]

  return (
    <section id="history" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md-text-6xl font-black mb-6" 
            style={{ 
              fontFamily: 'var(--font-calligraphy)',
              background: 'linear-gradient(135deg, #c44536 0%, #8b6f47 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            历史渊源
          </h2>
          <div className="divider-short" />
          <p className="text-cinnamon text-xl mt-6">千年传承 · 文化积淀</p>
        </div>

        <div className="grid md-grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              className="card card-hover p-10 text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full gradient-wheat flex items-center justify-center shadow-lg">
                <feature.icon className="text-white" size={36} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-soil-dark">{feature.title}</h3>
              <p className="text-cinnamon leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Agriculture() {
  const crops = [
    { name: '小麦', desc: '主要粮食作物，优质强筋小麦' },
    { name: '玉米', desc: '高产稳产，籽粒饱满' },
    { name: '辣椒', desc: '经济作物，色泽鲜红，辣味浓郁' },
    { name: '甜瓜', desc: '香甜可口，脆嫩多汁' },
    { name: '西瓜', desc: '沙瓤甘甜，夏日佳品' },
  ]

  return (
    <section id="agriculture" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md-text-6xl font-black mb-6" 
            style={{ 
              fontFamily: 'var(--font-calligraphy)',
              background: 'linear-gradient(135deg, #6b8c42 0%, #8b6f47 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            农业产业
          </h2>
          <div className="divider-short" />
          <p className="text-cinnamon text-xl mt-6">基本农田保护区 · 现代化种植基地</p>
        </div>

        <div className="grid md-grid-cols-2 lg-grid-cols-5 gap-6 mb-16">
          {crops.map((crop, i) => (
            <motion.div
              key={crop.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="card card-hover p-8 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-wheat flex items-center justify-center shadow-md">
                <Sprout className="text-white" size={28} />
              </div>
              <h4 className="text-xl font-bold text-soil-dark mb-2">{crop.name}</h4>
              <p className="text-cinnamon text-sm">{crop.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="card card-hover p-10 gradient-earth">
          <div className="flex items-start space-x-6">
            <div className="w-20 h-20 rounded-full bg-wheat-gold flex items-center justify-center flex-shrink-0 shadow-lg">
              <Factory className="text-soil-dark" size={36} />
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-3 text-white">西华县晟源农业种植合作社</h3>
              <p className="text-white/90 mb-6 leading-relaxed text-lg">
                当地知名农业企业，以玉米芯收储加工、粮食收储等为主营业务，
                带动了当地就业和农民增收，是乡村振兴的重要力量。
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-5 py-2 rounded-full bg-wheat-gold text-soil-dark font-medium">玉米芯加工</span>
                <span className="px-5 py-2 rounded-full bg-wheat-gold text-soil-dark font-medium">粮食收储</span>
                <span className="px-5 py-2 rounded-full bg-wheat-gold text-soil-dark font-medium">带动就业</span>
                <span className="px-5 py-2 rounded-full bg-wheat-gold text-soil-dark font-medium">农民增收</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

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
        <div className="text-center mb-20">
          <h2 className="text-5xl md-text-6xl font-black mb-6" 
            style={{ 
              fontFamily: 'var(--font-calligraphy)',
              background: 'linear-gradient(135deg, #c44536 0%, #8b6f47 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            风土人情
          </h2>
          <div className="divider-short" />
          <p className="text-cinnamon text-xl mt-6">淳朴乡风 · 温暖家园</p>
        </div>

        <div className="grid md-grid-cols-2 lg-grid-cols-4 gap-6">
          {activities.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="card card-hover p-8 text-center"
            >
              <div className="w-18 h-18 mx-auto mb-5 rounded-full gradient-earth flex items-center justify-center shadow-md">
                <item.icon className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-soil-dark">{item.title}</h3>
              <p className="text-cinnamon text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Food() {
  return (
    <section id="food" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md-text-6xl font-black mb-6" 
            style={{ 
              fontFamily: 'var(--font-calligraphy)',
              background: 'linear-gradient(135deg, #c44536 0%, #d4a056 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            特色美食
          </h2>
          <div className="divider-short" />
          <p className="text-cinnamon text-xl mt-6">逍遥味道 · 舌尖乡愁</p>
        </div>

        <div className="card card-hover p-10 mb-8">
          <div className="flex items-start space-x-6 mb-8">
            <div className="w-20 h-20 rounded-full gradient-wheat flex items-center justify-center flex-shrink-0 shadow-lg">
              <Utensils className="text-white" size={36} />
            </div>
            <div>
              <h3 className="text-4xl font-black text-soil-dark mb-3">逍遥镇胡辣汤</h3>
              <p className="text-cinnamon text-lg">闻名全国的逍遥镇胡辣汤，香辣浓郁，回味无穷</p>
            </div>
          </div>
          
          <div className="glass rounded-2xl p-6">
            <h4 className="font-bold text-soil-dark mb-4">精选食材</h4>
            <div className="flex flex-wrap gap-3">
              {['牛肉', '面筋', '粉条', '花生', '二十余种香料'].map((ing) => (
                <span key={ing} className="px-4 py-2 rounded-full tag tag-red">{ing}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md-grid-cols-2 gap-6">
          {[
            { name: '农家炖菜', desc: '柴火慢炖，原汁原味，家乡的味道', ingredients: ['土鸡', '排骨', '时令蔬菜'] },
            { name: '手工面食', desc: '手擀面、馒头、包子，传统手艺', ingredients: ['优质小麦', '传统发酵'] },
          ].map((food, i) => (
            <motion.div
              key={food.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              className="card card-hover p-8"
            >
              <h3 className="text-2xl font-bold text-soil-dark mb-3">{food.name}</h3>
              <p className="text-cinnamon mb-5">{food.desc}</p>
              <div className="flex flex-wrap gap-2">
                {food.ingredients.map((ing) => (
                  <span key={ing} className="px-3 py-1 rounded-full tag tag-earth text-sm">{ing}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Future() {
  const plans = [
    { icon: TrendingUp, title: '产业振兴', desc: '发展特色农业，带动村民增收' },
    { icon: Home, title: '基础设施', desc: '改善村容村貌，提升生活品质' },
    { icon: Users, title: '人才培养', desc: '吸引青年返乡，注入新活力' },
    { icon: Leaf, title: '生态保护', desc: '绿水青山，可持续发展' },
  ]

  return (
    <section id="future" className="py-24 gradient-earth">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md-text-6xl font-black mb-6 text-white" style={{ fontFamily: 'var(--font-calligraphy)' }}>
            乡村振兴
          </h2>
          <div className="divider-short" />
          <p className="text-white/90 text-xl mt-6">美好未来 · 共同缔造</p>
        </div>

        <div className="grid md-grid-cols-2 lg-grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-dark rounded-2xl p-8"
            >
              <div className="w-16 h-16 rounded-full bg-wheat-gold flex items-center justify-center mb-6 shadow-lg">
                <plan.icon className="text-soil-dark" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">{plan.title}</h3>
              <p className="text-white/90">{plan.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-16 bg-soil-dark text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <h3 className="text-3xl font-black mb-4" style={{ fontFamily: 'var(--font-calligraphy)' }}>小杜庄村</h3>
          <p className="text-wheat-light/80 mb-8">千年古镇 · 淳朴乡风 · 振兴之路</p>
          <div className="border-t border-white/10 pt-8 text-center text-wheat-light/60 text-sm">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Heart size={18} className="text-chinese-red" />
              <span>Made with love for 小杜庄</span>
            </div>
            <p>© 2026 小杜庄村 版权所有</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

function App() {
  return (
    <div className="antialiased">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <History />
        <Agriculture />
        <Culture />
        <Food />
        <Future />
      </main>
      <Footer />
    </div>
  )
}

export default App
