import Footer from './Footer'
import Header from './Header'

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="relative h-full w-full flex-grow">{children}</main>
      <Footer />
    </div>
  )
}
