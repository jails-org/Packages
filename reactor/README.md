# reactor

Diff Dom and template system for Jails.

> Version : `1.0.0`

> Dependencies :
- [morphdom](https://github.com/patrick-steele-idem/morphdom) - for dom diffing
- [sodajs](https://github.com/AlloyTeam/sodajs) -  as template system

---

## Usage

```js
import reactor from 'jails.packages/reactor'

jails
    .extends( reactor() )
    .start()
```

## Component : `my-component`
```js
export default ( {init, reactor} ) =>{

    reactor({
        name :'Clark',
        lastname :'Kent'
    })

    init(()=>[

    ])
}
```

## Markup
```html
<div data-component="my-component">
    <h1>Hi!, {{name}} {{lastname}}</h1>
</div>
```

You can use `template` tags to hide informations on page load.

```html
<div data-component="my-component">
    <template>
        <h1>Hi!, {{name}} {{lastname}}</h1>
    </template>
</div>
```

Reactor will dispatch `:destroy` custom event when a inner component has been discarted.

## data-static Aka shouldNotUpdate

Since reactor uses `morphdom` for dom diffing, you need to explicit define in html where you don't
want the default update behavior, by using `data-static` = `true`. This way, you can tell morphdom to
do not update that dom tree, so it will be static. Pretty handy if you want to make dom changes directly without any diffing dom conflicts.

```html
<div data-component="my-component">
    <h1>Hi!, <span v-html="fullname">Guest</span></h1>
    <div data-static="true">
        <p v-html="name">This value will never change, no matter how many any reactor calls</p>
    </div>
</div>
```

Calling `reactor()` without any parameters will return the whole Single Source of Truth tree being used to update the entire application.


## Animations
Reactor provides some hooks in order to add or remove classes before node added or before node removes.

```html
<div 
    class="my-element"
    data-animation-before-enter="before-enter"
    data-animation-enter="enter"
    data-animation-leave="before-leave">
```

```css
.my-element {
    transition: opacity .5s, transform .8s;
}
.my-element.before-enter{
    opacity: 0;
    transform: translateY(-100px);
}
.my-element.enter{
    opacity: 1;
    transform: translateY(0);
}
.my-element.before-leave{
  transition: opacity 2s, transform 1s;
  opacity:0;
  transform translateY(-100px);
}
```

As you can see on `before-leave` css class, you can setup a different transitions for the leave state, so you can use one animation for start and another animation when element leaves the dom.