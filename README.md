<p align="center">
  <a href="https://github.com/ng-matero">
    <img width="150" src="https://avatars1.githubusercontent.com/u/49753463?s=200&v=4">
  </a>
</p>

<h1 align="center">
Skills Inventory
</h1>

### Librerías extras

```tsx
npm i ng-matero // Facilita la creación de modules, componentes y demás
npm install perfect-scrollbar // Hace scroll dentro de las table
npm i xlsx // Exportar archivos a excel
```

---

### Estructura General

- core:
- routes
- shared
- theme:

# Estructura & Arquitectura Hexagonal

## Auth : Arquitectura Hexagonal

Crear Módulo auth

```tsx
ng g ng-matero:module auth

Forma Larga: ng g m routes/auth --routing
```

### Domain

```tsx
ng g cl routes/auth/domain/auth-factory --skip-tests
ng g i routes/auth/domain/repositories/auth-repository
ng g i routes/auth/domain/repositories/storage-repository
ng g i routes/auth/domain/entities/tokens
```

### Infrastructure

```tsx
ng g cl routes/auth/infrastructure/auth-infrastructure --skip-tests
ng g cl routes/auth/infrastructure/storage-infrastructure --skip-tests
```

### Application

```tsx
ng g cl routes/auth/application/auth-application --skip-tests
ng g cl routes/auth/application/storage-application --skip-tests
```

---

## Collaborators : Arquitectura Hexagonal

#Crear Módulo

```tsx
ng g ng-matero:module collaborators
```

### Domain

```tsx
ng g i routes/collaborators/domain/entities/collaborator-entity
ng g i routes/collaborators/domain/repositories/collaborator-repository
ng g cl routes/collaborators/domain/collaborator-factory --skip-tests

// Servicio temporal
ng g s routes/collaborators/domain/data/collaborators --skip-tests
```

### Infrastructure

```tsx
ng g cl routes/collaborators/infrastructure/collaborator-infrastructure --skip-tests
```

### Application

```tsx
ng g cl routes/collaborators/application/collaborator-application --skip-tests
```

### Views

```tsx
// Statics : Crea la ruta en Routing Module
ng g ng-matero:page views/list-collaborators -m=collaborators

// Dynamics : No crea la ruta (Útil para los models)
ng g ng-matero:page views/card-collaborator -m=collaborators -e=true
```

**Notas:**

1. Siempre se deben colocar el **@Injectable()** en la capa de infrastructure y application.
2. Se deben registrar las clases en el appModule así:

```tsx
// Declaración de constantes en los providers
const application = [CollaboratorApplication];
const infrastructure = [CollaboratorInfrastructure];
```

---

## Skills : Arquitectura Hexagonal

Crear Módulo

```tsx
ng g ng-matero:module skills
```

### Domain

```tsx
ng g i routes/skills/domain/entities/skill-entity
ng g i routes/skills/domain/repositories/skill-repository

ng g cl routes/skills/domain/skill-factory --skip-tests
```

### Infrastructure

```tsx
ng g cl routes/skills/infrastructure/skill-infrastructure --skip-tests
```

### Application

```tsx
ng g cl routes/skills/application/skill-application --skip-tests
```

### Views

```tsx
ng g c routes/skills/views/list-skills
ng g c routes/skills/views/form-skill
```

**Nota:**
Siempre se deben colocar el **@Injectable()** en la capa de infrastructure y application, además se deben registrar las clases en el appModule así:

```tsx
// Declaración de constantes en los providers
const application = [AuthApplication, SkillApplication];
const infrastructure = [AuthInfrastructure, SkiInfrastructure];
```

---

## Projects : Arquitectura Hexagonal

Crear Módulo

```tsx
ng g ng-matero:module projects
```

### Domain

```tsx
ng g i routes/projects/domain/project
ng g i routes/projects/domain/project-repository
ng g cl routes/projects/domain/project-factory --skip-tests
```

### Infrastructure

```tsx
ng g cl routes/projects/infrastructure/project-infrastructure --skip-tests
```

### Application

```tsx
ng g cl routes/projects/application/project-application --skip-tests
```

### Views

```tsx
ng g c routes/projects/views/list-projects
ng g c routes/projects/views/form-project
```

**Nota:**
Siempre se deben colocar el **@Injectable()** en la capa de infrastructure y application, además se deben registrar las clases en el appModule así:

```tsx
// Declaración de constantes en los providers
const application = [AuthApplication, ProjectApplication];
const infrastructure = [AuthInfrastructure, ProjectInfrastructure];
```

---

## Medics : Arquitectura Hexagonal

#Crear Módulo projects

```tsx
ng g ng-matero:module medics
```

### Domain

```tsx
ng g i routes/medics/domain/medic
ng g i routes/medics/domain/medic-repository
ng g cl routes/medics/domain/medic-factory --skip-tests
```

### Infrastructure

```tsx
ng g cl routes/medics/infrastructure/medic-infrastructure --skip-tests
```

### Application

```tsx
ng g cl routes/medics/application/medic-application --skip-tests
```

### Views

```tsx
// Statics : Crea la ruta en Routing Module
ng g ng-matero:page views/list-medics -m=medics

// Dynamics : No crea la ruta
ng g ng-matero:page views/list-medics -m=medics -e=true
ng g ng-matero:page views/form-medic -m=medics -e=true
```

**Nota:**
Siempre se deben colocar el **@Injectable()** en la capa de infrastructure y application, además se deben registrar las clases en el appModule así:

```tsx
// Declaración de constantes en los providers
const application = [MedicApplication];
const infrastructure = [MedicInfrastructure];
```

---

## Shared

Crear Módulo Shared

```tsx
ng g m shared --flat --export | Este módulo no tendrá rutas
ng g m shared/angular-material --flat --export
```

### Components

```tsx
ng g c shared/components/page-header --skip-import
ng g c shared/components/page-container --skip-import
ng g c shared/components/table --skip-import
ng g c shared/components/paginator --skip-import
ng g c shared/components/confirm --skip-import
ng g c shared/components/loader --skip-import
ng g c shared/components/photo --skip-import

ng g cl shared/classes/base-header --skip-tests
ng g cl shared/classes/base-collaborators --skip-tests
```

### Services

```tsx
ng g s shared/services/utils  > Esto es para el modal de confirmación
```

### Guards

```tsx
ng g g shared/guards/authentication --skip-tests
```

### Directives

```tsx
ng g d shared/directives/upload --skip-import --export
```

---

## Core : Arquitectura Hexagonal

### Domain

```tsx
ng g i core/domain/base-methods-interface
```

Esta interfaz tendrá los métodos crud que normalmente se crean en los repository, ya que son métodos comunes y no será necesario crear un repository por cada Entidad (Projects/ Skills, etc)

### Infrastructure

```tsx
ng g cl core/infrastructure/base-infrastructure --skip-tests
```

### Application

```tsx
ng g cl core/application/base-application --skip-tests
```

### Interceptor

```tsx
ng g interceptor core/interceptors/token-test --skip-tests
```

---

## 📖 Documentation

[English](https://nzbin.gitbook.io/ng-matero/v/en-2/)
