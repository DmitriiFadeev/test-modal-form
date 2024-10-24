import {useField, useForm} from "vee-validate";
import * as yup from "yup";
import type {Option} from '../baseSelect/BaseSelect.vue'
import {setForm} from "../../use/modalForm.ts";

export function useModalForm() {
    const {handleSubmit, isSubmitting} = useForm()

    const {value: orgName, errorMessage: nError, handleBlur: nBlur} = useField(
        'orgName',
        yup
            .string()
            .trim()
            .required('Обязательное поле'),
        {
            initialValue: ''
        }
    )
    const {value: phone, errorMessage: pError, handleBlur: pBlur} = useField(
        'phone',
        yup
            .string()
            .required('Обязательное поле'),
        {
            initialValue: ''
        }
    )
    const {value: roomType, errorMessage: tError, handleBlur: tBlur} = useField<Option[]>(
        'roomType',
        yup
            .array().min(1, "Обязательное поле").required(),
        {
            initialValue: []
        }
    )
    const {value: address, errorMessage: aError, handleBlur: aBlur} = useField(
        'address',
        yup
            .string()
            .trim()
            .required('Обязательное поле'),
        {
            initialValue: ''
        }
    )
    const {value: spaceRangeMin, errorMessage: sMinError, handleBlur: sMinBlur} = useField(
        'spaceRangeMin',
        yup
            .number()
            .min(1, 'Минимальное значени 1')
            .required('Обязательное поле'),
        {
            initialValue: 0
        }
    )
    const {value: spaceRangeMax, errorMessage: sMaxError, handleBlur: sMaxBlur} = useField(
        'spaceRangeMax',
        yup
            .number()
            .min(1, 'Минимальное значени 1')
            .required('Обязательное поле'),
        {
            initialValue: 1000
        }
    )

    const {value: rentStart, errorMessage: rStartError, handleBlur: rStartBlur} = useField(
        'rentStart',
        yup
            .string()
            .required('Обязательное поле'),
        {
            initialValue: ''
        }
    )
    const {value: rentEnd, errorMessage: rEndError, handleBlur: rEndBlur} = useField(
        'rentEnd',
        yup
            .string()
            .required('Обязательное поле'),
        {
            initialValue: ''
        }
    )

    const changeSelect = ({value, multiple}: {
        value: Option;
        multiple: boolean;
    }) => {
        const res = roomType.value.find(
            (s: Option) => s.code === value.code
        );

        if (res) {
            roomType.value = roomType.value.filter(
                (s: Option) => s.code !== value.code
            );
        } else {
            if (multiple) {
                roomType.value = [...roomType.value, value];
                return;
            }

            roomType.value = [value];
        }
    };


    const onSubmit = handleSubmit(async (values) => {
        await setForm(values)
    })

    return {orgName, phone, roomType, address, onSubmit, nError, pError, tError, aError, spaceRangeMin, spaceRangeMax, sMinError, sMaxError, rentStart, rentEnd, rStartError, rEndError, sMinBlur, sMaxBlur, nBlur, pBlur, tBlur, aBlur, rStartBlur, rEndBlur, isSubmitting, changeSelect};
}