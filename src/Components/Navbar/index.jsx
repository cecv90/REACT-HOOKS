/*import { useContext,} from 'react'
import { NavLink } from 'react-router-dom'
import { ShoppingCartContext} from '../../Context'
import ShoppingCart from '../ShoppingCart'


const Navbar = () => {
  const context = useContext(ShoppingCartContext)
  const activeStyle = 'underline underline-offset-4'
   
  //Sign Out
  const signOut = localStorage.getItem('sign-out')
  const parsedSignOut = JSON.parse(signOut)
  const isUserSignOut= context.signOut || parsedSignOut  
  
  //Account 
  const account = localStorage.getItem('account')
  const parsedAccount = JSON.parse(account)

  //Has an account
  const noAccountInLocalStorage=parsedAccount ? Object.keys(parsedAccount).length === 0 : true
  const noAccountInLocalState= context.account ? Object.keys(context.account).length === 0 : true
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState
  
  const handleSignOut = () => {
    const stringifiedSignOut = JSON.stringify(true)
    localStorage.setItem('sign-out', stringifiedSignOut)
    context.setSignOut(true)
  }

  const renderView= () =>{
    if(hasUserAnAccount && !isUserSignOut){
      return(
        <>
          <li>
          <NavLink
              to='/my-orders'
              className={({ isActive }) => isActive ? activeStyle : undefined}>
              My Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/my-account'
              className={({ isActive }) => isActive ? activeStyle : undefined}>
              My Account
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/sign-in'
              className={({ isActive }) => isActive ? activeStyle : undefined}
              onClick={() => handleSignOut()}>
              Sign out
            </NavLink>
          </li>
        </>
      )
    } else {
      return (
        <>
          <li>
            <NavLink
            to='/sign-in'
            className={({ isActive }) => isActive ? activeStyle: undefined}
            onClick={() => handleSignOut()}>
              Sign in
            </NavLink>
          </li>
        </>
      )
    }
  }

  return (
    <nav className='flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light bg-white'>
      <ul id='left-navbar' className='flex items-center gap-3'>
        <li className='font-semibold text-lg'>
          <NavLink to={`${isUserSignOut ? '/sign-in' : '/'}`}>
            Shopi
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/'
            onClick={() => context.setSearchByCategory()}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            All
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/clothes'
            onClick={() => context.setSearchByCategory('clothes')}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Clothes
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/electronics'
            onClick={() => context.setSearchByCategory('electronics')}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Electronics
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/furnitures'
            onClick={() => context.setSearchByCategory('furnitures')}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Furnitures
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/toys'
            onClick={() => context.setSearchByCategory('toys')}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Toys
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/others'
            onClick={() => context.setSearchByCategory('others')}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Others
          </NavLink>
        </li>
      </ul>
      <ul className='flex items-center gap-3'>
        {renderView()}
        <li className='flex items-center'>
          <ShoppingCart />
        </li>
      </ul>
    </nav>
  )
}

// crea una funcion 


export default Navbar*/

import { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ShoppingCartContext } from '../../Context'
import ShoppingCart from '../ShoppingCart'

const Navbar = () => {
  const context = useContext(ShoppingCartContext)
  const activeStyle = 'underline underline-offset-4'

  //Estado para manejar si el usuario ha creado sesión 
  const [isUserSignOut, setIsUserSignOut] = useState(false)
  //Estado para manejar si el usuario tiene una cuenta
  const [hasUserAnAccount, setHasUserAnAccount] = useState(false)

  //useEffect para sincronizar el estado con localStorage y el contexto
  useEffect(() => {
    const signOut = localStorage.getItem('sign-out')
    const parsedSignOut = JSON.parse(signOut)
    setIsUserSignOut(context.signOut || parsedSignOut)

    //Obtener la cuenta desde localStorage
    const account = localStorage.getItem('account')
    const parsedAccount = JSON.parse(account)
    const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
    const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true
    setHasUserAnAccount(!noAccountInLocalStorage || !noAccountInLocalState)
  }, [context.signOut, context.account])

  //Manejar el cierre de sesión
  const handleSignOut = () => {
    localStorage.setItem('sign-out', JSON.stringify(true))
    context.setSignOut(true)
    setIsUserSignOut(true)
  }

  //Renderizar la vista basada en el estado del usuario 
  const renderView = () => {
    if (hasUserAnAccount && !isUserSignOut) {
      return (
        <>
          <li>
          <NavLink
              to='/my-orders'
              className={({ isActive }) => isActive ? activeStyle : undefined}>
              My Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/my-account'
              className={({ isActive }) => isActive ? activeStyle : undefined}>
              My Account
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/sign-in'
              className={({ isActive }) => isActive ? activeStyle : undefined}
              onClick={() => handleSignOut()}>
              Sign out
            </NavLink>
          </li>
        </>
      )
    } else {
      return (
        <>
          <li>
            <NavLink
            to='/sign-in'
            className={({ isActive }) => isActive ? activeStyle: undefined}
            onClick={() => handleSignOut()}>
              Sign in
            </NavLink>
          </li>
        </>
      )
    }
    return null
  }

  return (
    <nav className='flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light bg-white'>
    <ul id='left-navbar' className='flex items-center gap-3'>
      <li className='font-semibold text-lg'>
        <NavLink to={`${isUserSignOut ? '/sign-in' : '/'}`}>
          Shopi
        </NavLink>
      </li>
      <li>
        <NavLink
          to='/'
          onClick={() => context.setSearchByCategory()}
          className={({ isActive }) =>
            isActive ? activeStyle : undefined
          }>
          All
        </NavLink>
      </li>
      <li>
        <NavLink
          to='/clothes'
          onClick={() => context.setSearchByCategory('clothes')}
          className={({ isActive }) =>
            isActive ? activeStyle : undefined
          }>
          Clothes
        </NavLink>
      </li>
      <li>
        <NavLink
          to='/electronics'
          onClick={() => context.setSearchByCategory('electronics')}
          className={({ isActive }) =>
            isActive ? activeStyle : undefined
          }>
          Electronics
        </NavLink>
      </li>
      <li>
        <NavLink
          to='/furnitures'
          onClick={() => context.setSearchByCategory('furnitures')}
          className={({ isActive }) =>
            isActive ? activeStyle : undefined
          }>
          Furnitures
        </NavLink>
      </li>
      <li>
        <NavLink
          to='/toys'
          onClick={() => context.setSearchByCategory('toys')}
          className={({ isActive }) =>
            isActive ? activeStyle : undefined
          }>
          Toys
        </NavLink>
      </li>
      <li>
        <NavLink
          to='/others'
          onClick={() => context.setSearchByCategory('others')}
          className={({ isActive }) =>
            isActive ? activeStyle : undefined
          }>
          Others
        </NavLink>
      </li>
    </ul>
    <ul className='flex items-center gap-3'>
      {renderView()}
      <li className='flex items-center'>
        <ShoppingCart />
      </li>
    </ul>
  </nav>
  )
}

export default Navbar