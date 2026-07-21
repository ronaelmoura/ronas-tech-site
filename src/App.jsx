import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Industries from './components/Industries/Industries'
import About from './components/About/About'
import Services from './components/Services/Services'
import Technologies from './components/Technologies/Technologies'
import Portfolio from './components/Portfolio/Portfolio'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Industries />
        <Services />
        <About />
        <Technologies />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
