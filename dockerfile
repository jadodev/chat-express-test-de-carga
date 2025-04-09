# Imagen base oficial de Node.js
FROM node:18

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos de definición de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Compilar TypeScript a JavaScript
RUN npm run build

# Exponer el puerto de la app
EXPOSE 4000

# Comando para ejecutar la app compilada
CMD ["npm","run dev"]
