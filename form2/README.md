# form2

A Component for a Form that performs custom validations using `jails.packages/validator`.

## Usage

Import component and provide a hashmap containing all validators rules as dependency.

```js
import jails from "jails-js";
import { form, formField } from "packages/form2";

const dependencies = {
  validators: {
    required({ value, data, fields }) {
      return !!value.trim();
    },
  },
};

jails.register("form", form);
jails.register("form-field", formField, dependencies);
```

## Markup

Configure your markup and fields setting up rules matching with desired validators.

```html
<form data-component="form">
  <div class="form-group" data-component="form-field" v-class="fieldClass">
    <label>Name:</label>
    <input type="text" name="user" data-rules="{'required':true}" data-static />
    <template>
      <p v-if="error.required" class="error-message">
        Este campo é obrigatório
      </p>
    </template>
  </div>
</form>
```

<br />
<br />

# Event Emitting

## Form Component

The `form` component will fire 3 events:

- `form:valid` : Fired on any changes in the form and when it's valid.
- `form:invalid` : Fired on any changes in the form and when it's invalid.
- `form:submit` : Only fired on submitting attempt and when it's valid.

### Model

- `isValid` : Boolean that's true when form is valid and false when it's not, usefull for actions like disabling buttons when form is invalid.
- `data` : Data containing state from parent components.

<br />

## FormField Component

The `form-field` component will fire 1 event:

- `form-field:change` : Fired on any changes in the form input element.

### Model

- `error` : Containing a object with errors rules.
- `isValid` : Boolean that's true when form is valid and false when it's not, usefull for actions like disabling buttons when form is invalid.
- `touched` : If that field has every been touched in user interaction.
- `focus` : Boolean, true when input element is on focus and false otherwise.
- `data` : Data containing state from parent components.
- `fieldClass` : Default classes for assigning `touched`, `focus`, `error` states.
- `value` : The value of the field if you wanna use it as a state.
