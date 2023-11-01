// eslint-disable-next-line no-unused-vars
import React from 'react'
import GoBack from '../components/GoBack'
import DashHeader from '../components/Dash/DashHeader'
import GenerateInvoiceForm from '../components/forms/GenerateInvoiceForm'

const Invoice = () => {
    return (
        <main className='w-full h-full pb-36'>
            <GoBack to={'/orders'}>Go back</GoBack>
            <DashHeader text={'Generate invoice'} />
            <GenerateInvoiceForm />
        </main>
    )
}

export default Invoice