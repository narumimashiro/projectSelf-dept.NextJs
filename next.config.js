/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}

module.exports = nextConfig

// reactStrictMode: falseは以下のエラーを解消するため
// TODO いつかはちゃんと消したい
// next-dev.js?3515:20 Warning: findDOMNode is deprecated in StrictMode.
// findDOMNode was passed an instance of Transition which is inside StrictMode.
// Instead, add a ref directly to the element you want to reference.
// Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node