
import { Logo } from './Logo'

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Data Processors', href: '/dataprocessors', current: false },
  { name: "Employee's", href: '/employees', current: false },
]

function classNames(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}

export function Navbar() {
  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-white flex flex-col">
      <div className="flex items-center h-16 border-b border-gray-700 px-4">
        <div className="mx-auto w-full">
            <Logo
            showTitle
            title="ComplianceHub"
            titleSize='large'
            logoSize='medium'
            className="mx-auto max-w-[85%]"      
            imgClassName="h-[min(12cqh,24px)]"    
            titleClassName="text-center"                                
            />
        </div>
      </div>

      {/* Navigation*/}
      <nav className="flex-1 mt-6 px-3 space-y-1">
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            aria-current={item.current ? 'page' : undefined}
            className={classNames(
            item.current
                ? 'bg-[#FBF8FF] text-[#6A42AB]'
                : 'text-black hover:bg-white/5 hover:text-white',
            'block rounded-md px-3 py-2 text-sm font-medium text-left'
            )}>
            {item.name}
          </a>
        ))}
      </nav>

      {/* Bund sektion*/}
      <div className="border-t border-gray-700 p-3">
        <a
          href="/settings"
          className="flex items-center space-x-2 text-gray-400 hover:text-white px-2 py-2 rounded-md hover:bg-white/5 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593..." />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          <span>Settings</span>
        </a>

      </div>
    </div>
  )
}

export default Navbar
