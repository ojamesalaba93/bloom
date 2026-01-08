'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, type Direction, type Anchor } from 'bloom-menu'
import { MoreHorizontal, Pencil, Copy, Archive, Share, Github, ChevronRight, Twitter, Link2, Mail, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, AlignStartVertical, AlignCenterVertical, AlignEndVertical, Minus, Check } from 'lucide-react'

export default function Home() {
  const [direction, setDirection] = useState<Direction>('top')
  const [anchor, setAnchor] = useState<Anchor>('start')

  // For left/right directions, anchor must be center
  const isHorizontal = direction === 'left' || direction === 'right'
  const handleDirectionChange = (newDirection: Direction) => {
    setDirection(newDirection)
    // Auto-select center when switching to horizontal direction
    if (newDirection === 'left' || newDirection === 'right') {
      setAnchor('center')
    }
  }
  const [hasSubmenu, setHasSubmenu] = useState(false)
  const [useTextTrigger, setUseTextTrigger] = useState(false)

  return (
    <main className="mx-auto max-w-2xl px-6 py-16 text-neutral-900 dark:text-neutral-100">
      {/* Header */}
      <h1 className="text-3xl font-medium tracking-tight" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>Bloom</h1>

      <p className="mt-4 text-neutral-600 dark:text-neutral-400">
        An iOS inspired pull down menu for the web, by <a href="https://x.com/joshpuckett" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-neutral-900 dark:hover:text-neutral-100">Josh Puckett</a>.
      </p>

      {/* Main Demo */}
      <div className="mt-12 flex flex-col items-center rounded-[2rem] bg-neutral-100 px-4 pb-6 pt-8 dark:bg-neutral-800">
        <div className="flex h-96 items-center justify-center">
          <Demo direction={direction} anchor={anchor} hasSubmenu={hasSubmenu} useTextTrigger={useTextTrigger} />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <SegmentedControl
            id="direction"
            options={[
              { value: 'top', icon: <ArrowUp className="h-4 w-4" />, title: 'Expand up' },
              { value: 'bottom', icon: <ArrowDown className="h-4 w-4" />, title: 'Expand down' },
              { value: 'left', icon: <ArrowLeft className="h-4 w-4" />, title: 'Expand left' },
              { value: 'right', icon: <ArrowRight className="h-4 w-4" />, title: 'Expand right' },
            ]}
            value={direction}
            onChange={(v) => handleDirectionChange(v as Direction)}
          />
          <SegmentedControl
            id="anchor"
            options={[
              { value: 'start', icon: <AlignStartVertical className="h-4 w-4" />, title: 'Align to start', disabled: isHorizontal },
              { value: 'center', icon: <AlignCenterVertical className="h-4 w-4" />, title: 'Align to center' },
              { value: 'end', icon: <AlignEndVertical className="h-4 w-4" />, title: 'Align to end', disabled: isHorizontal },
            ]}
            value={anchor}
            onChange={(v) => setAnchor(v as Anchor)}
          />
          <SegmentedControl
            id="submenu"
            options={[
              { value: 'off', icon: <Minus className="h-4 w-4" />, title: 'No submenu' },
              { value: 'on', icon: <ChevronRight className="h-4 w-4" />, title: 'With submenu' },
            ]}
            value={hasSubmenu ? 'on' : 'off'}
            onChange={(v) => setHasSubmenu(v === 'on')}
          />
          <SegmentedControl
            id="trigger"
            options={[
              { value: 'icon', icon: <MoreHorizontal className="h-4 w-4" />, title: 'Icon trigger' },
              { value: 'text', icon: <span className="flex h-4 items-center text-xs font-medium">Aa</span>, title: 'Text trigger' },
            ]}
            value={useTextTrigger ? 'text' : 'icon'}
            onChange={(v) => setUseTextTrigger(v === 'text')}
          />
        </div>
      </div>

      {/* Installation */}
      <section className="mt-16">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium">Installation</h2>
          <a
            href="https://github.com/joshpuckett/bloom"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
        <CodeBlock className="mt-4" language="bash">
          npm install bloom-menu framer-motion
        </CodeBlock>
      </section>

      {/* Anatomy */}
      <section className="mt-16">
        <h2 className="text-xl font-medium">Anatomy</h2>
        <CodeBlock className="mt-4" language="tsx">{hasSubmenu ? `import { Menu } from 'bloom-menu'

const itemClass = "flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-neutral-900 hover:bg-neutral-100"

export default () => (
  <Menu.Root direction="${direction}" anchor="${anchor}">
    <Menu.Container
      buttonSize={40}
      menuWidth={160}
      menuRadius={12}${useTextTrigger ? '\n      buttonRadius={10}' : ''}
      className="bg-white shadow-lg ring-1 ring-black/5"
    >
      <Menu.Trigger>
        ${useTextTrigger
          ? '<span className="inline-block px-5 py-2 text-sm font-medium">Menu</span>'
          : `<div className="flex h-10 w-10 items-center justify-center">
          <MoreIcon />
        </div>`}
      </Menu.Trigger>
      <Menu.Content className="p-2">
        <Menu.Item className={itemClass} onSelect={() => {}}>
          <PencilIcon /> Edit
        </Menu.Item>
        <Menu.Item className={itemClass} onSelect={() => {}}>
          <CopyIcon /> Copy
        </Menu.Item>
        <Menu.SubMenu id="share">
          <Menu.SubMenuTrigger className={itemClass}>
            {(isActive) => (
              <>
                <ShareIcon /> Share
                <ChevronRight style={{ transform: isActive ? 'rotate(90deg)' : 'rotate(0)' }} />
              </>
            )}
          </Menu.SubMenuTrigger>
          <Menu.SubMenuContent className="rounded-xl bg-white p-2 shadow-lg ring-1 ring-black/5">
            <Menu.Item className={itemClass} onSelect={() => {}}>
              <TwitterIcon /> Twitter
            </Menu.Item>
            <Menu.Item className={itemClass} onSelect={() => {}}>
              <MailIcon /> Email
            </Menu.Item>
          </Menu.SubMenuContent>
        </Menu.SubMenu>
        <Menu.Item className={itemClass} onSelect={() => {}}>
          <ArchiveIcon /> Archive
        </Menu.Item>
      </Menu.Content>
    </Menu.Container>
  </Menu.Root>
)` : `import { Menu } from 'bloom-menu'

const itemClass = "flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-neutral-900 hover:bg-neutral-100"

export default () => (
  <Menu.Root direction="${direction}" anchor="${anchor}">
    <Menu.Container
      buttonSize={40}
      menuWidth={160}
      menuRadius={12}${useTextTrigger ? '\n      buttonRadius={10}' : ''}
      className="bg-white shadow-lg ring-1 ring-black/5"
    >
      <Menu.Trigger>
        ${useTextTrigger
          ? '<span className="inline-block px-5 py-2 text-sm font-medium">Menu</span>'
          : `<div className="flex h-10 w-10 items-center justify-center">
          <MoreIcon />
        </div>`}
      </Menu.Trigger>
      <Menu.Content className="p-2">
        <Menu.Item className={itemClass} onSelect={() => {}}>
          <PencilIcon /> Edit
        </Menu.Item>
        <Menu.Item className={itemClass} onSelect={() => {}}>
          <CopyIcon /> Copy
        </Menu.Item>
        <Menu.Item className={itemClass} onSelect={() => {}}>
          <ShareIcon /> Share
        </Menu.Item>
        <Menu.Item className={itemClass} onSelect={() => {}}>
          <ArchiveIcon /> Archive
        </Menu.Item>
      </Menu.Content>
    </Menu.Container>
  </Menu.Root>
)`}</CodeBlock>
      </section>

      {/* API Reference */}
      <section className="mt-16">
        <h2 className="text-xl font-medium">API Reference</h2>

        <div className="mt-8">
          <h3 className="font-medium">Root</h3>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            Provides state and configuration context.
          </p>
          <PropsTable
            props={[
              ['open', 'boolean', 'Controlled open state'],
              ['onOpenChange', '(open: boolean) => void', 'Open state callback'],
              ['direction', '"top" | "bottom" | "left" | "right"', 'Menu expansion direction (default: "top")'],
              ['anchor', '"start" | "center" | "end"', 'Anchor alignment (default: "start"). For left/right directions, only "center" is supported.'],
            ]}
          />
        </div>

        <div className="mt-16">
          <h3 className="font-medium">Container</h3>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            The morphing element. Automatically sizes to fit the trigger content,
            then animates to the menu dimensions.
          </p>
          <PropsTable
            props={[
              ['buttonSize', 'number | { width, height }', 'Closed button size (default: 40)'],
              ['menuWidth', 'number', 'Open menu width (default: 200)'],
              ['menuRadius', 'number', 'Open menu border-radius (default: 24)'],
              ['buttonRadius', 'number', 'Closed button border-radius (defaults to pill shape)'],
            ]}
          />
        </div>

        <div className="mt-16">
          <h3 className="font-medium">Item</h3>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            Individual menu items with hover highlighting.
          </p>
          <PropsTable
            props={[
              ['onSelect', '() => void', 'Selection callback'],
              ['disabled', 'boolean', 'Disable the item'],
              ['closeOnSelect', 'boolean', 'Close menu on select (default: true)'],
            ]}
          />
        </div>

        <div className="mt-16">
          <h3 className="font-medium">SubMenu</h3>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            Wrapper for nested submenu functionality.
          </p>
          <PropsTable
            props={[
              ['id', 'string', 'Unique identifier for this submenu'],
            ]}
          />
        </div>

        <div className="mt-16">
          <h3 className="font-medium">SubMenuTrigger</h3>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            The item that opens the submenu. Supports render prop for active state.
          </p>
          <PropsTable
            props={[
              ['children', 'ReactNode | (isActive: boolean) => ReactNode', 'Content or render prop'],
              ['disabled', 'boolean', 'Disable the trigger'],
            ]}
          />
        </div>

        <div className="mt-16">
          <h3 className="font-medium">SubMenuContent</h3>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            Container for submenu items. Morphs from the trigger.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 border-t border-neutral-200 pt-8 text-sm text-neutral-500 dark:border-neutral-700">
        MIT License
      </footer>
    </main>
  )
}


function Demo({
  direction,
  anchor,
  hasSubmenu,
  useTextTrigger,
}: {
  direction: Direction
  anchor: Anchor
  hasSubmenu: boolean
  useTextTrigger: boolean
}) {
  return (
    <Menu.Root direction={direction} anchor={anchor}>
      <Menu.Container
        buttonSize={useTextTrigger ? { width: 72, height: 36 } : 40}
        menuWidth={160}
        menuRadius={12}
        buttonRadius={useTextTrigger ? 10 : undefined}
        className="shadow-lg ring-1 ring-black/5"
        style={{ backgroundColor: 'white' }}
      >
        <Menu.Trigger>
          {useTextTrigger ? (
            <span className="text-sm font-medium text-neutral-700">Menu</span>
          ) : (
            <div className="flex h-10 w-10 items-center justify-center">
              <MoreHorizontal className="h-5 w-5 text-neutral-500" />
            </div>
          )}        </Menu.Trigger>
        <Menu.Content className="p-1">
          <Menu.Item
            className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-neutral-900 hover:bg-neutral-100 data-[highlighted]:bg-neutral-100"
            onSelect={() => {}}
          >
            <Pencil className="h-4 w-4 text-neutral-400" />
            Edit
          </Menu.Item>
          <Menu.Item
            className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-neutral-900 hover:bg-neutral-100 data-[highlighted]:bg-neutral-100"
            onSelect={() => {}}
          >
            <Copy className="h-4 w-4 text-neutral-400" />
            Copy
          </Menu.Item>
          {hasSubmenu ? (
            <Menu.SubMenu id="share">
              <Menu.SubMenuTrigger className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-sm text-neutral-900 hover:bg-neutral-100 data-[elevated]:hover:bg-transparent cursor-pointer">
                {(isActive: boolean) => (
                  <>
                    <span className="flex items-center gap-2">
                      <Share className="h-4 w-4 text-neutral-400" />
                      Share
                    </span>
                    <ChevronRight
                      className="h-4 w-4 text-neutral-400 transition-transform duration-200"
                      style={{ transform: isActive ? 'rotate(90deg)' : 'rotate(0deg)' }}
                    />
                  </>
                )}
              </Menu.SubMenuTrigger>
              <Menu.SubMenuContent
                className="rounded-xl bg-white p-1 shadow-lg ring-1 ring-black/5"
              >
                <div className="mx-1 mb-1 border-b border-black/5" />
                <Menu.Item
                  className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-neutral-900 hover:bg-neutral-100 data-[highlighted]:bg-neutral-100"
                  onSelect={() => {}}
                >
                  <Twitter className="h-4 w-4 text-neutral-400" />
                  Twitter
                </Menu.Item>
                <Menu.Item
                  className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-neutral-900 hover:bg-neutral-100 data-[highlighted]:bg-neutral-100"
                  onSelect={() => {}}
                >
                  <Mail className="h-4 w-4 text-neutral-400" />
                  Email
                </Menu.Item>
                <Menu.Item
                  className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-neutral-900 hover:bg-neutral-100 data-[highlighted]:bg-neutral-100"
                  onSelect={() => {}}
                >
                  <Link2 className="h-4 w-4 text-neutral-400" />
                  Copy Link
                </Menu.Item>
              </Menu.SubMenuContent>
            </Menu.SubMenu>
          ) : (
            <Menu.Item
              className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-neutral-900 hover:bg-neutral-100 data-[highlighted]:bg-neutral-100"
              onSelect={() => {}}
            >
              <Share className="h-4 w-4 text-neutral-400" />
              Share
            </Menu.Item>
          )}
          <Menu.Item
            className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-neutral-900 hover:bg-neutral-100 data-[highlighted]:bg-neutral-100"
            onSelect={() => {}}
          >
            <Archive className="h-4 w-4 text-neutral-400" />
            Archive
          </Menu.Item>
        </Menu.Content>
      </Menu.Container>
    </Menu.Root>
  )
}

function CodeBlock({ children, className = '', language }: { children: string; className?: string; language?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Simple syntax highlighting for JSX/TSX and bash
  const highlightLine = (line: string) => {
    if (!language) return <span className="text-neutral-800 dark:text-neutral-200">{line}</span>

    // For bash, highlight the command and subcommand in rose (same as keywords)
    if (language === 'bash') {
      const parts = line.split(' ')
      const command = parts.slice(0, 2).join(' ') // e.g., "npm install"
      const args = parts.slice(2).join(' ')
      return (
        <>
          <span className="text-rose-500/70 dark:text-rose-400/60">{command}</span>
          {args && <span className="text-neutral-600 dark:text-neutral-300">{' ' + args}</span>}
        </>
      )
    }

    // Tokenize the line
    const tokens: { type: string; value: string }[] = []
    let remaining = line

    while (remaining.length > 0) {
      // Keywords
      const keywordMatch = remaining.match(/^(import|export|from|const|function|return|default)\b/)
      if (keywordMatch) {
        tokens.push({ type: 'keyword', value: keywordMatch[0] })
        remaining = remaining.slice(keywordMatch[0].length)
        continue
      }

      // JSX opening/closing tags
      const tagMatch = remaining.match(/^(<\/?)([\w.]+)/)
      if (tagMatch) {
        tokens.push({ type: 'bracket', value: tagMatch[1] })
        tokens.push({ type: 'component', value: tagMatch[2] })
        remaining = remaining.slice(tagMatch[0].length)
        continue
      }

      // Closing bracket
      if (remaining.startsWith('>') || remaining.startsWith('/>')) {
        const bracket = remaining.startsWith('/>') ? '/>' : '>'
        tokens.push({ type: 'bracket', value: bracket })
        remaining = remaining.slice(bracket.length)
        continue
      }

      // Props/attributes (word followed by =)
      const propMatch = remaining.match(/^(\w+)(=)/)
      if (propMatch) {
        tokens.push({ type: 'prop', value: propMatch[1] })
        tokens.push({ type: 'text', value: '=' })
        remaining = remaining.slice(propMatch[0].length)
        continue
      }

      // Strings
      const stringMatch = remaining.match(/^("[^"]*"|'[^']*')/)
      if (stringMatch) {
        tokens.push({ type: 'string', value: stringMatch[0] })
        remaining = remaining.slice(stringMatch[0].length)
        continue
      }

      // Braces
      const braceMatch = remaining.match(/^(\{[^}]*\})/)
      if (braceMatch) {
        tokens.push({ type: 'brace', value: braceMatch[0] })
        remaining = remaining.slice(braceMatch[0].length)
        continue
      }

      // Parentheses and arrows
      const parenMatch = remaining.match(/^(\(|\)|=>)/)
      if (parenMatch) {
        tokens.push({ type: 'paren', value: parenMatch[0] })
        remaining = remaining.slice(parenMatch[0].length)
        continue
      }

      // Default: single character
      tokens.push({ type: 'text', value: remaining[0] })
      remaining = remaining.slice(1)
    }

    return tokens.map((token, i) => {
      switch (token.type) {
        case 'keyword':
          return <span key={i} className="text-rose-500/70 dark:text-rose-400/60">{token.value}</span>
        case 'component':
          return <span key={i} className="text-sky-600/80 dark:text-sky-400/80">{token.value}</span>
        case 'prop':
          return <span key={i} className="text-violet-500/80 dark:text-violet-400/70">{token.value}</span>
        case 'string':
          return <span key={i} className="text-emerald-600/80 dark:text-emerald-400/70">{token.value}</span>
        case 'bracket':
        case 'paren':
          return <span key={i} className="text-neutral-400 dark:text-neutral-500">{token.value}</span>
        case 'brace':
          return <span key={i} className="text-amber-600/70 dark:text-amber-400/60">{token.value}</span>
        default:
          return <span key={i} className="text-neutral-600 dark:text-neutral-300">{token.value}</span>
      }
    })
  }

  const lines = children.split('\n')

  return (
    <div className={`relative overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800 ${className}`}>
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 rounded-md p-1.5 text-neutral-400 hover:bg-neutral-200 hover:text-neutral-600 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
        aria-label="Copy code"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
      <pre className="overflow-x-auto p-4 text-xs leading-relaxed" style={{ fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace' }}>
        <code>
          {lines.map((line, i) => (
            <div key={i} className="min-h-[1.25em]">
              {line ? highlightLine(line) : '\u00A0'}
            </div>
          ))}
        </code>
      </pre>
    </div>
  )
}

function PropsTable({ props }: { props: [string, string, string][] }) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-neutral-200 dark:border-neutral-700">
            <th className="w-40 py-2 pr-4 text-left font-medium">Prop</th>
            <th className="w-72 py-2 pr-4 text-left font-medium">Type</th>
            <th className="py-2 text-left font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map(([name, type, desc]) => (
            <tr key={name} className="border-b border-neutral-100 dark:border-neutral-800">
              <td className="py-3 pr-4">
                <code className="rounded-full border border-neutral-200 bg-neutral-100 px-2 py-0.5 font-mono text-xs text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100">
                  {name}
                </code>
              </td>
              <td className="py-3 pr-4">
                <code className="whitespace-nowrap rounded-full border border-neutral-200 bg-neutral-100 px-2 py-0.5 font-mono text-xs text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100">
                  {type}
                </code>
              </td>
              <td className="py-3 text-neutral-600 dark:text-neutral-400">{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function SegmentedControl<T extends string>({
  id,
  options,
  value,
  onChange,
}: {
  id: string
  options: { value: T; icon: React.ReactNode; title?: string; disabled?: boolean }[]
  value: T
  onChange: (value: T) => void
}) {
  return (
    <div className="relative flex rounded-full bg-neutral-200/80 p-1 dark:bg-neutral-700/80">
      {options.map((option) => {
        const isSelected = value === option.value
        const isDisabled = option.disabled ?? false
        return (
          <button
            key={option.value}
            onClick={() => !isDisabled && onChange(option.value)}
            data-tooltip={option.title}
            disabled={isDisabled}
            className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full ${isDisabled ? 'cursor-not-allowed' : ''}`}
          >
            {isSelected && (
              <motion.span
                layoutId={`pill-${id}`}
                className="absolute inset-0 rounded-full bg-white shadow-sm dark:bg-neutral-600"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className={`relative z-10 transition-colors duration-200 ${isDisabled ? 'text-neutral-300 dark:text-neutral-600' : isSelected ? 'text-neutral-600 dark:text-neutral-300' : 'text-neutral-400'}`}>
              {option.icon}
            </span>
          </button>
        )
      })}
    </div>
  )
}
