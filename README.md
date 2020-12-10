This plugin reduces boilerplate when working with conditional classes/css modules, while being fully compatible with plain old className

## Example

**In**

```jsx
const Hr = ({ bold }) => {
    return <hr classNames={['hr', 'solid', bold && 'bold', cssModule.someClass]} />;
};
```

**Out**

```jsx
const Hr = ({ bold }) => {
    return <hr className={`hr solid ${bold && 'bold' || ""} ${cssModule.someClass}`} />;
};
```

## Installation

```sh
npm install --save-dev babel-plugin-transform-react-class-names
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["babel-plugin-transform-react-class-names"]
}
```

### Via CLI

```sh
babel --plugins babel-plugin-transform-react-class-names script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["babel-plugin-transform-react-class-names"]
});
```
