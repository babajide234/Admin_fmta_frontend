// eslint-disable-next-line no-unused-vars
import React from 'react'
import DashHeader from '../Dash/DashHeader'
import GenerateInvoiceForm from '../forms/GenerateInvoiceForm'

const Invoice = () => {
    return (
        <main className='w-full h-full pb-14 px-[100px]'>
            <DashHeader text={'Generate invoice'} />
            <GenerateInvoiceForm />
        </main>
    )
}

export default Invoice