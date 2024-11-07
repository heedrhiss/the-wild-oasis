import SideNavigation from "@/app/_components/SideNavigation"

type Props = {
    children: React.ReactNode
}
function layout({children}:Props) {
  return (
    <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
        <SideNavigation/>
        <div className="p-1">{children}</div>
    </div>
  )
}

export default layout
