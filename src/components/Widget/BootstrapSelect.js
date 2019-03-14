import 'bootstrap/js/dropdown';
import 'bootstrap-select';
import 'bootstrap-select/dist/css/bootstrap-select.css'

function createBootstrapSelect(node) {
    $(node).selectpicker({
        style: 'btn-default'
    });
}

export { createBootstrapSelect }