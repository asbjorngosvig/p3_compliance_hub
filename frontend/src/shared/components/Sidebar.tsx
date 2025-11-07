import { HomeIcon, DocumentTextIcon, Cog6ToothIcon, UserIcon, ArrowRightEndOnRectangleIcon, ListBulletIcon } from '@heroicons/react/24/outline'
import { Logo } from './Logo'

type SidebarItem = {
  name: string
  href: string
  current: boolean
  icon?: React.ElementType
}

const navigation: SidebarItem[] = [
  { name: 'Home', href: '/', current: true, icon: HomeIcon },
  { name: 'Data Processors', href: '/dataprocessors', current: false, icon: DocumentTextIcon },
  { name: 'Employees', href: '/employees', current: false, icon: UserIcon },
]

function classNames(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}

export function Sidebar() {
  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-white flex flex-col ">

                {/* Topsektion*/}
      <div className="flex items-center h-16 border-b white px-1">
        <div className="mx-auto w-full">
            <Logo
            showTitle
            title="ComplianceHub"
            titleSize='medium'
            logoSize='medium'
            className="mx-auto max-w-[85%]"      
            imgClassName="h-[min(12cqh,24px)]"    
            titleClassName="text-center"                                
            />
        </div>
        <ListBulletIcon
            className="text-black h-7 w-7 flex-shrink-0 hover:text-[#6A42AB] transition"
            aria-hidden="true" 
          />
      </div>

      {/* Midtersektion*/}
      <nav className="flex-1 mt-6 px-3 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <a
              key={item.name}
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current
                  ? 'bg-[#D4DFE6] text-[#2A5D83]'
                  : 'text-black hover:bg-white/5 hover:text-white',
                'group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-left transition-colors'
              )}
            >
              {Icon && (
                <Icon
                  className={classNames(
                    item.current ? 'text-[#2A5D83]' : 'text-black',
                    'h-5 w-5 flex-shrink-0'
                  )}
                  aria-hidden="true"
                />
              )}
              <span className="truncate">{item.name}</span>
            </a>
          )
        })}
      </nav>

      {/* Bundsektion*/}
      <div className="border-t border-white p-4 flex flex-col items-center space-y-3">
          <a
            href="/settings"
            className="flex items-center space-x-2 text-black hover:text-white px-2 py-2 rounded-md hover:bg-white/5 transition"
          >
            <Cog6ToothIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
            <span>Settings</span>
          </a>

          <a href='/login'>
          <ArrowRightEndOnRectangleIcon
            className="text-black h-5 w-5 flex-shrink-0 hover:text-[#2A5D83] transition"
            aria-hidden="true"
          />
          </a> 
      </div>

    </div>
  )
}

export default Sidebar
