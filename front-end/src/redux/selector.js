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

// productline
export const filterProductSelector = (state) => state.product.filter
export const listProductSelector = (state) => state.product.listProduct
export const infoProductSelector = (state) => state.product.form

export const listProductSelectedSelector = createSelector(
    listProductSelector,
    (list) => {
        return list.filter((product) => {
            return product.selected
        })
    }
)

export const listProductRemainingSelector = createSelector(
    listProductSelector,
    filterProductSelector,
    (list, filter) => {
        return list.filter((product) => {
            let filterSearch = product.name.includes(filter.searchText)
            let filterCatalog
            let filterWarantyPeriod
            if (filter.catalog === 'Danh mục' || filter.catalog === "Tất cả") {
                filterCatalog = true
            } else {
                filterCatalog = product.catalog === filter.catalog
            }
            switch (filter.warrantyPeriod) {
                case "0-6 tháng":
                    filterWarantyPeriod = product.warrantyPeriod > 0 && product.warrantyPeriod <= 6
                    break
                case "6-12 tháng":
                    filterWarantyPeriod = product.warrantyPeriod > 6 && product.warrantyPeriod <= 12
                    break
                case "Lớn hơn 1 năm":
                    filterWarantyPeriod = product.warrantyPeriod > 12
                    break
                default:
                    filterWarantyPeriod = true
            }
            return filterSearch && filterCatalog && filterWarantyPeriod
        })
    })

// office
export const filterOfficeSelector = (state) => state.office.filter
export const listOfficeSelector = (state) => state.office.listOffice
export const infoOfficeSelector = (state) => state.office.form

export const listOfficeSelectedSelector = createSelector(
    listOfficeSelector,
    (list) => {
        return list.filter((office) => {
            return office.selected
        })
    }
)

export const listOfficeRemainingSelector = createSelector(
    listOfficeSelector,
    filterOfficeSelector,
    (list, filter) => {
        return list.filter((office) => {
            let filterSearch = office.id.includes(filter.searchText) || office.name.includes(filter.searchText)
            let filterType
            let filterAddress
            if (filter.type === 'Loại cơ sở' || filter.type === "Tất cả") {
                filterType = true
            } else {
                filterType = office.type === filter.type
            }
            if (filter.address === 'Khu vực' || filter.address === 'Tất cả') {
                filterAddress = true
            } else {
                filterAddress = office.address === filter.address
            }
            return filterSearch && filterType && filterAddress
        })
    })