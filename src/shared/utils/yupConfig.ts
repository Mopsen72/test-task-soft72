import {enumerate} from './enumerate.ts'
import {type LocaleObject, printValue} from "yup";

export const mixed: LocaleObject['mixed'] = {
    default: '${path} является недействительным.',
    required: 'Обязательное поле',
    defined: '${path} должен быть определен',
    notNull: '${path} не может быть нулевым',
    oneOf: '${path} должен быть одним из следующих значений: ${values}',
    notOneOf: '${path} не должен быть одним из следующих значений: ${values}',
    notType: ({path, type, value, originalValue}) => {
        const isCast = originalValue != null && originalValue !== value
        let msg =
            `${path} должен быть \`${type}\` тип, ` +
            `Но окончательное значение было: \`${printValue(value, true)}\`` +
            (isCast ? ` (бросить из значения \`${printValue(originalValue, true)}\`).` : '.')

        if (value === null) {
            msg +=
                `\n Если «нуль» предназначено как пустое значение, обязательно отметить схему как` +
                ' `.nullable()`'
        }

        return msg
    }
}

export const string: LocaleObject['string'] = {
    length: ({length}): string => {
        return `Должно содержать ${length} ${enumerate(length, ['символ', 'символа', 'символов'])}`
    },
    min: ({min}): string => {
        return `Должно содержать не менее ${min} ${enumerate(min, ['символа', 'символов', 'символов'])}`
    },
    max: ({max}): string => {
        return `Должно содержать не более ${max} ${enumerate(max, ['символа', 'символов', 'символов'])}`
    },
    matches: '${path} должен соответствовать следующему: "${regex}"',
    email: 'Должно быть корректное значение',
    url: '${path} должен быть действительный URL',
    uuid: '${path} должен быть действительным UUID',
    trim: '${path} Должен быть обрезанной строкой',
    lowercase: '${path} Должен быть строчной строкой',
    uppercase: '${path} должна быть строка верхнего чехла'
}

export const number: LocaleObject['number'] = {
    min: '${path} должен быть больше или равен ${min}',
    max: '${path} должно быть меньше или равна ${max}',
    lessThan: '${path} должно быть меньше, чем ${less}',
    moreThan: '${path} должен быть больше, чем ${more}',
    positive: '${path} должно быть положительным числом',
    negative: '${path} должно быть отрицательным числом',
    integer: '${path} должно быть целым числом'
}

export const date: LocaleObject['date'] = {
    min: '${path} Поле должно быть позже ${min}',
    max: '${path} Поле должно быть в более раннем, чем ${max}'
}

export const boolean: LocaleObject['boolean'] = {
    isValue: '${path} Поле должно быть ${value}'
}

export const object: LocaleObject['object'] = {
    noUnknown: 'Поле ${path} не может иметь ключи, не указанные в форме объекта'
}

export const array: LocaleObject['array'] = {
    min: ({min}): string => {
        return `Должно содержать хотя бы ${min} ${enumerate(min, ['выбранный элемент', 'выбранных элемента', 'выбранных элемента'])}`
    },
    max: '${path} Поле должно иметь меньше или равное ${max} элементам',
    length: '${path} должны иметь ${length} элементы'
}

export default Object.assign(Object.create(null), {
    mixed,
    string,
    number,
    date,
    object,
    array,
    boolean
})