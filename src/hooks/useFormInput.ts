import { ChangeEventHandler, FormEvent, useState } from 'react';

export function useFormInput(initialValue: string) {
    const [value, setValue] = useState<string>(initialValue);

    function handleOnChange(e: FormEvent<HTMLInputElement>) {
        setValue(e.currentTarget.value);
    }

    return {
        value,
        onChange: handleOnChange as ChangeEventHandler<any> | undefined,
    };
}
