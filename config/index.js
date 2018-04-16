import React, { PureComponent } from 'react'
import { composeMD } from './utils'

import {
  home,
  notFound,
  example
} from '~/docs'

const routes = [
  { 'path': '/', component: composeMD(home) },
  { 'path': '/example', component: composeMD(example) },
  { 'path': '*', component: composeMD(notFound) }
]

const navLeft = {
  path: '/',
  label: 'Application',
  imgSrc: ''
}

const navRight = [
  { path: '/', label: 'Getting Started' },
  { path: '/example', label: 'Example' }
]

const sidebar = [
  { path: '/', label: 'A', icon: 'setting' },
  { path: '/foo', label: 'B', icon: 'team' }
]

export {
  routes,
  navLeft,
  navRight,
  sidebar
}
