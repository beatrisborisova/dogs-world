import { useEffect, useState } from "react"

const errorsInitialState = {
    breed: {
        isValid: '',
        value: ''
    },
    age: {
        isValid: '',
        value: ''
    },
    gender: {
        isValid: '',
        value: ''
    },
    image: {
        isValid: '',
        value: ''
    },
    vaccines: {
        isValid: '',
        value: ''
    },
    description: {
        isValid: '',
        value: ''
    },
    type: {
        isValid: '',
        value: ''
    },
}


export const Error = ({ type, value }) => {
    const [errors, setErrors] = useState(errorsInitialState);

    if (type === 'breed') {
        if (value === "") {
            setErrors(oldState => {
                return { ...oldState, breed: { isValid: false, value: 'Breed field is required' } }
            })
        }
        if (value.length < 3) {
            setErrors(oldState => {
                return { ...oldState, breed: { isValid: false, value: 'Breed must be at least 3 characters long' } }
            })
        } else {
            setErrors(oldState => {
                return { ...oldState, breed: { isValid: true, value: '' } }
            })
        }

    }

    return (
        <div>Error component</div>
    )
}