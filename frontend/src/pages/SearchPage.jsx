import React, { useState, useEffect } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import Card from '../components/Card';
import Header from '../components/Header';

const SearchPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => {
        document.title = `${import.meta.env.VITE_APP_NAME} | Hľadať štandardy`;
    }, []);

    useEffect(() => {
        const lowercasedFilter = searchValue.toLowerCase();
        const filteredData = data.filter(item =>
            item.name.toLowerCase().includes(lowercasedFilter)
        );
        setFilteredData(filteredData);
    }, [searchValue]);

    return (
        <div>
            <Header />
            <div className='min-h-screen flex flex-col items-center p-4 bg-gray-100'>
                <div className='w-full mx-auto p-6 bg-white shadow-md rounded-md mt-2'>
                    <h1 className='text-2xl sm:text-4xl font-bold text-center text-gray-700'>
                        Hľadať štandardy
                    </h1>
                    <div className='flex justify-between pt-20 pb-5 w-full gap-10'>
                        <div className='flex gap-3 w-full'>
                            <input
                                id='search'
                                name='search'
                                type='text'
                                placeholder='Hľadať šablóny ...'
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                className='text-gray-700 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                            />
                            <button
                                type='submit'
                                className='max-w-44 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
                            >
                                Hľadať
                            </button>
                        </div>
                        <DropDown />
                    </div>
                    <div className='flex flex-wrap justify-center pb-20 gap-6'>
                        {filteredData.map((item) => (
                            <Card key={item.id} {...item} />
                        ))}
                    </div>
                    <Example />
                </div>
            </div>
        </div>
    );
};

export default SearchPage;

export function Example() {
    return (
        <div className='flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6'>
            <div className='flex flex-1 justify-between sm:hidden'>
                <a
                    href='#'
                    className='relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
                >
                    Predošlé
                </a>
                <a
                    href='#'
                    className='relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
                >
                    Ďalšie
                </a>
            </div>
            <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
                <div>
                    <p className='text-sm text-gray-700'>
                        Zobrazuje sa <span className='font-medium'>1</span> až{' '}
                        <span className='font-medium'>10</span> z{' '}
                        <span className='font-medium'>97</span> výsledkov
                    </p>
                </div>
                <div>
                    <nav
                        className='isolate inline-flex -space-x-px rounded-md shadow-sm'
                        aria-label='Pagination'
                    >
                        <a
                            href='#'
                            className='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                        >
                            <span className='sr-only'>Predošlé</span>
                            <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
                        </a>
                        {/* Current: "z-10 bg-blue-500 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                        <a
                            href='#'
                            aria-current='page'
                            className='relative z-10 inline-flex items-center bg-blue-500 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                        >
                            1
                        </a>
                        <a
                            href='#'
                            className='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                        >
                            2
                        </a>
                        <a
                            href='#'
                            className='relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex'
                        >
                            3
                        </a>
                        <span className='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0'>
                            ...
                        </span>
                        <a
                            href='#'
                            className='relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex'
                        >
                            8
                        </a>
                        <a
                            href='#'
                            className='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                        >
                            9
                        </a>
                        <a
                            href='#'
                            className='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                        >
                            10
                        </a>
                        <a
                            href='#'
                            className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                        >
                            <span className='sr-only'>Ďalšie</span>
                            <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
                        </a>
                    </nav>
                </div>
            </div>
        </div>
    );
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export function DropDown() {
    return (
        <Menu as='div' className='relative inline-block text-left'>
            <div>
                <MenuButton className='h-10 items-center inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
                    Filter
                    <ChevronDownIcon className='-mr-1 h-5 w-5 text-gray-400' aria-hidden='true' />
                </MenuButton>
            </div>

            <MenuItems
                transition
                className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in'
            >
                <div className='py-1'>
                    <MenuItem>
                        {({ focus }) => (
                            <a
                                href='#'
                                className={classNames(
                                    focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                    'block px-4 py-2 text-sm'
                                )}
                            >
                                Nastavenia účtu
                            </a>
                        )}
                    </MenuItem>
                    <MenuItem>
                        {({ focus }) => (
                            <a
                                href='#'
                                className={classNames(
                                    focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                    'block px-4 py-2 text-sm'
                                )}
                            >
                                Podpora
                            </a>
                        )}
                    </MenuItem>
                    <MenuItem>
                        {({ focus }) => (
                            <a
                                href='#'
                                className={classNames(
                                    focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                    'block px-4 py-2 text-sm'
                                )}
                            >
                                Licencia
                            </a>
                        )}
                    </MenuItem>
                    <form method='POST' action='#'>
                        <MenuItem>
                            {({ focus }) => (
                                <button
                                    type='submit'
                                    className={classNames(
                                        focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block w-full px-4 py-2 text-left text-sm'
                                    )}
                                >
                                    Odhlásiť sa
                                </button>
                            )}
                        </MenuItem>
                    </form>
                </div>
            </MenuItems>
        </Menu>
    );
}

const data = [
    {
        id: 1,
        image: '../assets/contract-1.png',
        name: 'Súťažné podklady pre zdravotníctvo',
        rating: 4.5,
        usages: 1242,
        comments: [
            { username: 'Podkladnik 1', text: 'Skvelá šablóna, veľmi užitočná!' },
            { username: 'Podkladnik 2', text: 'Veľmi mi to pomohlo s projektom.' }
        ]
    },
    {
        id: 2,
        image: 'https://via.placeholder.com/300',
        name: 'Súťažné podklady pre nehnuteľnosti',
        rating: 3.7,
        usages: 343,
        comments: [
            { username: 'Podkladnik 3', text: 'Dobré, ale mohlo by to byť vylepšené.' },
            { username: 'Podkladnik 4', text: 'Bolo to pre moje potreby ok.' }
        ]
    },
    {
        id: 3,
        image: 'https://via.placeholder.com/300',
        name: 'Súťažné podklady pre verejnú dopravu',
        rating: 4.0,
        usages: 423,
        comments: [
            { username: 'Podkladnik 5', text: 'Veľmi podrobné a užitočné.' },
            { username: 'Podkladnik 4', text: 'Uľahčilo mi to prácu.' }
        ]
    },
    {
        id: 4,
        image: 'https://via.placeholder.com/300',
        name: 'Súťažné podklady pre verejné technické zariadenia',
        rating: 3.8,
        usages: 423,
        comments: [
            { username: 'Podkladnik 7', text: 'Dobrá šablóna, jednoduchá na použitie.' },
            { username: 'Podkladnik 8', text: 'Splnilo moje očakávania.' }
        ]
    },
    {
        id: 5,
        image: 'https://via.placeholder.com/300',
        name: 'Súťažné podklady pre školstvo',
        rating: 4.2,
        usages: 512,
        comments: [
            { username: 'Podkladnik 9', text: 'Veľmi užitočné pre vzdelávacie účely.' },
            { username: 'Podkladnik 10', text: 'Veľmi mi to pomohlo v mojom projekte.' }
        ]
    },
    {
        id: 6,
        image: 'https://via.placeholder.com/300',
        name: 'Súťažné podklady pre stavebníctvo',
        rating: 4.7,
        usages: 782,
        comments: [
            { username: 'Podkladnik 11', text: 'Vynikajúca šablóna pre stavebné projekty.' },
            { username: 'Podkladnik 12', text: 'Veľmi podrobné a komplexné.' }
        ]
    },
    {
        id: 7,
        image: 'https://via.placeholder.com/300',
        name: 'Súťažné podklady pre IT projekty',
        rating: 4.9,
        usages: 1024,
        comments: [
            { username: 'Podkladnik 13', text: 'Perfektné pre IT projekty.' },
            { username: 'Podkladnik 14', text: 'Vysoko odporúčané pre tech projekty.' }
        ]
    },
    {
        id: 8,
        image: 'https://via.placeholder.com/300',
        name: 'Súťažné podklady pre environmentálne projekty',
        rating: 4.3,
        usages: 467,
        comments: [
            { username: 'Podkladnik 15', text: 'Skvelé pre environmentálne iniciatívy.' },
            { username: 'Podkladnik 16', text: 'Veľmi užitočné a podrobné.' }
        ]
    }
];
