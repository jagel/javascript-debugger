function FormName(){
    let _ = {};

    { //Buttons Definitions and events
        _.btn = {};
        _.btn.save = "btnSaveForm";
        _.btn.void = "btnVoidForm";

        _.onClick = {};
        _.onClick.save = (evt) => {
            _.bld.logger.log("save click");
            this.submit();
        };
        _.onClick.void = (evt) => {
            _.bld.logger.log("void click");
        };
    }

    { // Form items
        
        _.frmItems = {};
        _.frmItems.Name = "formName";

         _.frmActions = {};
         _.frmActions.extraValidation = () => {
             let valid = true;
             _.bld.logger.log("Validate extra information");
             //Validations here
             return valid;
        }

        _.frmInputs = {};
        _.frmInputs.input1 = 'input1';
    }

    //public methods
    this.submit = () => {
        let afterSucces = (data) => {
            _.bld.logger.log("success done, data recived: " + $(data).serializeArray());
        }
        callbackObject = { url:'demo/demo', eventname:'Purchase Order, void', actionAfterSuccess : afterSucces};
        _.bld.ajaxPostAditionalValidation(callbackObject);
    }
    

    _.constructor = () =>{
        _.bld = new BuilderForm(_, false);   
        _.bld.build();
    }
    _.constructor();
}



var function1;

$(document).ready(function() {
    function1 = new FormName(); 
});



