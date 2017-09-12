import React from 'react';
import DatePicker from 'material-ui/DatePicker';

// const DatePickerForm = (props) => {
//     console.log('date picker props',props);
//
//     function handleChangeMinDate(event,date) {
//         const errors ={};
//         console.log('dates',date);
//         let today = new Date();
//         let year = date.getFullYear();
//         let month = date.getMonth();
//         let day = date.getDate();
//         let bday = new Date((year + 13), month, day);
//
//         if(today.getTime() - bday.getTime() < 0){
//             errors.birthday ="too young";
//         }
//         return errors;
//     }
//     return(
//         <div>
//             <DatePicker
//                 id="datePicker"
//                 onChange={handleChangeMinDate}
//                 defaultDate={props.defaultValue.min}
//                 autoOk={false}
//                 errorText={props.meta.touched && (props.meta.error && <span className="errorMsg">{props.meta.error}</span>)}
//
//             />
//         </div>
//     )
//
// };
//
// export default DatePickerForm;
export default ({ input, label, meta: { touched, error }, ...custom }) => {

    return (
        <DatePicker
            id="datePicker"
            onChange={(e, val) => console.log('vals eh',input.onChange(val))}
            defaultDate={custom.defaultValue.min}
            errorText={touched && (error && <span className="errorMsg">{error}</span>)}
            onDismiss={()=> custom.onClose()}
            okLabel="Select"
        />
    );
}