# Global Development Standards & Design QA Guide - Dream Decorators ERP

This document defines the strict, non-negotiable **Global Development Standards** for the entire **Dream Decorators ERP** codebase across all existing and future modules.

---

## 🏛️ 1. Architecture & Design System Integrity

1. **One Design Language**:
   - Spacing: 4px grid system (`gap-1` to `gap-8`). No arbitrary pixel paddings.
   - Colors: Primary Navy (`#1C47C5`), Background (`#F8FAFC`), Card (`#FFFFFF`), Border (`#E5E7EB`), Text Primary (`#111827`), Text Secondary (`#6B7280`). Status colors: Green (`#16A34A`), Orange (`#D97706`), Red (`#DC2626`).
   - Typography: **Inter** exclusively (`font-sans`).
   - Radius: Standardized `rounded-xl` for cards/inputs and `rounded-full` for status pill badges.

2. **Feature Isolation Pattern**:
   - Each domain lives strictly inside its own feature directory:
     - Frontend: `apps/frontend/src/features/<feature>/` (`types/`, `api/`, `hooks/`, `components/`, `pages/`).
     - Backend: `apps/backend/src/modules/<feature>/` (`<feature>.schema.ts`, `<feature>.controller.ts`, `<feature>.service.ts`, `<feature>.routes.ts`).
   - Modifying or adding one feature module must never ripple or impact another feature module.

---

## 🎨 2. Component & UI/UX Standards

1. **Tables**:
   - All tables must consume the global `<Table>` component.
   - Sticky headers, compact density, status badges, hover rows, and formatted currency.

2. **Forms**:
   - Built with **React Hook Form** + **Zod Validation**.
   - Input fields must use RHF `forwardRef` inputs (`Input`, `CurrencyInput`, `GSTInput`, `PhoneInput`, `Dropdown`).
   - Inline error messages, sticky save action footers.

3. **Modals & Drawers**:
   - Modal backdrops (`Modal.tsx`, `DeleteModal.tsx`) with ESC key listener, title header, body, and action footer.

4. **Feedback States (Mandatory)**:
   - **Loading**: Every widget and table loads independently using skeleton placeholders (`Loading.tsx`, `Skeleton`).
   - **Empty States**: Every list must render an empty state illustration with title, message, and primary CTA (`EmptyState.tsx`).
   - **Error States**: Handle API/UI errors gracefully with a friendly message and Retry button (`ErrorView.tsx`).
   - **Toasts**: Success, error, warning, and info notifications via `useToastStore`.

---

## 💻 3. Backend & Database Standards

1. **API Responses**:
   - Standardized payload format: `{ success: boolean, message: string, data?: T, errors?: any[] }`.
   - Payload validation using Zod middleware (`validateRequest`).
   - Controllers wrapped with `asyncHandler`.

2. **Database Integrity**:
   - All model IDs are UUID strings.
   - Monetary values and stock dimensions stored as `Decimal(14, 2)`.
   - Tables include standard audit timestamps (`createdAt`, `updatedAt`) and soft delete flags (`isDeleted`).
   - Single source of truth Prisma client exported from `@dream-decorators/database`.

---

## 🔍 4. Design QA Verification Checklist

Before declaring any feature or module complete:
- [x] Verify no inline styles or hardcoded hex colors exist.
- [x] Verify TypeScript compiles with zero errors (`npx tsc --noEmit`).
- [x] Verify Lucide icons are used exclusively (no emojis).
- [x] Verify independent widget skeleton loading and error fallback states.
- [x] Verify 100% responsive behavior across Desktop, Tablet, and Mobile viewports.
