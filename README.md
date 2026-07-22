# HHStudio — Showcase de Proyectos

Showcase público de [HH Studio](https://hhstudio.com.ar), desplegado en **Vercel** (free tier) como vidriera para captar nuevos clientes. Cada sección del sitio representa un rubro o especialidad — no hay una página principal tradicional, sino un índice simple que lista las categorías y redirige a cada demo.

## 🧠 Filosofía

- **Zero-bloat landing**: sin hero inflado, sin scroll interminable. Un listado directo con acceso a cada sección.
- **Crecimiento progresivo**: los rubros y demos se agregan incrementalmente — cada uno es una ruta nueva que puede cargarse de forma lazy.
- **Show, don't tell**: el sitio es la prueba viva de lo que hacemos. Cada demo habla por sí misma.

## 🏗️ Stack

| Tecnología | Versión | Rol |
|-----------|---------|-----|
| [Angular](https://angular.dev) | 22.x | Framework SPA, standalone, zoneless |
| [Bootstrap](https://getbootstrap.com) | 5.3.x | Grid system + componentes UI |
| [Bootstrap Icons](https://icons.getbootstrap.com) | 1.13.x | Iconografía |
| [GSAP](https://gsap.com) | 3.14.x | Animaciones de alto rendimiento |
| [Supabase](https://supabase.com) | 2.x | Backend-as-a-Service (si se necesita) |
| [Vitest](https://vitest.dev) | 4.x | Testing zoneless-ready |
| TypeScript | 6.0.x | Type safety |

## 🚀 Deploy

El sitio se despliega en **Vercel** usando el builder de SSR híbrido de Angular 22.

```bash
npm run build    # Producción (AOT + SSR + hashed assets)
```

La salida va a `dist/hh-base-angular19/`. Vercel detecta automáticamente el proyecto Angular y aplica el adaptador SSR.

## 📁 Estructura

```
src/app/
├── core/           # Servicios globales (SEO, Supabase)
├── forms/          # Showcase: Signal Forms (Angular 22)
├── shared/         # Componentes reutilizables (cards, badges, loaders)
├── layouts/        # Layouts (main con header/footer minimal)
└── pages/          # Páginas — un directorio por rubro/sección
    └── home/       # Índice de rubros y secciones

public/             # Assets estáticos (logo, imágenes, favicon)
```

Cada rubro nuevo se agrega como una ruta lazy-loading en `app.routes.ts` y una carpeta propia en `pages/`.

## 🔧 Desarrollo

```bash
npm install         # Instalar dependencias
npm start           # Dev server en http://localhost:4200
npm test            # Unit tests (Vitest)
npm run build       # Build de producción
```

## 📋 Convenciones

- **Componentes**: standalone, zoneless, `styleUrl` por componente
- **Nombres de negocio**: español (`Producto`, `Pedido`)
- **Nombres técnicos**: inglés (`HttpClient`, `Observable`)
- **Estilos**: metodología BEM con SCSS
- **Testing**: Vitest, archivos `.spec.ts` junto al componente

## 🔗 Recursos

- [Documentación Angular](https://angular.dev)
- [Bootstrap 5 Docs](https://getbootstrap.com/docs/5.3)
- [GSAP Docs](https://gsap.com/docs/)
- [Supabase Docs](https://supabase.com/docs)
- [Vercel + Angular](https://vercel.com/docs/frameworks/angular)
