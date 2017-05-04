# json

For json data structure manipulation.

It uses [walker](https://github.com/Javiani/Walker) library, documentation and library can be found here:

## Usage

```js
import json from 'jails.packages/json'

json({ name: 'Michael Jackson' })
	.propset('name', 'Clark Kent')
	.value()

// { name :'Clark Kent' }
```
