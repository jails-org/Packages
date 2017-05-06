# logger

Logger is a middleware attached to `Jails` for logging common errors.

## Usage

```js
import jails from 'jails'
import logger from 'jails.packages/logger'

jails.use( logger() )
jails.start()
```
