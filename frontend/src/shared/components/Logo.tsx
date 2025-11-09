import logo from '../assets/UNIwise_logo.png'

type TitleSize = 'small' | 'medium' | 'large'
type LogoSize = 'small' | 'medium' | 'large'

type LogoProps = {
  showTitle?: boolean
  title?: string
  titleSize?: TitleSize
  logoSize?: LogoSize
  className?: string
  imgClassName?: string
  titleClassName?: string
  width?: number
  height?: number
}

export function Logo({
  showTitle = false,
  title = 'ComplianceHub',
  titleSize = 'medium',
  logoSize = 'medium',
  className = '',
  imgClassName = '',
  titleClassName = '',
  width,
  height,
}: LogoProps) {
  const textSizeMap: Record<TitleSize, string> = {
    small: 'text-[min(6cqw,12px)]',
    medium: 'text-[min(9cqw,20px)]',
    large: 'text-[min(11cqw,24px)]',
  }

  const imageSizeMap: Record<LogoSize, string> = {
    small: 'h-[min(12cqh,32px)] w-auto',
    medium: 'h-[min(16cqh,40px)] w-auto',
    large: 'h-[min(20cqh,48px)] w-auto',
  }

  return (
    <div
      // container enables cqw/cqh scaling
      className={[
        'flex items-center gap-2 [container-type:inline-size]',
        className,
      ].join(' ')}
    >
      <img
        src={logo}
        alt="UNIwise logo"
        loading="lazy"
        className={[imageSizeMap[logoSize], imgClassName].join(' ')}
        {...(width ? { width } : {})}
        {...(height ? { height } : {})}
      />

      {showTitle && (
        <span
          className={[
            'text-black font-semibold leading-none truncate',
            textSizeMap[titleSize],
            titleClassName,
          ].join(' ')}
        >
          {title}
        </span>
      )}
    </div>
  )
}

export default Logo
