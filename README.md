# RetroAmbience

Enhance your concentration with ambient sounds and calming visuals in a nostalgic SNES RPG style interface.

RetroAmbience is a React application that combines the power of ambient sounds with the nostalgic visuals of SNES-era RPGs. This unique blend creates an immersive environment designed to boost focus and productivity while providing a comforting, retro aesthetic.

## React + TypeScript + Vite

This project is built using React with TypeScript and Vite for a fast development experience.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: __dirname,
  },
}