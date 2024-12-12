"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

interface FilterButtonProp {
    children: React.ReactNode
    filter: string
    active: string
}

function Filter() {
    const searchParams = useSearchParams()
    const active = searchParams?.get("capacity") ?? "all"

    return (
        <div className="flex border border-primary-800">
        <FilterButton active={active} filter="all">All</FilterButton>
        <FilterButton active={active} filter="small">Capacity 1&mdash;3</FilterButton>
        <FilterButton active={active} filter="medium">Capacity 4&mdash;7</FilterButton>
        <FilterButton active={active} filter="large">Capacity 8&mdash;12</FilterButton>
        </div>
    )
}

const FilterButton = ({ children, filter, active }:FilterButtonProp) => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    function handleClick(filter:string){
        const params = new URLSearchParams(searchParams)
        params.set("capacity", filter)
        router.replace(`${pathname}?${params.toString()}`, {scroll: false})
        }
    return (
        <button className={`px-5 py-2 text-primary-200 hover:bg-primary-700 hover:text-accent-500 ${active === filter ? "bg-accent-500 text-primary-200" : ""}`} onClick={()=>handleClick(filter)}>
            {children}
        </button>
    )
}

export default Filter
