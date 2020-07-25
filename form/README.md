# form

A Component for a Form that performs custom validations using `jails.packages/validator`.

## Usage
Import component and provide a hashmap containing all validators rules as dependency.

```js
import jails from 'jails-js'
import * as form from 'jails.packages/form'

const dependencies = {
	validators: {
		required({ value, data, fields }){
			return !!value.trim()
		}
	}
}

jails.register('form', form, dependencies)
```

## Markup
Configure your markup and fields setting up rules matching with desired validators.

```html
<form data-component="form">
	<div class="form-group" v-class="errors.user ? 'error' : ''">
		<label>Name:</label>
		<input type="text" name="user" data-rules="{'required':true}" data-static="true" />
		<template>
			<p v-if="errors.user == 'required'" class="error-message">Este campo é obrigatório</p>
		</template>
	</div>
</form>
```
## Event Emitting

`form` component will fire 3 events:
- `:valid`   : Fired on any changes in the form and when it's valid.
- `:invalid` : Fired on any changes in the form and when it's invalid.
- `:submit`  : Only fired on submitting attempt and when it's valid.

## Model 

- `errors` : Containing a object with `input.name` and the rule that is failing as its value.
- `valid`  : Boolean that's true when form is valid and false when it's not, usefull for actions like disabling buttons when form is invalid.