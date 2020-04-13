
function BuilderForm(_, disableLog = false){

    let private = {};
    this.definitions = {};
    
    {//Build buttons click
        this.definitions.btnName = "btn"; //Declare _.btn = {} 
        this.definitions.btnOnClickName = "onClick"; //Declare _.onClick = {}   

        private.buildButtonsAndActionButtons = () => {
            //Validate if exist _.btn object
            private.objectExist(this.definitions.btnName);
            //Validate if exist _.onClick object
            private.objectExist(this.definitions.btnOnClickName);
            //validate if object item has ibject actuion
            private.ValidateActionByItemName(this.definitions.btnName,this.definitions.btnOnClickName); 
            //validate if object item exist in html
            private.ValidateExistense(this.definitions.btnName);
            //Adding buttons and events
            private.RegisterBtnActions();

            this.logger.log("Buttons and accions registered succesfully");
        }
       
        private.RegisterBtnActions = () => {
            let registerActions = (name, asset) => {
                let elementId = document.getElementById(_[this.definitions.btnName][name]);
                $(elementId).off().click(_[this.definitions.btnOnClickName][name]);
            };
            private.coreForeach(this.definitions.btnName,registerActions);
        }
        
    }

    { //Build Form and inputs
        /*  
            Declare to use standard ajax  let callbackObject = { url:'', eventname:'', actionAfterSuccess : (result) => {}};//function error optional
            Methods 
            _.bld.ajaxPost(callbackObject) // validate form and post to url
            _.bld.ajaxPostAditionalValidation(callbackObject) // extra validation included  _.frmActions.extraValidation();
        */

        this.definitions.FormObject = "frmItems";
        this.definitions.FormName = "Name";
        
        this.definitions.EnableChanges = true;
        this.definitions.ChangeId = "changes";
        
        this.definitions.FormActionObject = "frmActions";
        this.definitions.FormActionsDefault = {
           ExtraValidation: "extraValidation"
        };
        
        private.buildForm = () =>{
            //Validate if exist form names
            private.objectExist(this.definitions.FormObject);
             //Validate if exist form name
             private.objectExist(this.definitions.FormActionObject);
            //Validate if exist form actions
            private.objectExist(this.definitions.FormActionObject);
            //validate if object item exist in html
            private.ValidateExistense(this.definitions.FormObject);
            //Validate default actions
            private.ValidateActions(this.definitions.FormActionsDefault,this.definitions.FormActionObject)
            
            //Enable/Disble on changes
            private.ListenerForm();
            
            this.logger.log("Form registered succesfully");
        }
        private.ListenerForm = () => {
            let idchanged = this.definitions.ChangeId;
            if(this.definitions.EnableChanges){
                let form = document.getElementById(_[this.definitions.FormObject][this.definitions.FormName]);
                form.addEventListener('change', function() {
                    $(form).data(idchanged,true);
                });
                this.logger.log("Listener changes enable, to disable declare _.bld.definitions.EnableChanges = false;");
            }
            else{
                this.logger.log("Listener changes disabled, to enable declare _.bld.definitions.EnableChanges = true;");
            }
        }

    }

    { //Callback
        //this.callbackObject = { url:'', eventname:'', actionAfterSuccess = (result) => {}};//function error optional
        this.definitions.errorMethod = "error";

        private.ajaxPost = (objectCallback) => {
            let formItem = document.getElementById(_[this.definitions.FormObject][this.definitions.FormName]);
            if($(formItem).valid())
            {
                let datapost = $(formItem).serialize(); //TODO vallidate if is able to change to sereializeArray
                this.showLoadingEvent();
                $.ajax({
                    url: objectCallback.url,
                    data: datapost,
                    method: "POST",
                    success: objectCallback.actionAfterSuccess,
                    error: (err) => {
                        if(objectCallback[this.definitions.errorMethod])
                            objectCallback[this.definitions.errorMethod]();
                        else
                            this.logger(err, this.logger.loggerError)
                    },
                    complete: this.hideLoadingEvent
                });
            }
        }
        private.ajaxPostAditionalValidation = (callbackObject) =>{
            let validatePost = _[this.definitions.FormActionObject][this.definitions.FormActionsDefault.ExtraValidation];
            if(validatePost())
                private.ajaxPost(callbackObject);
        }

    }

    { // Internal events
        private.objectExist = (itemSearch) => {
            if(_[itemSearch] == undefined)
            {
                this.logger.log(`Declare _.${itemSearch} = {} to build automatically`, this.logger.loggerError)
                throw "An error ocurred";
            }
        }
        private.ValidateExistense = (objectName)  =>{            
            let validateButtonsExistense = (name, asset) =>{
                let idname = document.getElementById(_[objectName][name]);
                if(!private.itemExist(idname)){
                    this.logger.log(`_.${objectName}.${name} = "${_[objectName][name]}" not found in the page`, this.logger.loggerError);
                    throw "An error ocurred";
                }
           }
           private.coreForeach(objectName,validateButtonsExistense);
        }
        private.ValidateActionByItemName = (objectItemName, objectActionName) =>{
            let validateActionbyItemName = (name,asset) =>{
                if(_[objectActionName][name]  === undefined ){
                    this.logger.log(`Function Undeclared: _.${objectActionName}.${name}`, this.logger.loggerError);
                    throw "An error ocurred";
                }
            }
            private.coreForeach(objectItemName,validateActionbyItemName);
        };

        private.ValidateActions = (collection, objectName) =>{
            let validateActions = (name,value) =>{
                let actiondefined = _[objectName][value];
                if(actiondefined  == undefined ){
                    this.logger.log(`Function Undeclared: _.${objectName}.${name}`, this.logger.loggerError);
                    throw "An error ocurred";
                }
            }
            $.each(collection, validateActions);
        };

        private.itemExist = (itemProperty) =>{
            return $("body").find(itemProperty).length > 0;
        }
        private.coreForeach = (objectName,events) => {
            $.each(_[objectName], events);
        }      
    }

    { // Global definitions
        this.logger = new Logger(disableLog);

        this.build = () => {
            private.buildButtonsAndActionButtons();
            private.buildForm();
        }

        //Ajax methods
        this.ajaxPost = private.ajaxPost;
        this.ajaxPostAditionalValidation = private.ajaxPostAditionalValidation;
        
        //Functions allow to overwrite
        this.showLoadingEvent = () =>{//TODO show/hide loading
        }
        this.hideLoadingEvent = () =>{//TODO show/hide loading

        }
    }
}



function Logger(disableLog = false){
    this.displayLog = !disableLog;
    this.displayConsole = !disableLog;
    this.LoggerId = "logger";
    
    this.loggerWarning = "#fcff52";
    this.loggerInfo = "#00ffad";
    this.loggerError = "#ff005e";
    

    this.disableLog = () =>{
        this.displayLog = false;
        this.displayConsole = false;
    };

    this.enableLogger = () =>{
        this.displayLog = true;
        this.displayConsole = true;
    };

    this.log = (msg, messageColor = this.loggerInfo) =>{
         if(this.displayLog){
            let logerIdName = this.LoggerId;
            let loogerdocument = document.getElementById(logerIdName);
            if(loogerdocument == null){
                $('body').append(`<div style='background-color:black;color:white' id='${logerIdName}'><h6>Debugger enable</h6><ul></ul>**To disable logger create instance: new Builder(_ ,true); </br> If you're using Logger(), disabled it using internal methods</div>`);
                loogerdocument = document.getElementById(logerIdName);
            }
            $(loogerdocument).find("ul").append(`<li style='color:${messageColor}' >[logger]: ${msg}</li>`);
        }
        if(this.displayConsole)
            console.log(`[logger]: ` + msg);
    };
};



var Definer = {
    setDatePickerDefault : (idItem) => {
        let _default = $(`#${idItem}`).val();
        if(_default === "1/1/0001 12:00:00 AM")
           $(`#${idItem}`).val(null);
        $(`#${idItem}`).datepicker({
            showOn: 'focus',
            changeMonth: true,
            changeYear: true,
            maxDate: "+100y",//This need to be according to the yearRange.
            minDate: "-100y",//This need to be according to the yearRange.
            yearRange: "c-100:c+100",
            altFormat: "mm/dd/yy",
            dateFormat: "mm/dd/yy",
            onClose: function (date, datepicker) {
                datepicker.input.valid();
            }
        });
    
        $(`#${idItem}`).inputmask('99/99/9999');
    },
}

$.fn.DateStandard_560 = function() {
      $(this).datepicker({
        showOn: 'focus',
        changeMonth: true,
        changeYear: true,
        maxDate: "+100y",//This need to be according to the yearRange.
        minDate: "-100y",//This need to be according to the yearRange.
        yearRange: "c-100:c+100",
        altFormat: "mm/dd/yy",
        dateFormat: "mm/dd/yy",
        onClose: function (date, datepicker) {
            datepicker.input.valid();
        }
        });
    }
  
    $.fn.BtnAccept = function(){
        $(this).addClass('btn btn-success');
        $(this).html('Save');
    }
    $.fn.Update = function(){
        $(this).addClass('btn btn-warning');
        $(this).html('Update');
    }
//TODO: validate existense of formName
