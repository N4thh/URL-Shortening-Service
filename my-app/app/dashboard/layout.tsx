    import Link from 'next/link'
    import React, { ReactNode } from 'react'

    const HomePageLayout = ({children} : { children : ReactNode}) => {
    
        return (
        <div className='min-h-screen flex flex-col bg-white text-black'>
            <header className='border border-[#a8dbc8] px-6 py-6 font-semibold '>
                <div className='flex justify-between items-center mx-40'>
                    <p className='text-2xl items-center '>Shortly</p>
            
                    <Link href={"/homepage"}
                    className='text-[#6d7482] hover:border-[#3eb489] rounded-xl hover:bg-[#3eb489] hover:text-[#474c53] px-3 py-2 transition'>
                    Back To HomePage</Link>
                </div>
            </header>

            <main className="flex-1">
                <div className="max-w-[92rem] mx-auto px-6 sm:px-6 md:px-20 py-10">
                {children}
                </div>
            </main>

            <footer className='border border-[#a8dbc8] px-6 py-6'>
                <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-sm">
                    <p>2026 Shortly. Build with React & Tailwind CSS</p>

                    <a
                        href="https://github.com/N4thh/URL-Shortening-Service"
                        className="hover:text-gray-600 flex items-center space-x-3"
                        target="_blank"
                    >Github</a>
                </div>

                <p className="text-center mt-3 text-sm">
                A portfolio project demonstrating modern web development practices.
                </p>

            </footer>
        </div>
    )
    }

    export default HomePageLayout