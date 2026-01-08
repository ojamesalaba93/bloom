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
npm install bloom-ui framer-motion
```

## Quick Start

```tsx
import { Bloom } from 'bloom-ui'
import { MoreHorizontal, Pencil, Trash } from 'lucide-react'

function Menu() {
  return (
    <Bloom.Root>
      <Bloom.Container buttonSize={48} menuWidth={200} menuRadius={12}>
        <Bloom.Trigger>
          <MoreHorizontal />
        </Bloom.Trigger>
        <Bloom.Content>
          <Bloom.Item onSelect={() => console.log('edit')}>
            <Pencil /> Edit
          </Bloom.Item>
          <Bloom.Item onSelect={() => console.log('delete')}>
            <Trash /> Delete
          </Bloom.Item>
        </Bloom.Content>
      </Bloom.Container>
    </Bloom.Root>
  )
}
```

## Direction and Anchor

Control where the menu expands from and how it aligns to the trigger:

```tsx
<Bloom.Root direction="top" anchor="start">    {/* Expands up, aligned to start */}
<Bloom.Root direction="bottom" anchor="center"> {/* Expands down, centered */}
<Bloom.Root direction="left" anchor="end">      {/* Expands left, aligned to end */}
```

## Animation Presets

```tsx
<Bloom.Root animation="snappy">    {/* Quick ease-out curve */}
<Bloom.Root animation="gentle">    {/* Default, smooth spring */}
<Bloom.Root animation="relaxed">   {/* Slower, laid-back spring */}

{/* Or use custom spring config */}
<Bloom.Root animation={{ stiffness: 400, damping: 25 }}>
```

## Components

### `<Bloom.Root>`

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

### `<Bloom.Container>`

The morphing element that animates between button and menu states.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `buttonSize` | `number` | `44` | Closed button diameter |
| `menuWidth` | `number` | `200` | Open menu width |
| `menuRadius` | `number` | `24` | Open menu border-radius |

### `<Bloom.Trigger>`

Content shown when closed. Fades out when the menu opens.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional class names |
| `style` | `CSSProperties` | — | Additional styles |

### `<Bloom.Content>`

Menu content shown when open. Fades in with a slight delay.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional class names |
| `style` | `CSSProperties` | — | Additional styles |

### `<Bloom.Item>`

Individual menu items with hover highlighting.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSelect` | `() => void` | — | Called when selected |
| `disabled` | `boolean` | `false` | Disable the item |
| `closeOnSelect` | `boolean` | `true` | Close menu after selection |

### `<Bloom.Portal>`

Renders content in a portal.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `container` | `HTMLElement` | `document.body` | Portal target |

### `<Bloom.Overlay>`

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
