import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const ProtectedRoute = (props) => {
  const userInfo = useSelector(state => state.userInfo)
  const { component: Component } = props
  useEffect(() => {
  }, [userInfo.token])
  if (userInfo.token.length === 0) return <></>
  if (userInfo.token === true) return <Component />
  if (userInfo.token === false) return <Redirect to={{ pathname: '/login' }} />
}

export const AuthRoute = (props) => {
  const userInfo = useSelector(state => state.userInfo)
  const { component: Component } = props
  useEffect(() => {
  }, [userInfo.token])
  if (userInfo.token.length === 0) return <></>
  if (userInfo.token === false) return <Component />
  if (userInfo.token === true) return <Redirect to={{ pathname: '/dashboard' }} />
}

