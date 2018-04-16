
# YASSIG

Yet Another Static Site Generator
--

## Motivation
YASSIG was developed to provide a SSG easy to maintain and as modular as possible, built on top of React 16 and Webpack4, it should also be compatible with mainstream static hosting platforms (Apache, now, netlify, surge etc...).

## Usage

### Exporting markdown files
Assuming that a file `foo.md` has been added in the `docs`  folder, to export it just add a line like the below in `docs/index.js` :

``` JavaScript
export { default as foo } from './foo.md'`
```
Repeat the process for any markdown file that you'd like to expose as Views

### Route Configuration

Assuming that a valid markdown `foo` has been exported from `docs`

We'll import it this way :
``` JavaScript
import { foo } from '~/docs'
```
and then, we'll create a new route to display this document as a new view :

``` JavaScript
const routes = [
  { 'path': '/foo', component: composeMD(foo) },
]
```
composeMD is a High Order Component function, that'll generate a new component using markdown data.

A new route will be created `/foo` reachable at
`$(HOST)/foo`

### UI Configuration
#### Navbar
``` JavaScript
// navLeft is the left area of the navbar
// you can configure Application name by
// replacing the label value or you can
// put the URI of an img, to display an image
// instead of a clickable label
const navLeft = {
  path: '/',
  label: 'Application',
  imgSrc: ''
}

// navRight is the right area of the navbar
// These are clickable links characterized by
// their path : target path
// label: label displayed
// For now, there's just one level, no dropdown
const navRight = [
  { path: '/', label: 'Getting Started' },
  { path: '/example', label: 'Example' },
  { path: '/table', label: 'Table' }
]
```
#### Sidebar
``` JavaScript
// sidebar is the left area of the view
// These are clickable links with icon (see ant design: https://ant.design/components/icon/)
const sidebar = [
  { path: '/', label: 'A', icon: 'setting' },
  { path: '/foo', label: 'B', icon: 'team' }
]
```

## Markdown Rendering

<img src='https://user-images.githubusercontent.com/15275110/38827265-a5c5e5a8-41b2-11e8-86de-010fc20cd2ef.png'
 width='400' />

## Starting the app

```
yarn && yarn start
```

Then open a browser and type :
```
http://localhost:8080
```
That's it.

## Netlify deployment

Configure a new project,
Set `yarn prod` as the production command.

## Apache deployment

Type `yarn build` in the root of the project
Then copy every files (don't forget `.htaccess`) from `dist` in root of your Apache host.

## License

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Credits

@dbrrt - David Barrat - April 2018
