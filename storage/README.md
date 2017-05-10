# storage

> The storage is a wrapper for the localStorage and sessionStorage global objects.

---

## Usage

### For local storage

```js
//Save data
storage.local.set('item', { my :'item' }); // Save data and return { my:'item' }

//Get data
storage.local.get('item'); // return { my:'item' }

//Delete data
storage.local.remove('item'); // Removes and return { my:'item' }
```

### For session storage

```js
//Save data
storage.session.set('item', { my :'item' }); // Save data and return { my:'item' }

//Get data
storage.session.get('item'); // return { my:'item' }

//Delete data
storage.session.remove('item'); // Removes and return { my:'item' }
```
