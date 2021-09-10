import {useState} from "react";

export default function useChecked(initialValue) {
    const [checked, setValue] = useState(initialValue)

    const onChange = e => {
        setValue(e.target.checked)
    }

    return {
        checked, onChange
    }
}