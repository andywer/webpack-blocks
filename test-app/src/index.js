import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import TsApp from './TsApp'

const mountPoint = document.getElementById('root')
ReactDOM.render(<div><App /><TsApp /></div>, mountPoint)
