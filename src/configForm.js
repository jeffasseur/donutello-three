export default class Form {

    constructor() {
        this.icingColor = document.querySelector('#icingcolor').value;
        this.submit = document.querySelector('#bakeDonut');
    
    }
    
    changeIcingColor() {
        this.submit.addEventListener('click', function(e) {
            let brandColor = this.icingColor.value;
            console.log(brandColor);
            e.preventDefault();
        });
    
    }
    
}

