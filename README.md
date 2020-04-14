# Javascript Debugger

Validate events and functions declared using JQuery, characteristics created
* Build and set relation between buttons and buttons event automatiacally.
* Find buttons Id's declared and show error if any id is not declared in Html
* Set relation between button and event, if a button does not have an event, will show an error message regarding the methos that is missing
* Create at the end of the html a console log where show the builder status and also is posible to print information

## Javascript Libraries dependencies

* Bootstrap 4.4.1
* JQuery 3.4
* JQuery Validate

## How it works?

1. Create a button in html element and with id

 ```<button id="firstButton">Click<button>```

 2. Declare in array ```_.btn= {}``` the new id to ve considered in the builder

```_.btn.firstbutton = 'first button';```

3. Within the array ```_.onClick = {}``` will have all the methods corresponding to each button declared, the method needs to have the same name declared in the button array

```
_.onClick.firstbutton = (evt) => {
    _.bld.logger.log("save click");
};
```

4. Is everything was declared correctly the logger panel will display a succes message in each step builded it

## Display error and suggest how you can fix it

![Error building automate builder](https://raw.githubusercontent.com/jagel/javascript-debugger/master/img/demo/ErrorView.png)

## Display information regarding in each auto builder

![Error building automate builder](https://raw.githubusercontent.com/jagel/javascript-debugger/master/img/demo/SuccessView.png)

