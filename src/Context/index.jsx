import { createContext, useState, useEffect } from 'react'

export const ShoppingCartContext = createContext()
  
// Inicializa el almacenamiento local con valores predeterminados si estos no existen 
export const initializeLocalStorage=()=>{
  const accountInLocalStorage=localStorage.getItem('account')
  const signOutInLocalStorage=localStorage.getItem('sig-out')
  
  if(!accountInLocalStorage){
    localStorage.setItem('account', JSON.stringify({}))
   } 
  
  if(!signOutInLocalStorage){
    localStorage.setItem('sign-out', JSON.stringify(false))
  }
}

// Proveedor de contexto de carrito de compras 
export const ShoppingCartProvider = ({children}) => {
  
  //Mi estado de cuenta.
  const [account, setAccount]=useState(()=>{
    const accountInLocalStorage = localStorage.getItem('account')
    return accountInLocalStorage ? JSON.parse(accountInLocalStorage) : {} 
  })

  //Estado de cierre de sección 
  const [signOut, setSignOut]=useState(() => {
    const signOutInLocalStorage = localStorage.getItem('sign-out')
    return signOutInLocalStorage ? JSON.parse(signOutInLocalStorage) : false
  })
  
  // Carrito de Compras, Incrementar cantidad
  const [count, setCount] = useState(0)

  // Detalle del Producto · Abrir/Cerrar
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
  const openProductDetail = () => setIsProductDetailOpen(true)
  const closeProductDetail = () => setIsProductDetailOpen(false)

  // Menú Lateral de Pago · Abrir/Cerrar
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
  const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true)
  const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false)

  // Detalle del producto, Mostrar producto
  const [productToShow, setProductToShow] = useState({})

  // Carrito de compras, Agregar productos al carrito
  const [cartProducts, setCartProducts] = useState([])

  // Carrito de compras pedido.
  const [order, setOrder] = useState([])

  // Obtener productos
  const [items, setItems] = useState(null)
  const [filteredItems, setFilteredItems] = useState(null)

  // Obtener productos por titulo
  const [searchByTitle, setSearchByTitle] = useState(null)

  // Obtener productos por categoria
  const [searchByCategory, setSearchByCategory] = useState(null)

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then(response => response.json())
      .then(data => setItems(data))
  }, [])

  const filteredItemsByTitle = (items, searchByTitle) => {
    return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
  }

  const filteredItemsByCategory = (items, searchByCategory) => {
    return items?.filter(item => item.category.name.toLowerCase().includes(searchByCategory.toLowerCase()))
  }

  const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
    if (searchType === 'BY_TITLE') {
      return filteredItemsByTitle(items, searchByTitle)
    }

    if (searchType === 'BY_CATEGORY') {
      return filteredItemsByCategory(items, searchByCategory)
    }

    if (searchType === 'BY_TITLE_AND_CATEGORY') {
      return filteredItemsByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }
    
    return items
  }

  useEffect(() => {
    if (searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY', items, searchByTitle, searchByCategory))
    if (searchByTitle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory))
    if (!searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory))
    if (!searchByTitle && !searchByCategory) setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory))
  }, [items, searchByTitle, searchByCategory])

  

  
  return (
    <ShoppingCartContext.Provider value={{
      count,
      setCount,
      openProductDetail,
      closeProductDetail,
      isProductDetailOpen,
      productToShow,
      setProductToShow,
      cartProducts,
      setCartProducts,
      isCheckoutSideMenuOpen,
      openCheckoutSideMenu,
      closeCheckoutSideMenu,
      order,
      setOrder,
      items,
      setItems,
      searchByTitle,
      setSearchByTitle,
      filteredItems,
      searchByCategory,
      setSearchByCategory,
      account,
      setAccount,
      signOut,
      setSignOut
    }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}

