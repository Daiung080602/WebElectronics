import {createSelector} from "@reduxjs/toolkit";

// employee
export const filterEmployeeSelector = (state) => state.employee.filter
export const listEmployeeSelector = (state) => state.employee.listEmployee
export const infoEmployeeSelector = (state) => state.employee.form

export const listEmployeeSelectedSelector = createSelector(
    listEmployeeSelector,
    (list) => {
        return list.filter((employee) => {
            return employee.selected
        })
    }
)

export const listEmployeeRemainingSelector = createSelector(
    listEmployeeSelector,
    filterEmployeeSelector,
    (list, filter) => {
    return list.filter((employee) => {
        if (filter.role === 'Quyền') {
            return employee.id.includes(filter.searchText) || employee.fullname.includes(filter.searchText)
        }
        return (employee.id.includes(filter.searchText) || employee.fullname.includes(filter.searchText))
            && employee.role === filter.role
    })
})