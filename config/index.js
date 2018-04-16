import { composeMD } from './utils'
import {
  home,
  notFound,
  example,
  table
} from '~/docs'

const routes = [
  { 'path': '/', component: composeMD(home) },
  { 'path': '/example', component: composeMD(example) },
  { 'path': '/table', component: composeMD(table) },
  { 'path': '*', component: composeMD(notFound) }
]

const navLeft = {
  path: '/',
  label: 'Application',
  imgSrc: ''
}

const navRight = [
  { path: '/', label: 'Getting Started' },
  { path: '/example', label: 'Example' },
  { path: '/table', label: 'Table' }
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
