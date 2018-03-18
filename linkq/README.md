# LinkQ

Simple JSON object walker, a little bit of `Either`, `Maybe` and `Lenses` in just one place.

## Usage

```js

const people = {
    heroes :[
        { hero :'Superman', name :'Clark', lastname :'Kent' },
        { hero :'Batman', name :'Bruce', lastname :'Wayne' },
        { hero :'Unknown', name :'Unknown', lastname :'Unknown'}
    ]
}


LinkQ( people )
	.select('heroes', 2)
	.then( unknown => {
        unknown.hero = 'SpiderMan'
        unknown.name = 'Peter'
        unknown.lastname = 'Parker'
    })
	.then( console.log ) // { hero:'SpiderMan', name :'Peter', lastname :'Parker'}

```

## `.select( ...args )`
Selects the desired node.

## `.then( Function(data) )`
Executes a callback if current node exists.

## `.otherwise( Function )`
Executes a callback if current node is not found.

## `.reset()`
Set the context to the root of the object tree.

## `.prev()`
Set the context to the previous node.

## `.value()`
Returns the same as `.then()` which is the current context of the json object.

## `.data()`
Returns the entire json tree with the changes.
