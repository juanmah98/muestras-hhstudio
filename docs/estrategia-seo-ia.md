# Estrategia de Posicionamiento para Búsquedas con IA (RAG + GEO)

> Documento de referencia interna para HH Studio. Explica cómo los LLMs descubren y recomiendan negocios locales, y qué debemos hacer en cada proyecto para maximizar la visibilidad del cliente en búsquedas con IA.

---

## 1. Cómo descubre la IA un negocio local (RAG)

Cuando un usuario le pide a una IA (ChatGPT, Perplexity, Gemini, Copilot) algo como:

> «Dame 5 clínicas de estética en Castellón de la Plana»

La IA **no consulta únicamente su conocimiento estático** (training data). Realiza una búsqueda en tiempo real conocida como **RAG** (Retrieval-Augmented Generation). El modelo:

1. Convierte la pregunta del usuario en una consulta de búsqueda.
2. Recupera documentos relevantes de fuentes externas en tiempo real.
3. Genera la respuesta combinando los documentos recuperados con su conocimiento base.

---

## 2. Las cuatro fuentes principales que analiza la IA

| # | Fuente | Qué busca la IA | Acción para el cliente |
|---|--------|-----------------|------------------------|
| 1 | **APIs de Mapas** (Google Maps, Bing Places, Apple Maps) | Filtrar por distancia geográfica, verificar que el negocio existe, horarios, teléfono. | Perfil de Google Business **completo y verificado**. Bing Places como respaldo. |
| 2 | **Plataformas de opiniones** (Google Reviews, Tripadvisor, Doctoralia, habitissimo) | Validación social, número y calidad de reseñas, respuesta del negocio. | Reseñas recientes con menciones explícitas al servicio + ciudad. Responder a todas (buenas y malas). |
| 3 | **Páginas web con Schema Markup** (JSON-LD) | Entender servicios, ubicación, precios, catálogo de forma estructurada (no texto plano). | Implementar `BeautySalon`, `MedicalBusiness`, `LocalBusiness`, `hasOfferCatalog`, `areaServed`. |
| 4 | **Menciones web y sociales** (blogs, prensa local, foros, redes) | Confirmar autoridad y relevancia a través de lo que terceros dicen del negocio. | Notas en prensa local, directorios de la comarca, colaboraciones con medios. |

> ⚠️ **Nota técnica (validado):** No todos los modelos hacen RAG. ChatGPT con browsing, Perplexity, y Gemini con grounding en Google Search sí lo hacen. Claude (sin web search) y modelos offline usan solo training data. El SEO para IA debe asumir RAG como escenario principal porque es el que usan los usuarios para búsquedas locales.

---

## 3. Factores clave de posicionamiento en IA

### 3.1 Consistencia del NAP (Name, Address, Phone)

Las IAs comparan datos entre fuentes. Si la dirección, teléfono o nombre varían entre:

- La página web
- Google Business Profile
- Bing Places
- Instagram / Facebook
- Directorios locales (Páginas Amarillas, 11811, etc.)

...la IA **descarta el negocio** por inconsistencia. El umbral es bajo: una coma diferente en la dirección puede ser suficiente.

**Regla de oro:** el NAP debe ser **idéntico carácter por carácter** en todas las plataformas.

### 3.2 Schema Markup (JSON-LD)

La IA entiende datos estructurados mucho mejor que texto plano. Schema.org es el vocabulario estándar.

**Ejemplo para una clínica de estética en Castellón:**

```json
{
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "name": "Nombre de la Clínica",
  "description": "Clínica de estética avanzada en Castellón de la Plana especializada en tratamientos faciales y corporales.",
  "url": "https://www.clinica-ejemplo.es",
  "telephone": "+34 964 12 34 56",
  "email": "info@clinica-ejemplo.es",
  "image": "https://www.clinica-ejemplo.es/assets/logo.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Calle Ejemplo 123, Bajo",
    "addressLocality": "Castellón de la Plana",
    "addressRegion": "Castellón",
    "postalCode": "12001",
    "addressCountry": "ES"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 39.9861,
    "longitude": -0.0362
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "10:00",
      "closes": "19:00"
    }
  ],
  "areaServed": {
    "@type": "City",
    "name": "Castellón de la Plana"
  },
  "priceRange": "€€",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Tratamientos Faciales",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Limpieza Facial Profunda",
          "description": "Tratamiento de limpieza facial con ácido hialurónico para todo tipo de pieles."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Maderoterapia Corporal",
          "description": "Técnica de masaje con instrumentos de madera para reducir celulitis y moldear la figura."
        }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "47"
  },
  "sameAs": [
    "https://www.instagram.com/clinica.ejemplo",
    "https://www.facebook.com/clinica.ejemplo"
  ]
}
```

> ✅ **Validado:** `BeautySalon` es el tipo correcto para centros de estética según schema.org. Para clínicas médico-estéticas, considerar también `MedicalBusiness` como tipo adicional con `@type: ["BeautySalon", "MedicalBusiness"]`. El campo `areaServed` es crítico: sin él, la IA no asocia el negocio a Castellón aunque la dirección esté presente.

### 3.3 El Factor Consenso y Reseñas (NLP Sentiment)

Las IAs **no solo leen la nota media** (4.8★). Analizan el contenido textual de las reseñas mediante NLP:

- Si varios clientes escriben: «La mejor depilación láser de Castellón», la IA asocia la clínica a esa consulta específica.
- Si las reseñas son genéricas («Muy bien, recomendable») la señal es débil.

**Acción:** animar a los clientes a que en sus reseñas mencionen explícitamente el **tratamiento recibido + la ciudad**.

### 3.4 Cobertura en Web de Terceros (Entity Building)

La IA confía más en lo que **otros dicen** del negocio que en lo que la propia web afirma. Para Castellón y provincia:

- **Prensa local:** El Periódico Mediterráneo, Castellón Plaza, Castellón Diario.
- **Directorios de la Comunitat Valenciana:** guiarepsol.com, valenciabonita.es.
- **Blogs de estilo de vida / belleza** con foco regional.
- **Foros y redes sociales** donde se mencione el negocio.

---

## 4. Checklist práctica por proyecto

| Área | Acción | Entregable HH Studio |
|------|--------|---------------------|
| **Google Business Profile** | Perfil completo, verificado, categoría correcta, fotos reales, horarios actualizados. | Setup + guía de mantenimiento. |
| **Bing Places** | Misma información que Google Business. | Setup secundario. |
| **Páginas de servicio** | Crear URLs del estilo `/tratamiento-facial-castellon` con FAQ respondidas de forma concisa. | Desarrollo de páginas + SEO copy. |
| **Schema JSON-LD** | Implementar `BeautySalon` / `MedicalBusiness` / `LocalBusiness` con `areaServed`, `geo`, `hasOfferCatalog`, `openingHours`. | Implementación técnica en el build. |
| **Reseñas** | Estrategia para conseguir reseñas con mención explícita de tratamiento + ciudad. | Guía para el cliente. |
| **NAP Consistency** | Auditoría de NAP en todas las plataformas del cliente. | Informe de consistencia. |
| **Entity Building** | Gestionar o sugerir apariciones en prensa local, directorios, blogs. | Listado de medios locales + outreach opcional. |

---

## 5. Cómo usamos este documento en HH Studio

- **Fase de venta:** Compartir el checklist con el cliente para demostrar expertise técnico.
- **Fase de diseño:** Decidir tipos de Schema según el rubro (`BeautySalon`, `MedicalBusiness`, `HomeAndConstructionBusiness`, `FoodEstablishment`, etc.).
- **Fase de desarrollo:** Implementar JSON-LD en el `index.html` o vía servicio Angular (SSR-friendly).
- **Fase de entrega:** Incluir el checklist completado como parte del paquete de lanzamiento.

---

## 6. Recursos y Referencias

- [Schema.org - BeautySalon](https://schema.org/BeautySalon)
- [Schema.org - LocalBusiness](https://schema.org/LocalBusiness)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema Markup Validator](https://validator.schema.org/)
- [Guía de Google Business Profile](https://support.google.com/business/answer/3038063)
