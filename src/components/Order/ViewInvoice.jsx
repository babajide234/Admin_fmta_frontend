// eslint-disable-next-line no-unused-vars
import React from 'react'
import Logo from '../assets/img/fmta.png'

const ViewInvoice = () => {
    return (
        <main className='pt-14'>
            <section className='px-8'>
                <section className="flex flex-col">
                    <header className='w-full flex justify-between items-center mb-10'>
                        <img src={Logo} alt='Firstmed trade logo' className='w-[30rem]' />
                        <div className="">
                            <p className=" text-xl font-semibold">NO: <span className=" font-bold">INV-1000728</span></p>
                        </div>
                    </header>
                    <ul className="mb -20">
                        <li className="mb-2 text-lg">20 Paul Odulaja Street, Gbagada, Lagos</li>
                        <li className="mb-2 text-lg">www.firstmedtrade.com</li>
                        <li className="mb-2 text-lg">info@firstmedtrade.com</li>
                        <li className="mb-2 text-lg">Tel: 07012367770</li>
                    </ul>
                </section>
                <section className="invoicee">
                    <div className="w-full grid grid-cols-4">
                        <div className="col-span-1 ">
                            <p className='font-bold tertiary'>No</p>
                        </div>
                        <div className="col-span-2">
                            <p className="p4 tertiary font-bold">
                            </p>
                        </div>
                    </div>
                </section>
            </section>
        </main>
    )
}

export default ViewInvoice