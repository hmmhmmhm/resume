# @repo/astro-icon

Shared icon package for the monorepo, providing unified access to Lucide icons for both Astro and React components.

## Usage

### For Astro components

```astro
---
import { Home, Image, Shield, FileText } from "@repo/astro-icon/astro";
---

<Home />
<Image />
```

### For React components

```tsx
import { Download } from "@repo/astro-icon/react";

export default function MyComponent() {
  return <Download />;
}
```

## Dependencies

- `@lucide/astro`: Lucide icons for Astro
- `lucide-react`: Lucide icons for React
