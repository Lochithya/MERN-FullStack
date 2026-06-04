import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import ProductCard from './components/productCard'
import SuperProduct from './components/superProduct'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className= "w-full h-screen bg-blue-300">
        <SuperProduct/>
        <div className = "flex gap-10 ">
          <ProductCard                                                      // when call this compoenent , pass these props to the actual component 
            name = "Samsung Galaxy S24"
            price = "$1900/="
            image = "https://picsum.photos/id/3/200/300"
          />
          <ProductCard 
            name = "Apple Macbook Pro 16 inch"
            price = "$2500/="
            image = "https://picsum.photos/id/1/200/300"
          />
        </div>
    </div>
     
  )
}

export default App
