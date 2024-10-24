import { Header } from './layout/Header.tsx'
import { Content } from './layout/Content.tsx'
import { Footer } from './layout/Footer.tsx'

export const App = () => {
  return (
    <div className='flex flex-col h-full font-mono'>
      <Header />
      <Content />
      <Footer />
    </div>
  )
}
