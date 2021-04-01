# ngFor2Days

It's a small set of notes for a two-days crash course on Angular.
The example project can be [edited on StackBlitz ⚡️](https://stackblitz.com/edit/ngfor2days).

## Prerequisites

Angular is build in [TypeScript](https://www.typescriptlang.org/). Give it a quick look before proceeding.

## Intro

1. Navigate to [angular.io](https://angular.io/), just to present the argument.
2. Move to the ["What is Angular?"](https://angular.io/guide/what-is-angular) and start discussing about the framework.

## Setup

It's time to setup the development environment!

  1. Install Node.js and a code editor.
  2. Install Angular CLI globally.
  ```bash
  npm install -g @angular/cli
  ````
  3. Create a brand new application with the CLI.
  ```bash
  ng new my-app
  ```
  4. Run `ng serve` and open the browser on `http://localhost:4200`: you'll see your first Angular application!

You can also follow [this document](https://angular.io/guide/setup-local).

## Compilation

Angular compiler is the hearth of the framework: it takes a NgModule type and produces a NgModuleFactory. The NgModule type contains all the application items (components, directives, pipes...). The factory instead is a JavaScript class the frameworks uses to stamp out components.

### JIT

JIT stands for Just In Time: it's a compilation approach which consists in building the application during the bootstrap. You've to carry the compiler with you to run in this way: this will cost more time to the user (larger bundle to download with an extra compilation time once all files are ready).

### AOT

AOT - Ahead Of Time - is on the opposite side of JIT: the compilation here is run during the application build stage. There's no need to carry the compiler as part of the bundle, but you need a clear separation between static and dynamic data in your application.

### Conclusion

Angular offers both options (JIT and AOT), but

- AOT creates smaller bundles without dead code, offers type safety even on the template and reduces the bootstrap time of the application.
- AOT requires metadata to be known statically, so the build can be performed without executing the code.

## NgModules

NgModules are the principal unit of distribution of Angular applications, they define the compilation context of our components. Like ES6 modules, they've declarations, imports and exports. Components can be part of only one module.

### Bootstrap and entry components

The bootstrap property defines what needs to be instanciated in the early stage of the application. Typically you'll find the root component here, withing the main module of the application. For each of the components defined here, the frameworks creates a factory. Angular is able to detect which components are used within templates and creates a factory for them. In case a component is the target of a route, it's also able to create a factory since the route configuration is statically defined.

### Dependency Injection

The providers property defines the Dependency Injection container items. What's defined here is merged with providers coming from the imported modules, so that all injectable items are available to the components part of the module.

### Lazy loading

NgModules are the main unit of distribution, so they can be lazy loaded. Think about a large application with many modules. To reduce bootstrap time, the Angular router is smart enough to decide whether it's time to load a module to take the user to the requested route. This means that it'll download the specific bundle only if the feature module is requested from the user.

## Components

In Angular, every UI element is a component. There'll always be a root component, that will contains all the others.

### Input and Output properties

A component has two kind of properties: input and outputs ones. Data flows from the first to the second. Inputs are available through property binding, while outputs are served via event bindings. Only inputs can be accessed with property binding, so the internal state is in a safe area. When there's a change on the properties, Angular takes care of calling the setter to propagate the change. In case the component raises an event, the framework will be responsible of propagating that calling the function we defined in the event binding.

#### Two-way binding

When there's the need to pass an argument to a component and seamless sync it's value in case of changes, two-way bindings is the way. Consider the example of binding a variable to an input field. Things like this can be provided even in custom components with `[ngModel]` and `(ngModelChange)` bindings (which can be collapsed to `[(ngModel)]`).

#### Passing objects or constants

Property binding works for objects or constants. Without brackets, the content is threat as constant. So, `myProperty="Luca"`is like doing `[myProperty]="'Luca'"`: in the second case, I'm passing an explicit string type, instead of a variable name.

### Template

It describes how the component is rendered on the page. The template can be defined inline (template) or in a separate file (templateUrl). Style is part of the template, but it's defined in a dedicated property of the @Component decorator: it can also be inline (styles) or in separate file (stylesUrl). Styles scope is usually encapsulated within the component, so it won't affect the others.

#### Interpolation

Templates can access public members of the component class. Interpolation is the possibility to render members value (or function result in case of methods) on the template. Something like this ``{{ myVariable }}` will render myVariable content, updated each time it changes. It's also possible to set content with property binding.

### Lifecycle

Angular components have a defined lifecycle: it's a series of steps which we can use to perform actions. See [Lifecycle hooks
](https://angular.io/guide/lifecycle-hooks).

### Providers

Like NgModules, even components can define their providers.

### Host element

A component can interact with its host DOM element: it can listen to events, update properties and eventually invoke methods. That's the case of directives: they're components without a template. Even if it seems they're interacting directly with the DOM, under the hood Angular is wrapping the DOM API with an higher level abstraction.

### Queries

A component can also access its children. They're divided in two groups: content and view children. Content ones are those specified as part of the `ng-content` block, while view children are the top-level DOM elements within the template.

### Directives

A directive is a component without template. It can access the host element via host binding. Have a look at the TrimDirective within the example project.

### Pipes

They're used to alter the item to render, applying a step before to compute the value. Consider the case of an ISO represented date: you can't display to the user `1970-01-01T00:00:000.Z`, and calling an internal `formatISODate` could be an option. But `{{ myISODate | myDatePipe }}` is a greather option. There's an HelloPipe within the example project.

## Dependency Injection (again)

If you've a component which depends on a service (or even more than one), you don't have to create it yourself. You'll request for it in the constructor, and the framework will do that for you. That increases the decoupling and carries other great advantages.
DI is not magic: dependencies needs to be specified within providers, so the container is filled from all needed items.

### Registering services

Services can be registered at module or component level. The recommendation is to register services at module level, relying on the component side only for specific UI services that needs to be scoped to a particular element.

Have a look at PublicIpService in the example project.

## Forms

Form handling is a complex problem. Angular wraps the DOM form, introducing a UI-independent representation. There're three building blocks: FormControl, FormGroup and FormArray which can be provided from FormsModule or ReactiveFormsModule. With this splitting, the framework is offering us a better experience while working with this stuff.

### FormControl

It's an indivisible part of the form, usually corresponding to an input. It has value, status and error properties.

### FormGroup

FormGroup is a collection of FormControls. It has the same properties as the FormControl, which depends on its children.

### FormArray

It's a collection of the same FormControl, with a variable length. All the considerations for value, status and errors done for the FormGroup are also valid here.

### Creating the model

```typescript
const myForm = new FormGroup({
  firstName: new FormControl(''),
  lastName: new FormConrol('', Validators.required)
});
```

That's the way forms are defined in Angular. Synchronous validators can be defined at creation, or even attached dynamically later on.

### The value

Form's value can be read with `getValue` method. It can be set with `setValue`. If there's the need to change only part of the model, then `patchValue` is the way.

### Disabling controls

Controls can be disabled with `disable` method. On the other hand, `enable` restores it back.

### Async validators

`Validators.required` is a synchronous validator: it's executed while typing and its result is immediately available, since no async operations are involved. Consider the case when the validation involves an HTTP call: in that scenario an async-validator is needed.

### Validator composition

Validators can be composed. `myNumber` is a control with initial value set to 1, which is required with a minimum value of 0.

```typescript
  ...
  myNumber: new FormControl(1, [Validators.required, Validators.min(0)]),
  ...
```

### Listening to changes

FormControls (but also FormGroup and FormArray) provides two observables: `statusChanges`and `valueChanges`. When subscribed, they notify us about status and value changes. In this way we can react and adapt our application behavior accordingly.


