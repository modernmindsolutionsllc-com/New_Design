import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '@components/layout/Layout'

// Pages
import HomePage        from '@pages/HomePage'
import ServicesPage    from '@pages/ServicesPage'
import PortfolioPage   from '@pages/PortfolioPage'
import AboutPage       from '@pages/AboutPage'
import BlogPage        from '@pages/BlogPage'
import BlogPostPage    from '@pages/BlogPostPage'
import StartProjectPage from '@pages/StartProjectPage'
import ContactPage     from '@pages/ContactPage'
import NotFoundPage    from '@pages/NotFoundPage'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/"               element={<HomePage />} />
        <Route path="/services"       element={<ServicesPage />} />
        <Route path="/portfolio"      element={<PortfolioPage />} />
        <Route path="/about"          element={<AboutPage />} />
        <Route path="/blog"           element={<BlogPage />} />
        <Route path="/blog/:slug"     element={<BlogPostPage />} />
        <Route path="/start-project"  element={<StartProjectPage />} />
        <Route path="/contact"        element={<ContactPage />} />
        <Route path="*"               element={<NotFoundPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
)

export default App
