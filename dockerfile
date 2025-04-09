# Imagen base
FROM node:18

# Crear directorio de trabajo
WORKDIR /app

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias incluyendo devDependencies
RUN npm install

# Copiar todo el código
COPY . .

# Exponer puerto
EXPOSE 4000

# Comando de desarrollo
CMD ["npx", "nodemon"]

