import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '@components/layout/Layout'
import RouteLoader from '@components/ui/RouteLoader'

const HomePage = lazy(() => import('@pages/HomePage'))
const ServicesPage = lazy(() => import('@pages/ServicesPage'))
const PortfolioPage = lazy(() => import('@pages/PortfolioPage'))
const AboutPage = lazy(() => import('@pages/AboutPage'))
const BlogPage = lazy(() => import('@pages/BlogPage'))
const BlogPostPage = lazy(() => import('@pages/BlogPostPage'))
const StartProjectPage = lazy(() => import('@pages/StartProjectPage'))
const ContactPage = lazy(() => import('@pages/ContactPage'))
const NotFoundPage = lazy(() => import('@pages/NotFoundPage'))

const App = () => (
  <BrowserRouter>
    <Suspense fallback={<RouteLoader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/start-project" element={<StartProjectPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  </BrowserRouter>
)

export default App
