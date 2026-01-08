# Bloom

A React component library that creates fluid morphing animations between a trigger element and an expanded menu. The button *becomes* the menu through fluid shape-shifting animation.

## Features

- **Fluid Animations** — Smooth spring-based morphing with customizable presets
- **Directional Expansion** — Menu expands in any direction with anchor alignment
- **Composable API** — Build exactly what you need with compound components
- **Tiny Bundle** — Only requires `framer-motion` as a peer dependency
- **TypeScript First** — Full type safety and IntelliSense support

## Installation

```bash
npm install bloom-menu framer-motion
```

## Quick Start

```tsx
import { Menu } from 'bloom-menu'
import { MoreHorizontal, Pencil, Trash } from 'lucide-react'

function Example() {
  return (
    <Menu.Root>
      <Menu.Container buttonSize={48} menuWidth={200} menuRadius={12}>
        <Menu.Trigger>
          <MoreHorizontal />
        </Menu.Trigger>
        <Menu.Content>
          <Menu.Item onSelect={() => console.log('edit')}>
            <Pencil /> Edit
          </Menu.Item>
          <Menu.Item onSelect={() => console.log('delete')}>
            <Trash /> Delete
          </Menu.Item>
        </Menu.Content>
      </Menu.Container>
    </Menu.Root>
  )
}
```

## Direction and Anchor

Control where the menu expands from and how it aligns to the trigger:

```tsx
<Menu.Root direction="top" anchor="start">    {/* Expands up, aligned to start */}
<Menu.Root direction="bottom" anchor="center"> {/* Expands down, centered */}
<Menu.Root direction="left" anchor="end">      {/* Expands left, aligned to end */}
```

## Animation Presets

```tsx
<Menu.Root animation="snappy">    {/* Quick ease-out curve */}
<Menu.Root animation="gentle">    {/* Default, smooth spring */}
<Menu.Root animation="relaxed">   {/* Slower, laid-back spring */}

{/* Or use custom spring config */}
<Menu.Root animation={{ stiffness: 400, damping: 25 }}>
```

## Components

### `<Menu.Root>`

The root component that provides context for all other components.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | — | Callback when open state changes |
| `defaultOpen` | `boolean` | `false` | Default open state (uncontrolled) |
| `direction` | `"top" \| "bottom" \| "left" \| "right"` | `"top"` | Menu expansion direction |
| `anchor` | `"start" \| "center" \| "end"` | `"start"` | Anchor alignment |
| `animation` | `"snappy" \| "gentle" \| "relaxed" \| SpringConfig` | `"gentle"` | Animation preset |
| `closeOnClickOutside` | `boolean` | `true` | Close when clicking outside |
| `closeOnEscape` | `boolean` | `true` | Close when pressing Escape |

### `<Menu.Container>`

The morphing element that animates between button and menu states.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `buttonSize` | `number` | `44` | Closed button diameter |
| `menuWidth` | `number` | `200` | Open menu width |
| `menuRadius` | `number` | `24` | Open menu border-radius |

### `<Menu.Trigger>`

Content shown when closed. Fades out when the menu opens.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional class names |
| `style` | `CSSProperties` | — | Additional styles |

### `<Menu.Content>`

Menu content shown when open. Fades in with a slight delay.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional class names |
| `style` | `CSSProperties` | — | Additional styles |

### `<Menu.Item>`

Individual menu items with hover highlighting.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSelect` | `() => void` | — | Called when selected |
| `disabled` | `boolean` | `false` | Disable the item |
| `closeOnSelect` | `boolean` | `true` | Close menu after selection |

### `<Menu.Portal>`

Renders content in a portal.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `container` | `HTMLElement` | `document.body` | Portal target |

### `<Menu.Overlay>`

Optional backdrop overlay.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional class names |
| `onClick` | `() => void` | closes menu | Click handler |

## Accessibility

Bloom includes the following accessibility features:

- Proper `role="menu"` and `role="menuitem"` attributes
- `aria-expanded` and `aria-haspopup` on trigger
- `aria-disabled` on disabled items
- Respects `prefers-reduced-motion` media query
- Click outside and Escape key to close

## License

MIT
