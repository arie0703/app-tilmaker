import TableRow from "../types/TableRow"

const localStorage: Storage = window.localStorage

export const setLocalData = (data: TableRow[]) => {
    const localData : string = JSON.stringify(data)
    localStorage.setItem('data', localData)
}

export const getLocalData = () => {
    const localData : TableRow[] = JSON.parse(localStorage.getItem('data') ?? "null")
    return localData
}