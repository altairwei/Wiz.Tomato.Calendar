import $ from 'jquery';
import './Widget/ColorPicker';
import './Widget/EventPopover/EventPopover';
import './test.css';
import {createDatetimePicker} from './Widget/DateTimePicker'

$(document).ready(function(){
    $('.color-input').ColorPicker({
		saturations: 2,
		shades: 5,
		customColors: [ '#32CD32', '#5484ED', '#A4BDFE', 
		'#46D6DB', '#7AE7BF', '#51B749',
		'#FBD75B', '#FFB878', '#FF887C', 
		'#DC2127', '#DBADFF', '#E1E1E1'	]
	});

	createDatetimePicker($('.time-input'));

})