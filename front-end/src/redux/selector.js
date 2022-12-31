import {createSelector} from "@reduxjs/toolkit";

// office
export const filterOfficeSelector = (state) => state.office.filter
export const listOfficeSelector = (state) => state.office.listOffice
export const infoOfficeSelector = (state) => state.office.form

export const listOfficeRemainingSelector = createSelector(
    listOfficeSelector,
    filterOfficeSelector,
    (list, filter) => {
    return list.filter((office) => {
        if (filter.role === 'Quyền' || filter.role === 'Tất cả') {
            return office.id === filter.searchText || office.name.includes(filter.searchText)
        }
        let role = 0
        switch (filter.role) {
            case 'Admin':
                role = 1
                break
            case 'Đại lý':
                role = 2
                break
            case 'Cơ sở bảo hành':
                role = 3
                break
            case 'Cơ sở sản xuất':
                role = 4
                break
        }
        return ((office.id === filter.searchText) || office.name.includes(filter.searchText))
            && office.role === role
    })
})

// productline
export const filterProductLineSelector = (state) => state.productline.filter
export const listProductLineSelector = (state) => state.productline.listProductLine
export const infoProductLineSelector = (state) => state.productline.form

export const listProductLineRemainingSelector = createSelector(
    listProductLineSelector,
    filterProductLineSelector,
    (list, filter) => {
        return list.filter((product) => {
            let filterSearch = product.productline_id.includes(filter.searchText)
            let filterType
            let filterDate
            if (filter.type === 'Danh mục' || filter.type === "Tất cả") {
                filterType = true
            } else {
                filterType = product.type === filter.type
            }
            switch (filter.date) {
                case "0-6 tháng":
                    filterDate = product.date_warranty > 0 && product.date_warranty <= 6
                    break
                case "6-12 tháng":
                    filterDate = product.date_warranty > 6 && product.date_warranty <= 12
                    break
                case "Lớn hơn 1 năm":
                    filterDate = product.date_warranty > 12
                    break
                default:
                    filterDate = true
            }
            return filterSearch && filterType && filterDate
        })
    })

// product
export const filterProductSelector = (state) => state.product.filter
export const listProductSelector = (state) => state.product.listProduct
export const infoProductSelector = (state) => state.product.form

export const listProductRemainingSelector = createSelector(
    listProductSelector,
    filterProductSelector,
    (list, filter) => {
        return list.filter((product) => {
            // let filterSearch = product.product_id === filter.searchText
            let filterSearch = true
            let filterState
            if (filter.state === 'Trạng thái' || filter.state === "Tất cả") {
                filterState = true
            } else {
                filterState = product.state === filter.state
            }
            //todo
            let checkAgent = false
            let checkWarranty = false
            let checkExport = false
            let filterOffice = true
            if (!filter.office.isEmpty) {
                if (product.agent) {
                    checkAgent = product.agent.name.includes(filter.office)
                }
                if (product.warranty) {
                    checkWarranty = product.warranty.name.includes(filter.office)
                }
                checkExport = product.lot.office.name.includes(filter.office)
                filterOffice = checkAgent || checkWarranty || checkExport
            }
            console.log(filterSearch, " ", filterState, " ", filterOffice)
            return filterSearch && filterState && filterOffice

        })
    })

// customer
export const filterCustomerSelector = (state) => state.customer.filter
export const listCustomerSelector = (state) => state.customer.listCustomer
export const infoCustomerSelector = (state) => state.customer.form

export const listCustomerRemainingSelector = createSelector(
    listCustomerSelector,
    filterCustomerSelector,
    (list, filter) => {
        return list.filter((customer) => {
            console.log(customer.customer_id, " ", filter.searchText)
            return customer.customer_id == filter.searchText || customer.fullname.includes(filter.searchText)
        })
    })

//lots
export const filterLotsSelector = (state) => state.lots.filter
export const listLotsSelector = (state) => state.lots.listLots
export const infoLotsSelector = (state) => state.lots.form

export const listLotsRemainingSelector = createSelector(
    listLotsSelector,
    filterLotsSelector,
    (list, filter) => {
        return list.filter((lot) => {
            return true
        })
    })

