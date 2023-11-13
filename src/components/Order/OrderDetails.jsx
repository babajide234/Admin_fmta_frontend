// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import orderSlice from '../../store/orderStore'
import { useQuery } from 'react-query'
import GoBack from '../GoBack'
import DashHeader from '../Dash/DashHeader'

const OrderDetails = ({ orderNumber, goBack }) => {
    const getSingleOrder = orderSlice.getState().getSingleOrder

    const { data } = useQuery(`get ${orderNumber}`, () => getSingleOrder(orderNumber))
    return (
        <main>
            <header>
                <GoBack onClick={goBack}>Go back</GoBack>
                <DashHeader text={`Order ${orderNumber} Details`} />
            </header>
            <section>
                <div className="grid grid-cols-5 items-center gap-2 py-2">
                    <p className="p4 font-extrabold tertiary col-span-1">Order number</p>
                    <p className="p4 font-extrabold tertiary col-span-4">Order number</p>
                </div>
                <div className="grid grid-cols-5 items-center gap-2 py-2">
                    <p className="p4 font-extrabold tertiary col-span-1">Order number</p>
                    <p className="p4 font-extrabold tertiary col-span-4">Order number</p>
                </div>
                <div className="grid grid-cols-5 items-center gap-2 py-2">
                    <p className="p4 font-extrabold tertiary col-span-1">Order number</p>
                    <p className="p4 font-extrabold tertiary col-span-4">Order number</p>
                </div>
                <div className="grid grid-cols-5 items-center gap-2 py-2">
                    <p className="p4 font-extrabold tertiary col-span-1">Order number</p>
                    <p className="p4 font-extrabold tertiary col-span-4">Order number</p>
                </div>
                <div className="grid grid-cols-5 items-center gap-2 py-2">
                    <p className="p4 font-extrabold tertiary col-span-1">Order number</p>
                    <p className="p4 font-extrabold tertiary col-span-4">Order number</p>
                </div>
                <div className="grid grid-cols-5 items-center gap-2 py-2">
                    <p className="p4 font-extrabold tertiary col-span-1">Order number</p>
                    <p className="p4 font-extrabold tertiary col-span-4">Order number</p>
                </div>
                <div className="grid grid-cols-5 items-center gap-2 py-2">
                    <p className="p4 font-extrabold tertiary col-span-1">Order number</p>
                    <p className="p4 font-extrabold tertiary col-span-4">Order number</p>
                </div>
                <div className="grid grid-cols-5 items-center gap-2 py-2">
                    <p className="p4 font-extrabold tertiary col-span-1">Order number</p>
                    <p className="p4 font-extrabold tertiary col-span-4">Order number</p>
                </div>
                <div className="grid grid-cols-5 items-center gap-2 py-2">
                    <p className="p4 font-extrabold tertiary col-span-1">Order number</p>
                    <p className="p4 font-extrabold tertiary col-span-4">Order number</p>
                </div>
                <div className="grid grid-cols-5 items-center gap-2 py-2">
                    <p className="p4 font-extrabold tertiary col-span-1">Order number</p>
                    <p className="p4 font-extrabold tertiary col-span-4">Order number</p>
                </div>
                <div className="grid grid-cols-5 items-center gap-2 py-2">
                    <p className="p4 font-extrabold tertiary col-span-1">Order number</p>
                    <p className="p4 font-extrabold tertiary col-span-4">Order number</p>
                </div>
                <div className="grid grid-cols-5 items-center gap-2 py-2">
                    <p className="p4 font-extrabold tertiary col-span-1">Order number</p>
                    <p className="p4 font-extrabold tertiary col-span-4">Order number</p>
                </div>
                <div className="grid grid-cols-5 items-center gap-2 py-2">
                    <p className="p4 font-extrabold tertiary col-span-1">Order number</p>
                    <p className="p4 font-extrabold tertiary col-span-4">Order number</p>
                </div>
                <div className="grid grid-cols-5 items-center gap-2 py-2">
                    <p className="p4 font-extrabold tertiary col-span-1">Order number</p>
                    <p className="p4 font-extrabold tertiary col-span-4">Order number</p>
                </div>
                <div className="grid grid-cols-5 items-center gap-2 py-2">
                    <p className="p4 font-extrabold tertiary col-span-1">Order number</p>
                    <p className="p4 font-extrabold tertiary col-span-4">Order number</p>
                </div>
                <div className="grid grid-cols-5 items-center gap-2 py-2">
                    <p className="p4 font-extrabold tertiary col-span-1">Order number</p>
                    <p className="p4 font-extrabold tertiary col-span-4">Order number</p>
                </div>
                <div className="grid grid-cols-5 items-center gap-2 py-2">
                    <p className="p4 font-extrabold tertiary col-span-1">Order number</p>
                    <p className="p4 font-extrabold tertiary col-span-4">Order number</p>
                </div>
                <div className="grid grid-cols-5 items-center gap-2 py-2">
                    <p className="p4 font-extrabold tertiary col-span-1">Order number</p>
                    <p className="p4 font-extrabold tertiary col-span-4">Order number</p>
                </div>
                <div className="grid grid-cols-5 items-center gap-2 py-2">
                    <p className="p4 font-extrabold tertiary col-span-1">Order number</p>
                    <p className="p4 font-extrabold tertiary col-span-4">Order number</p>
                </div>
            </section>
        </main>
    )
}

OrderDetails.propTypes = {
    orderNumber: PropTypes.string,
    goBack: PropTypes.func
}

export default OrderDetails