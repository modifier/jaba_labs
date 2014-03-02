function check_text(){
    var text_field = document.getElementById('coord_y');
    var value = text_field.value;
    if(isNaN(parseFloat(value))){
        return false;
    }
    if(value>5 || value<-5){
        return false;
    }
    return true;
}

function check_submit(event){
    if(!check_text()){
        event.preventDefault();
    }
}

function start(){
    document.getElementById('coord_y').addEventListener('change', check_text);
    document.getElementById('entire_form').addEventListener('submit', check_submit);
}