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

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function Sidebar({
  isCollapsed,
  toggle,
}: {
  isCollapsed: boolean
  toggle: () => void
}) {
  return (
    <div
      className={classNames(
        'fixed top-0 left-0 h-full bg-white flex flex-col transition-all duration-300 ease-in-out',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Topsektion */}
        <div
          className={classNames(
            'flex items-center h-16 border-b border-black/10 px-2 transition-all',
            isCollapsed ? 'justify-center' : 'justify-between'
          )}
        >
        {!isCollapsed && (
          <div className="mx-auto w-full">
            <Logo
              showTitle
              title="ComplianceHub"
              titleSize="medium"
              logoSize="medium"
              className="mx-auto max-w-[85%]"
              imgClassName="h-[min(12cqh,24px)]"
              titleClassName="text-center"
            />
          </div>
        )}
        
          <ListBulletIcon 
          onClick={toggle}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="text-black h-7 w-7 flex-shrink-0 hover:text-[#6A42AB] transition cursor-pointer " />

      </div>

      {/* Midtersektion */}
      <nav className="flex-1 mt-6 px-2 space-y-1">
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
                  : 'text-black hover:bg-black/5 hover:text-black',
                'group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isCollapsed ? 'justify-center gap-0' : 'gap-2'
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

              {!isCollapsed && <span className="truncate">{item.name}</span>}
            </a>
          )
        })}
      </nav>

      {/* Bundsektion */}
      <div className={classNames('border-t border-black/10 p-3 flex flex-col items-center space-y-3')}>
        <a
          href="/settings"
          className={classNames(
            'flex items-center text-black hover:text-black px-2 py-2 rounded-md hover:bg-black/5 transition',
            isCollapsed ? 'justify-center gap-0' : 'gap-2'
          )}
        >
          <Cog6ToothIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
          {!isCollapsed && <span>Settings</span>}
        </a>

        <a href="/login" className="flex items-center justify-center">
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
