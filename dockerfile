# Imagen base oficial de Node.js
FROM node:18

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos de definición de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto en el que corre tu app
EXPOSE 4000

# Comando para iniciar la app
CMD ["npm", "start"]
