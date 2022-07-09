import TableRow from "../types/TableRow"
import Template from '../types/Template';

const localStorage: Storage = window.localStorage

export const setLocalData = (data: TableRow[]) => {
    const localData : string = JSON.stringify(data)
    localStorage.setItem('data', localData)
}

export const getLocalData = () => {
    const data : TableRow[] = JSON.parse(localStorage.getItem('data') ?? "null")
    return data
}

export const addTemplate = (template: Template) => {
    const templates: Template[] = JSON.parse(localStorage.getItem('templates') ?? "[]")
    templates.push(template)
    const localData = JSON.stringify(templates)
    localStorage.setItem('templates', localData)
}

export const getTemplates = () => {
    const templates: Template[] = JSON.parse(localStorage.getItem('templates') ?? "[]")
    return templates
}

export const removeTemplate = (index: number) => {
    const templates: Template[] = JSON.parse(localStorage.getItem('templates') ?? "[]")
    const data = JSON.stringify(templates.filter((_, i) => i !== index))
    localStorage.setItem('templates', data)
}


