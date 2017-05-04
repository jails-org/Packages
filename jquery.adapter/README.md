# jquery.adapter

This module uses jquery events instead of jails native event handlers.

## Usage

1. First, make sure that you're loading jQuery in your project.

2. Before `jails.start` register the `jquery.adapter` middleware.

```js
import jqAdapter from 'jails.packages/jquery.adapter'
import jQuery from 'jquery'

jails.use( jqAdapter(jQuery) )
jails.start()
```
