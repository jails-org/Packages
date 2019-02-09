# validator

A `json-style` Form Validator 

Validator is a function that returns a `promise`, resolves if a given data structure is valid and rejects otherwise.

```
Input :
	{ [name] :{ value :'my value', rules :{ required:true } } }
Output:
	If not valid -> { errors :{ [name] :{ required:true } } }
	Else -> data
```

## Usage

```js
import validator from 'jails.packages/validator'

const fields = {
	username :{
		value :'',
		rules :{
			required :true
		}
	}
}

const rules = {
	required( {value, data, fields} ){
		//data = true
		//fields = {...} All fields
		return !!value.trim()
	}
}

validator( fields, rules )
	.then(() => console.log('Hey!!! Form is valid!'))
	.catch((error) => console.error( 'Form error', error) )
```

In the example above, the `fields` config object was created statically just for ilustration. You can ( and should ) map over form elements and generate dynamically the `fields` configuration object.

# Sample
Here's a code that generates dynamically the fields configuration object and do all the UX live validation.

`index.html`
```html
<form data-component="validation">
	<div class="form-group" v-class="errors.user ? 'error' : ''">
		<label>Name:</label>
		<input type="text" name="user" data-rules="{'required':true}" data-static="true" />
		<template>
			<p v-if="errors.user.required" class="error-message">Este campo é obrigatório</p>
		</template>
	</div>

	<div class="form-group" v-class="errors.email ? 'error' : ''">
		<label>E-mail:</label>
		<input type="text" name="email" data-rules="{'email':true}" data-static="true" />
			
		<template>
			<p v-if="!errors.email.required && errors.email.email" class="error-message">Digite um email válido</p>		
		</template>
	</div>
</form>
```

`components/validation/index.js`
```js
import validator from 'jails.packages/validator'
import * as rules from './rules'

export default ( {init:main, elm:form, emit, arch} ) => {

	main(()=>[
		register
	])

	const register = ( {on} ) => {
		on('submit', onsubmit)
		on('input', {'input':onchange})
		on('blur',  {'input':onchange})
	}

	const onchange = (event) => {

		const name = event.target.name
		const {data} = getParams( form )

		validator( data, rules )
			.then(() => set( state => state.errors = {} ) )
			.catch( errors => set( state => state.errors[name] = errors[name] ) )
	}

	const onsubmit = (event) => {

		const {data} = getParams( form )

		validator( data, rules )
			.then(() => {
				set( state => state.errors = {} )
				emit('is-valid', {event, data})
			})
			.catch( errors => {
				set( state => state.errors = errors )
				event.preventDefault()
			})
	}

	const {set} = arch({
		model
	})
}

const model = {
	errors :{}
}

const getParams = (form) => {

	const data = [...form.elements]
		.reduce( (acc, el) => {
			if( el.name ) {
				const therules = el.getAttribute('data-rules')
				const rules = therules? JSON.parse( therules.replace(/\'/g, '\"') ) :null
				const value = el.form[ el.name ].value
				acc[ el.name ] = { value, rules }
			}
			return acc
		}, {})

	return { data }
}
```
